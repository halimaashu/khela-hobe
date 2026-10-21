"use client";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  Calendar,
  DateField,
  DatePicker,
  Label,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

// Works with an array or an old comma-separated string
const normalizeSlots = (slots) => {
  if (Array.isArray(slots)) return slots.filter(Boolean);
  if (typeof slots === "string") return slots.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const toMinutes = (hhmm) => {
  const [h, m] = (hhmm || "").split(":").map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : NaN;
};

// "06:00-07:00" -> 1 (hours). Falls back to 1 if the slot is malformed
const slotHours = (slot) => {
  const [s, e] = slot.split("-");
  const diff = toMinutes(e) - toMinutes(s);
  return diff > 0 ? diff / 60 : 1;
};

// Today as local "YYYY-MM-DD"
const todayString = () => {
  const d = new Date();
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 10);
};

const BookingCard = ({ data }) => {
  const router = useRouter();
  const [date, setDate] = useState(null); // HeroUI gives a CalendarDate object (or null)
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const slots = normalizeSlots(data?.available_slots);
  const price = Number(data?.price_per_hour) || 0;
  const facilityId = String(data?._id || "");

  // CalendarDate.toString() -> "2026-10-25"
  const dateStr = date ? date.toString() : "";
  const today = todayString();
  const total = selectedSlot ? Math.round(price * slotHours(selectedSlot)) : 0;

  // Optional: ask the server which slots are already taken on this date.
  // If your server has no such route yet, this fails silently and all slots stay open.
  const loadBooked = useCallback(async () => {
    if (!SERVER || !facilityId || !dateStr) return setBookedSlots([]);
    try {
      const res = await fetch(
        `${SERVER}/booking/booked?facilityId=${encodeURIComponent(facilityId)}&date=${dateStr}`,
        { cache: "no-store" }
      );
      const json = res.ok ? await res.json() : [];
      setBookedSlots(Array.isArray(json) ? json : []);
    } catch {
      setBookedSlots([]);
    }
  }, [facilityId, dateStr]);

  useEffect(() => {
    setSelectedSlot("");
    setErrorMsg("");
    loadBooked();
  }, [loadBooked]);

  const slotState = (slot) => {
    if (bookedSlots.includes(slot)) return "booked";
    if (dateStr === today) {
      const now = new Date();
      if (toMinutes(slot.split("-")[0]) <= now.getHours() * 60 + now.getMinutes()) return "past";
    }
    return "open";
  };

  const fail = (message) => {
    setErrorMsg(message);
    toast.error(message);
  };

  const handleBooking = async () => {
    setErrorMsg("");

    if (!user) return fail("Please log in before booking.");
    if (!dateStr) return fail("Choose a date first.");
    if (dateStr < today) return fail("That date has already passed. Choose today or later.");
    if (!selectedSlot) return fail("Choose a time slot.");

    const bookingData = {
      userId: user.id,
      userEmail: user.email,
      facilityId,
      date: dateStr, // "YYYY-MM-DD"
      slot: selectedSlot, // "06:00-07:00"
      thumbnail: data?.thumbnail,
      name: data?.name,
      price_per_hour: price,
      total_price: total,
      Status: "booked",
    };

    setSubmitting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${SERVER}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (res.status === 409) {
        setSelectedSlot("");
        loadBooked();
        return fail("Someone just booked that slot. Pick another one.");
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Booking error:", res.status, body);
        if (res.status === 401 || res.status === 403) return fail("Your login was rejected. Log out and log in again.");
        return fail(body.message || `Booking failed (${res.status}).`);
      }

      toast.success("Booking confirmed!");
      router.push("/bookings");
      router.refresh();
    } catch (err) {
      console.error("Booking network error:", err);
      fail(`Cannot reach the server at ${SERVER}. Is the backend running?`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Card className="p-6 gap-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-extrabold" style={{ color: "var(--k-text)" }}>
            Book it
          </h2>
          <p className="text-lg font-extrabold" style={{ color: "var(--k-brand)" }}>
            ৳{price.toLocaleString()}
            <span className="text-xs font-medium" style={{ color: "var(--k-muted)" }}>
              /hr
            </span>
          </p>
        </div>

        {/* Date (HeroUI picker kept; onChange is what React Aria / HeroUI fires) */}
        <DatePicker className="w-full" name="date" value={date} onChange={setDate}>
          <Label>Slot date</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="Booking date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>
                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>
              <Calendar.Grid>
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(d) => <Calendar.Cell date={d} />}
                </Calendar.GridBody>
              </Calendar.Grid>
              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>

        {/* Slots: only the hours the owner offered */}
        <fieldset>
          <legend className="text-sm font-semibold mb-2" style={{ color: "var(--k-text)" }}>
            Time slot
          </legend>

          {slots.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--k-muted)" }}>
              This facility has no bookable slots yet.
            </p>
          ) : !dateStr ? (
            <p className="text-sm" style={{ color: "var(--k-muted)" }}>
              Choose a date to see the available slots.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {slots.map((slot) => {
                const state = slotState(slot);
                const disabled = state !== "open";
                const active = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={disabled}
                    aria-pressed={active}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setErrorMsg("");
                    }}
                    className="px-3 py-2.5 rounded-xl border text-sm font-bold transition-all disabled:cursor-not-allowed"
                    style={
                      active
                        ? { background: "var(--k-brand)", borderColor: "var(--k-brand)", color: "#fff" }
                        : disabled
                        ? { background: "var(--k-surface-2)", borderColor: "var(--k-border)", color: "var(--k-muted)", opacity: 0.6 }
                        : { background: "var(--k-surface)", borderColor: "var(--k-border)", color: "var(--k-text)" }
                    }
                  >
                    <span style={disabled ? { textDecoration: "line-through" } : undefined}>{slot}</span>
                    {state === "booked" && <span className="block text-[10px] font-semibold">Booked</span>}
                    {state === "past" && <span className="block text-[10px] font-semibold">Passed</span>}
                  </button>
                );
              })}
            </div>
          )}
        </fieldset>

        {/* Summary */}
        <div className="pt-4 border-t space-y-2 text-sm" style={{ borderColor: "var(--k-border)" }}>
          <div className="flex justify-between" style={{ color: "var(--k-muted)" }}>
            <span>Date</span>
            <span className="font-semibold" style={{ color: "var(--k-text)" }}>{dateStr || "Not selected"}</span>
          </div>
          <div className="flex justify-between" style={{ color: "var(--k-muted)" }}>
            <span>Slot</span>
            <span className="font-semibold" style={{ color: "var(--k-text)" }}>{selectedSlot || "Not selected"}</span>
          </div>
          <div className="flex justify-between text-base pt-1">
            <span className="font-bold" style={{ color: "var(--k-text)" }}>Total</span>
            <span className="font-extrabold" style={{ color: "var(--k-brand)" }}>৳{total.toLocaleString()}</span>
          </div>
        </div>

        {errorMsg && (
          <p
            role="alert"
            className="text-sm font-medium rounded-xl px-3.5 py-2.5"
            style={{ color: "var(--k-brand)", background: "color-mix(in srgb, var(--k-brand) 10%, transparent)" }}
          >
            {errorMsg}
          </p>
        )}

        {user ? (
          <Button
            onPress={handleBooking}
            isDisabled={submitting || !selectedSlot}
            className="w-full h-12 rounded-xl font-bold text-white disabled:opacity-50"
            style={{ background: "var(--k-gradient)" }}
          >
            {submitting ? "Booking…" : selectedSlot ? "Book now" : "Select a slot to continue"}
          </Button>
        ) : (
          <Link
            href="/login"
            className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center"
            style={{ background: "var(--k-gradient)" }}
          >
            Log in to book
          </Link>
        )}
      </Card>
    </div>
  );
};

export default BookingCard;