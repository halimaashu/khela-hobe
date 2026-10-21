import React from "react";
import Link from "next/link";

const benefits = [
  { title: "Set your own hours", text: "Add the time slots you want to offer. Players can only book those." },
  { title: "Set your own price", text: "Choose the hourly rate that suits your ground or court." },
  { title: "See every booking", text: "Track who booked and when from your dashboard." },
];

const OurCta = () => {
  return (
    <section aria-labelledby="owner-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-[#0f0f12] text-white px-6 sm:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
          style={{ background: "var(--k-gradient)" }}
        />

        <div className="relative">
          <h2 id="owner-heading" className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Own a ground, court or studio?
          </h2>
          <p className="mt-4 text-white/70 max-w-md">
            List it on Khalahobe and let players book open hours online, with no phone calls to manage.
          </p>
          <Link
            href="/add-facility"
            className="inline-block mt-8 px-7 py-3.5 rounded-xl text-sm font-bold bg-white text-[#0f0f12] transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            List your facility
          </Link>
        </div>

        <ul className="relative space-y-5">
          {benefits.map((b) => (
            <li key={b.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "var(--k-amber)" }}
              />
              <div>
                <p className="font-bold">{b.title}</p>
                <p className="text-sm text-white/65 mt-0.5">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurCta;