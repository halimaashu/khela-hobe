import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import BookingCard from "@/components/BookingCard";
import { OwnerActions, SafeImg } from "@/components/DetailClientParts";
import {
  ArrowLeft,
  LocationArrowFill,
  Clock,
  Persons,
  Receipt,
} from "@gravity-ui/icons";

// Handles old records where available_slots was saved as a string
const normalizeSlots = (slots) => {
  if (Array.isArray(slots)) return slots.filter(Boolean);
  if (typeof slots === "string") {
    return slots.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const f = await res.json();
      return {
        title: f.name,
        description: (f.description || "").slice(0, 155),
        openGraph: { title: f.name, images: f.thumbnail?.startsWith("http") ? [f.thumbnail] : [] },
      };
    }
  } catch {}
  return { title: "Facility details" };
}

const DetailPage = async ({ params }) => {
  const { id } = await params;
  const reqHeaders = await headers();

  // Session + token (both optional: guests can still view the page)
  let user = null;
  let token = "";
  try {
    const session = await auth.api.getSession({ headers: reqHeaders });
    user = session?.user || null;
  } catch (err) {
    console.error("Session error:", err);
  }
  try {
    const t = await auth.api.getToken({ headers: reqHeaders });
    token = t?.token || "";
  } catch {}

  let data = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured/${id}`, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (res.ok) data = await res.json();
  } catch (error) {
    console.error("Error fetching facility details:", error);
  }

  if (!data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-extrabold mb-2" style={{ color: "var(--k-text)" }}>
          Facility not found
        </h1>
        <p className="text-sm mb-6 max-w-sm" style={{ color: "var(--k-muted)" }}>
          This facility may have been removed, or the link is wrong.
        </p>
        <Link
          href="/all-facility"
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white inline-flex items-center gap-2"
          style={{ background: "var(--k-gradient)" }}
        >
          <ArrowLeft /> Back to facilities
        </Link>
      </div>
    );
  }

  const facility = { ...data, available_slots: normalizeSlots(data.available_slots) };
  const {
    name,
    thumbnail,
    location,
    description,
    available_slots,
    facility_type,
    capacity,
    booking_count,
    owner_email,
  } = facility;

  const price = Number(facility.price_per_hour);
  const isOwner = !!user?.email && user.email.toLowerCase() === (owner_email || "").toLowerCase();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8" style={{ background: "var(--k-bg)" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/all-facility"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-colors hover:bg-[var(--k-surface-2)]"
            style={{ borderColor: "var(--k-border)", color: "var(--k-text)", background: "var(--k-surface)" }}
          >
            <ArrowLeft /> Back to facilities
          </Link>

          {isOwner && <OwnerActions id={String(facility._id)} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border shadow-xl"
              style={{ borderColor: "var(--k-border)", background: "var(--k-surface-2)" }}
            >
              <SafeImg
                src={thumbnail}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              {facility_type && (
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                  style={{ background: "var(--k-brand)" }}
                >
                  {facility_type}
                </span>
              )}
              <h1 className="absolute bottom-5 left-5 right-5 text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow">
                {name}
              </h1>
            </div>

            {/* Overview */}
            <div
              className="p-6 rounded-3xl border space-y-5"
              style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
            >
              <div className="flex items-start gap-2 text-sm font-medium" style={{ color: "var(--k-muted)" }}>
                <LocationArrowFill className="text-lg shrink-0 mt-0.5" style={{ color: "var(--k-brand)" }} />
                <span>{location}</span>
              </div>

              <dl className="grid grid-cols-3 gap-3">
                {[
                  { icon: Receipt, label: "Price", value: Number.isFinite(price) ? `৳${price.toLocaleString()}/hr` : "Ask owner" },
                  { icon: Persons, label: "Capacity", value: capacity ? `${capacity} players` : "Not listed" },
                  { icon: Clock, label: "Bookings", value: Number.isFinite(Number(booking_count)) ? Number(booking_count).toLocaleString() : "0" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-3.5"
                    style={{ background: "var(--k-surface-2)" }}
                  >
                    <dt className="text-xs flex items-center gap-1.5" style={{ color: "var(--k-muted)" }}>
                      <Icon style={{ color: "var(--k-brand)" }} /> {label}
                    </dt>
                    <dd className="mt-1 text-sm sm:text-base font-extrabold" style={{ color: "var(--k-text)" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div>
                <h2 className="text-base font-extrabold mb-2" style={{ color: "var(--k-text)" }}>
                  About this facility
                </h2>
                <p className="text-sm leading-relaxed max-w-prose" style={{ color: "var(--k-muted)" }}>
                  {description || "The owner has not added a description yet."}
                </p>
              </div>
            </div>

            {/* Read-only hours */}
            <div
              className="p-6 rounded-3xl border"
              style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <h2 className="text-base font-extrabold" style={{ color: "var(--k-text)" }}>
                  Daily hours
                </h2>
                <span className="text-xs" style={{ color: "var(--k-muted)" }}>
                  Choose your slot in the booking panel
                </span>
              </div>

              {available_slots.length === 0 ? (
                <p className="text-sm" style={{ color: "var(--k-muted)" }}>
                  The owner has not added any time slots yet.
                </p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {available_slots.map((slot) => (
                    <li
                      key={slot}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{ background: "var(--k-surface-2)", color: "var(--k-text)" }}
                    >
                      {slot}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right column: booking */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <BookingCard data={facility} user={user ? { name: user.name, email: user.email } : null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;