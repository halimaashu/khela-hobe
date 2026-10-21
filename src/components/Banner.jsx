"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const sports = ["Football", "Cricket", "Badminton", "Basketball", "Tennis"];

const stats = [
  { value: "500+", label: "Facilities" },
  { value: "10k+", label: "Bookings" },
  { value: "4.8★", label: "Avg. rating" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const Banner = () => {
  const router = useRouter();
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sport) params.set("sport", sport);
    if (date) params.set("date", date);
    router.push(`/all-facility${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{ background: "var(--k-bg)" }}
    >
      {/* Decorative glow blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--k-gradient)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-20"
        style={{ background: "var(--k-gradient)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
            style={{
              color: "var(--k-brand)",
              borderColor: "color-mix(in srgb, var(--k-brand) 30%, transparent)",
              background: "color-mix(in srgb, var(--k-brand) 8%, transparent)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--k-brand)" }} />
            Playground booking made easy
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
            style={{ color: "var(--k-text)" }}
          >
            Find your field.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--k-gradient)" }}
            >
              Book in seconds.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "var(--k-muted)" }}
          >
            Discover turfs, courts and grounds near you, check live availability and
            reserve your slot. Khalahobe gets your game on the calendar, not stuck in
            phone calls.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            role="search"
            aria-label="Search facilities"
            className="mt-8 p-2 rounded-2xl border shadow-xl flex flex-col sm:flex-row gap-2"
            style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
          >
            <label className="flex-1">
              <span className="sr-only">Sport</span>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full h-12 px-4 rounded-xl text-sm font-medium bg-transparent outline-none"
                style={{ color: "var(--k-text)", background: "var(--k-surface-2)" }}
              >
                <option value="">Any sport</option>
                {sports.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex-1">
              <span className="sr-only">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl text-sm font-medium outline-none"
                style={{ color: "var(--k-text)", background: "var(--k-surface-2)" }}
              />
            </label>

            <button
              type="submit"
              className="h-12 px-7 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "var(--k-gradient)" }}
            >
              Search
            </button>
          </motion.form>

          {/* Secondary CTA + stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            <Link
              href="/all-facility"
              className="text-sm font-bold underline-offset-4 hover:underline"
              style={{ color: "var(--k-brand)" }}
            >
              Browse all facilities →
            </Link>

            <dl className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-extrabold" style={{ color: "var(--k-text)" }}>
                    {s.value}
                  </dd>
                  <p className="text-xs" style={{ color: "var(--k-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Right: booking preview card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5 relative"
          aria-hidden="true"
        >
          <div
            className="rounded-3xl border p-5 shadow-2xl"
            style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
          >
            <div
              className="h-44 rounded-2xl flex items-end p-4"
              style={{ background: "var(--k-gradient)" }}
            >
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/30 text-white backdrop-blur">
                Popular
              </span>
            </div>

            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--k-text)" }}>
                  Green Arena Turf
                </h2>
                <p className="text-sm" style={{ color: "var(--k-muted)" }}>
                  Football · 7v7
                </p>
              </div>
              <p className="text-lg font-extrabold" style={{ color: "var(--k-brand)" }}>
                ৳1,800
                <span className="text-xs font-medium" style={{ color: "var(--k-muted)" }}>
                  /hr
                </span>
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["5 PM", "6 PM", "7 PM"].map((t, i) => (
                <span
                  key={t}
                  className="text-center py-2 rounded-lg text-xs font-bold"
                  style={
                    i === 1
                      ? { background: "var(--k-brand)", color: "#fff" }
                      : { background: "var(--k-surface-2)", color: "var(--k-text)" }
                  }
                >
                  {t}
                </span>
              ))}
            </div>

            <div
              className="mt-4 py-3 rounded-xl text-center text-sm font-bold text-white"
              style={{ background: "var(--k-gradient)" }}
            >
              Book Now
            </div>
          </div>

          {/* Floating confirmation chip */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-4 px-4 py-2.5 rounded-2xl border shadow-xl text-sm font-bold"
            style={{
              background: "var(--k-surface)",
              borderColor: "var(--k-border)",
              color: "var(--k-text)",
            }}
          >
            <span style={{ color: "var(--k-amber)" }}>✓</span> Slot confirmed
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;