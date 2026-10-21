"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FACILITY_TYPES = [
  "Football", "Cricket", "Badminton", "Basketball", "Swimming", "Tennis",
  "Volleyball", "Futsal", "Gym", "Boxing", "Yoga", "Athletics",
  "Table Tennis", "Cycling", "Bowling", "Squash", "Archery",
  "Rock Climbing", "Water Sports", "Ice Skating", "Surfing",
  "Beach Volleyball", "Other",
];

const MAX_IMAGE_MB = 5;

const initialForm = {
  name: "",
  facility_type: "",
  location: "",
  price_per_hour: "",
  capacity: "",
  description: "",
  thumbnail: "",
  owner_email: "",
};

const inputClass =
  "w-full h-11 px-3.5 rounded-xl border text-sm outline-none transition-colors " +
  "focus:border-[var(--k-brand)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--k-brand)_25%,transparent)]";

const fieldStyle = {
  background: "var(--k-surface)",
  borderColor: "var(--k-border)",
  color: "var(--k-text)",
};

const Field = ({ label, hint, error, htmlFor, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-semibold mb-1.5" style={{ color: "var(--k-text)" }}>
      {label}
    </label>
    {children}
    {error ? (
      <p role="alert" className="mt-1.5 text-xs font-medium" style={{ color: "var(--k-brand)" }}>
        {error}
      </p>
    ) : hint ? (
      <p className="mt-1.5 text-xs" style={{ color: "var(--k-muted)" }}>
        {hint}
      </p>
    ) : null}
  </div>
);

// Upload a File to imgbb and return the hosted image URL
async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY in .env.local");

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body,
  });
  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message || "Image upload failed");
  }
  return json.data.url;
}

