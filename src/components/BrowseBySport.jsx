import React from "react";
import Link from "next/link";

// Names must match the facility_type values saved by the Add Facility form
const sports = [
  { name: "Football", icon: "⚽" },
  { name: "Cricket", icon: "🏏" },
  { name: "Badminton", icon: "🏸" },
  { name: "Basketball", icon: "🏀" },
  { name: "Tennis", icon: "🎾" },
  { name: "Swimming", icon: "🏊" },
  { name: "Volleyball", icon: "🏐" },
  { name: "Futsal", icon: "🥅" },
];

const BrowseBySport = () => {
  return (
    <section aria-labelledby="sports-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <div className="mb-8">
        <h2 id="sports-heading" className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "var(--k-text)" }}>
          Pick your game
        </h2>
        <p className="mt-2 max-w-xl" style={{ color: "var(--k-muted)" }}>
          Jump straight to the facilities for your sport.
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sports.map(({ name, icon }) => (
          <li key={name}>
            <Link
              href={`/all-facility?sport=${encodeURIComponent(name)}`}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border py-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[var(--k-brand)]"
              style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
            >
              <span className="text-4xl transition-transform group-hover:scale-110" aria-hidden="true">
                {icon}
              </span>
              <span className="text-sm font-bold" style={{ color: "var(--k-text)" }}>
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BrowseBySport;