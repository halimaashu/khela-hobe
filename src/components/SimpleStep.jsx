"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Find your facility",
    text: "Browse turfs, courts and grounds, then pick the sport and place you love.",
  },
  {
    title: "Log in or sign up",
    text: "Create a free account in seconds so your bookings are saved and easy to manage.",
  },
  {
    title: "Choose a slot",
    text: "Open the facility page, pick a date and time, and press Book Now.",
  },
  {
    title: "Play!",
    text: "Your slot is confirmed. Show up, warm up and enjoy the game.",
  },
];

const SimpleStep = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="steps-heading"
      className="py-20 md:py-28"
      style={{ background: "var(--k-bg)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--k-brand)" }}
          >
            How it works
          </p>
          <h2
            id="steps-heading"
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--k-text)" }}
          >
            Simple steps to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--k-gradient)" }}
            >
              book
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--k-muted)" }}>
            From search to confirmed slot in four quick steps.
          </p>
        </div>

        <ol className="relative">
          {/* Vertical line */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-5 md:left-1/2 w-0.5 md:-translate-x-1/2 rounded-full"
            style={{ background: "var(--k-gradient)", opacity: 0.35 }}
          />

          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className={`relative pl-14 pb-10 last:pb-0 md:w-1/2 ${
                  isEven ? "md:pl-0 md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Numbered marker */}
                <span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shadow-lg ring-4 ${
                    isEven
                      ? "md:left-auto md:right-0 md:translate-x-1/2"
                      : "md:-translate-x-1/2"
                  }`}
                  style={{
                    background: "var(--k-gradient)",
                    "--tw-ring-color": "var(--k-bg)",
                  }}
                >
                  {i + 1}
                </span>

                {/* Card */}
                <div
                  className="group rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "var(--k-surface)",
                    borderColor: "var(--k-border)",
                  }}
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: "var(--k-amber)" }}
                  >
                    Step {i + 1}
                  </p>
                  <h3
                    className="text-lg font-extrabold mb-1.5 transition-colors group-hover:text-[var(--k-brand)]"
                    style={{ color: "var(--k-text)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--k-muted)" }}>
                    {step.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-14 text-center">
          <Link
            href="/all-facility"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5"
            style={{ background: "var(--k-gradient)" }}
          >
            Start booking
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimpleStep;