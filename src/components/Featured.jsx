import React from "react";
import Link from "next/link";
import FacilityCrd from "./FacilityCrd";

async function getFeatured() {
  try {
    // Re-fetch at most once a minute instead of on every request
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Featured fetch failed:", err);
    return [];
  }
}

// Only show complete, good-looking listings on the home page
const isPresentable = (f) =>
  f?._id &&
  f?.name &&
  f?.thumbnail &&
  !String(f.thumbnail).startsWith("data:") && // huge base64 images slow the page down
  Number(f.price_per_hour) > 0 &&
  Array.isArray(f.available_slots) &&
  f.available_slots.length > 0;

const Featured = async () => {
  const all = await getFeatured();

  const result = all
    .filter(isPresentable)
    .sort((a, b) => (Number(b.booking_count) || 0) - (Number(a.booking_count) || 0))
    .slice(0, 6);

  return (
    <section
      aria-labelledby="featured-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2
            id="featured-heading"
            className="text-3xl md:text-4xl font-black tracking-tight"
            style={{ color: "var(--k-text)" }}
          >
            Popular right now
          </h2>
          <p className="mt-2 max-w-xl" style={{ color: "var(--k-muted)" }}>
            The most booked grounds, courts and studios on Khalahobe.
          </p>
        </div>

        <Link
          href="/all-facility"
          className="text-sm font-bold underline-offset-4 hover:underline"
          style={{ color: "var(--k-brand)" }}
        >
          View all facilities
        </Link>
      </div>

      {result.length === 0 ? (
        <div
          className="rounded-3xl border p-10 text-center"
          style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
        >
          <p className="font-bold" style={{ color: "var(--k-text)" }}>
            Facilities will show up here soon.
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--k-muted)" }}>
            Be the first to list one.
          </p>
          <Link
            href="/add-facility"
            className="inline-block mt-5 px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: "var(--k-gradient)" }}
          >
            Add a facility
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map((re) => (
            <FacilityCrd key={re._id} re={re} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Featured;