const AddFacilityPage = ({ defaultEmail = "" }) => {
  const router = useRouter();

  const [form, setForm] = useState({ ...initialForm, owner_email: defaultEmail });
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState([]); // array of "HH:MM-HH:MM"
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [localPreview, setLocalPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Free the temporary blob URL when it changes or on unmount
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleChange = (e) => setField(e.target.name, e.target.value);

  /* ---------- image upload ---------- */
  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((er) => ({ ...er, thumbnail: "Please choose an image file." }));
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setErrors((er) => ({ ...er, thumbnail: `Image must be smaller than ${MAX_IMAGE_MB} MB.` }));
      return;
    }

    setLocalPreview(URL.createObjectURL(file));
    setField("thumbnail", "");
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setField("thumbnail", url);
      toast.success("Image uploaded");
    } catch (err) {
      setLocalPreview("");
      setErrors((er) => ({ ...er, thumbnail: err.message }));
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setLocalPreview("");
    setField("thumbnail", "");
  };

  /* ---------- slots (stored as an array) ---------- */
  const addSlot = () => {
    if (!slotStart || !slotEnd) {
      setErrors((e) => ({ ...e, available_slots: "Choose a start and an end time." }));
      return;
    }
    if (slotEnd <= slotStart) {
      setErrors((e) => ({ ...e, available_slots: "End time must be after the start time." }));
      return;
    }
    const slot = `${slotStart}-${slotEnd}`;
    if (slots.includes(slot)) {
      setErrors((e) => ({ ...e, available_slots: "That slot is already added." }));
      return;
    }
    setSlots((s) => [...s, slot].sort());
    setSlotStart("");
    setSlotEnd("");
    setErrors((e) => ({ ...e, available_slots: undefined }));
  };

  const removeSlot = (slot) => setSlots((s) => s.filter((x) => x !== slot));

  /* ---------- validation + submit ---------- */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter the facility name.";
    if (!form.facility_type) e.facility_type = "Choose a facility type.";
    if (form.location.trim().length < 5) e.location = "Enter the full location (at least 5 characters).";
    if (!(Number(form.price_per_hour) > 0)) e.price_per_hour = "Enter a price greater than 0.";
    if (!(Number.isInteger(Number(form.capacity)) && Number(form.capacity) > 0))
      e.capacity = "Enter a whole number of players.";
    if (form.description.trim().length < 20) e.description = "Write at least 20 characters.";
    if (!form.thumbnail) e.thumbnail = "Upload a photo of the facility.";
    if (slots.length === 0) e.available_slots = "Add at least one time slot.";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.owner_email))
      e.owner_email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (uploading) return toast.info("Wait for the image to finish uploading.");
    if (!validate()) {
      toast.error("Fix the highlighted fields.");
      return;
    }

    // Clean, typed payload that matches your database shape
    const payload = {
      name: form.name.trim(),
      facility_type: form.facility_type,
      location: form.location.trim(),
      price_per_hour: Number(form.price_per_hour),
      capacity: Number(form.capacity),
      available_slots: slots, // real array
      description: form.description.trim(),
      owner_email: form.owner_email.trim().toLowerCase(),
      booking_count: 0,
      thumbnail: form.thumbnail,
    };

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-facility`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("The server could not save this facility.");

      toast.success("Facility added");
      router.push("/all-facility");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setForm({ ...initialForm, owner_email: defaultEmail });
    setSlots([]);
    setSlotStart("");
    setSlotEnd("");
    setLocalPreview("");
    setErrors({});
  };

  const previewImg = localPreview || form.thumbnail;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "var(--k-text)" }}>
          List your facility
        </h1>
        <p className="mt-2" style={{ color: "var(--k-muted)" }}>
          Add a photo, your pricing and the hours players can book. You can edit everything later from Manage facilities.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* ---------------- FORM ---------------- */}
        <form
          onSubmit={onSubmit}
          onReset={(e) => {
            e.preventDefault();
            resetAll();
          }}
          noValidate
          className="lg:col-span-7 rounded-3xl border p-5 sm:p-7 space-y-6"
          style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
        >
          {/* Photo */}
          <Field
            label="Facility photo"
            htmlFor="photo"
            error={errors.thumbnail}
            hint={`JPG, PNG or WebP, up to ${MAX_IMAGE_MB} MB. Hosted on imgbb.`}
          >
            <div
              className="relative rounded-2xl border-2 border-dashed overflow-hidden flex items-center justify-center min-h-[200px]"
              style={{ borderColor: "var(--k-border)", background: "var(--k-surface-2)" }}
            >
              {previewImg ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewImg} alt="Facility preview" className="w-full h-56 object-cover" />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white text-sm font-semibold">
                      Uploading…
                    </div>
                  )}
                  {!uploading && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-black/65 text-white hover:bg-black/80"
                    >
                      Remove
                    </button>
                  )}
                </>
              ) : (
                <label htmlFor="photo" className="cursor-pointer text-center p-6">
                  <span
                    className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white"
                    style={{ background: "var(--k-gradient)" }}
                  >
                    Choose photo
                  </span>
                  <span className="block mt-2 text-xs" style={{ color: "var(--k-muted)" }}>
                    A wide, well-lit shot works best
                  </span>
                </label>
              )}
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className={previewImg ? "sr-only" : "absolute inset-0 opacity-0 cursor-pointer"}
                aria-label="Upload facility photo"
              />
            </div>
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Facility name" htmlFor="name" error={errors.name}>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Green Field Football Arena"
                className={inputClass}
                style={fieldStyle}
              />
            </Field>

            <Field label="Facility type" htmlFor="facility_type" error={errors.facility_type}>
              <select
                id="facility_type"
                name="facility_type"
                value={form.facility_type}
                onChange={handleChange}
                className={inputClass}
                style={fieldStyle}
              >
                <option value="">Select a type</option>
                {FACILITY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Location" htmlFor="location" error={errors.location} hint="Area and city, for example Mirpur, Dhaka">
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Mirpur, Dhaka"
              className={inputClass}
              style={fieldStyle}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Price per hour (৳)" htmlFor="price_per_hour" error={errors.price_per_hour}>
              <input
                id="price_per_hour"
                name="price_per_hour"
                type="number"
                inputMode="numeric"
                min="1"
                value={form.price_per_hour}
                onChange={handleChange}
                placeholder="1500"
                className={inputClass}
                style={fieldStyle}
              />
            </Field>

            <Field label="Capacity (players)" htmlFor="capacity" error={errors.capacity}>
              <input
                id="capacity"
                name="capacity"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={form.capacity}
                onChange={handleChange}
                placeholder="22"
                className={inputClass}
                style={fieldStyle}
              />
            </Field>
          </div>

          <Field label="Description" htmlFor="description" error={errors.description} hint="Facilities, surface, rules and anything players should know.">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Full-size ground with floodlights, changing rooms and a spectator gallery."
              className={`${inputClass} h-auto py-3 resize-y`}
              style={fieldStyle}
            />
          </Field>

          {/* Slots */}
          <Field
            label="Available time slots"
            error={errors.available_slots}
            hint="Add each bookable hour. Saved as a list, for example 06:00-07:00."
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="time"
                aria-label="Slot start time"
                value={slotStart}
                onChange={(e) => setSlotStart(e.target.value)}
                className={inputClass}
                style={fieldStyle}
              />
              <input
                type="time"
                aria-label="Slot end time"
                value={slotEnd}
                onChange={(e) => setSlotEnd(e.target.value)}
                className={inputClass}
                style={fieldStyle}
              />
              <button
                type="button"
                onClick={addSlot}
                className="h-11 px-5 rounded-xl text-sm font-bold text-white shrink-0 transition-all hover:brightness-110"
                style={{ background: "var(--k-brand)" }}
              >
                Add slot
              </button>
            </div>

            {slots.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Added time slots">
                {slots.map((slot) => (
                  <li
                    key={slot}
                    className="inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full text-xs font-bold border"
                    style={{
                      background: "color-mix(in srgb, var(--k-amber) 14%, transparent)",
                      borderColor: "color-mix(in srgb, var(--k-amber) 45%, transparent)",
                      color: "var(--k-text)",
                    }}
                  >
                    {slot}
                    <button
                      type="button"
                      onClick={() => removeSlot(slot)}
                      aria-label={`Remove slot ${slot}`}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] leading-none"
                      style={{ background: "var(--k-brand)" }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Field>

          <Field label="Owner email" htmlFor="owner_email" error={errors.owner_email}>
            <input
              id="owner_email"
              name="owner_email"
              type="email"
              value={form.owner_email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
              style={fieldStyle}
            />
          </Field>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="h-12 px-8 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "var(--k-gradient)" }}
            >
              {submitting ? "Adding facility…" : uploading ? "Uploading photo…" : "Add facility"}
            </button>
            <button
              type="reset"
              className="h-12 px-6 rounded-xl text-sm font-semibold border transition-colors hover:bg-[var(--k-surface-2)]"
              style={{ borderColor: "var(--k-border)", color: "var(--k-text)" }}
            >
              Reset form
            </button>
          </div>
        </form>

        {/* ---------------- LIVE PREVIEW ---------------- */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24" aria-label="Listing preview">
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--k-muted)" }}>
            How players will see it
          </p>
          <div
            className="rounded-3xl border overflow-hidden shadow-xl"
            style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
          >
            <div className="h-48" style={{ background: "var(--k-surface-2)" }}>
              {previewImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewImg} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm" style={{ color: "var(--k-muted)" }}>
                  Your photo appears here
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-extrabold truncate" style={{ color: "var(--k-text)" }}>
                    {form.name || "Facility name"}
                  </h2>
                  <p className="text-sm truncate" style={{ color: "var(--k-muted)" }}>
                    {form.facility_type || "Type"}
                    {form.location ? `, ${form.location}` : ""}
                  </p>
                </div>
                <p className="text-lg font-extrabold shrink-0" style={{ color: "var(--k-brand)" }}>
                  {form.price_per_hour ? `৳${Number(form.price_per_hour).toLocaleString()}` : "৳0"}
                  <span className="text-xs font-medium" style={{ color: "var(--k-muted)" }}>
                    /hr
                  </span>
                </p>
              </div>

              <p className="mt-3 text-sm line-clamp-3" style={{ color: "var(--k-muted)" }}>
                {form.description || "Your description will show here."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {slots.length ? (
                  slots.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{ background: "var(--k-surface-2)", color: "var(--k-text)" }}
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs" style={{ color: "var(--k-muted)" }}>
                    No slots added yet
                  </span>
                )}
                {slots.length > 4 && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ color: "var(--k-brand)" }}>
                    +{slots.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs" style={{ color: "var(--k-muted)" }}>
                <span>Up to {form.capacity || "0"} players</span>
                <span>0 bookings</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default AddFacilityPage;