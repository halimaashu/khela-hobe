"use client";

import React, { useState } from "react";
import Link from "next/link";

const DETAIL_PATH = "/all-facility"; // detail page = `${DETAIL_PATH}/${_id}`; change if your route differs
const FALLBACK = "/project_aihub.png"; // replace with a placeholder image from /public

const FacilityCrd = ({ re }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const price = Number(re.price_per_hour) || 0;
  const bookings = Number(re.booking_count) || 0;
  const slotCount = Array.isArray(re.available_slots) ? re.available_slots.length : 0;

  return (
    <Link
      href={`${DETAIL_PATH}/${re._id}`}
      className="group flex flex-col rounded-3xl border overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2"
      style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--k-surface-2)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgFailed || !re.thumbnail ? FALLBACK : re.thumbnail}
          alt={re.name}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {re.facility_type && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow"
            style={{ background: "var(--k-brand)" }}
          >
            {re.facility_type}
          </span>
        )}
        {bookings > 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur">
            {bookings.toLocaleString()} bookings
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-lg font-extrabold leading-snug transition-colors group-hover:text-[var(--k-brand)] line-clamp-1"
          style={{ color: "var(--k-text)" }}
        >
          {re.name}
        </h3>
        <p className="mt-1 text-sm line-clamp-1" style={{ color: "var(--k-muted)" }}>
          {re.location}
        </p>

        <p className="mt-3 text-sm leading-relaxed line-clamp-2" style={{ color: "var(--k-muted)" }}>
          {re.description}
        </p>

        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-extrabold" style={{ color: "var(--k-brand)" }}>
              ৳{price.toLocaleString()}
              <span className="text-xs font-medium" style={{ color: "var(--k-muted)" }}>
                /hr
              </span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--k-muted)" }}>
              {slotCount} {slotCount === 1 ? "slot" : "slots"} daily
              {re.capacity ? `, up to ${re.capacity} players` : ""}
            </p>
          </div>

          <span
            className="px-4 py-2 rounded-xl text-sm font-bold text-white shrink-0 transition-all group-hover:brightness-110"
            style={{ background: "var(--k-gradient)" }}
          >
            View and book
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FacilityCrd;