import React from "react";
import Link from "next/link";

const FinalCta = () => {
  return (
    <section aria-labelledby="cta-heading" className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
      <div
        className="rounded-3xl px-6 py-14 text-center text-white shadow-xl"
        style={{ background: "linear-gradient(135deg, #ec0000, #ec5300)" }}
      >
        <h2 id="cta-heading" className="text-3xl md:text-5xl font-black tracking-tight">
          Ready to play?
        </h2>
        <p className="mt-3 text-white/85 max-w-md mx-auto">
          Find a facility near you and lock in your slot today.
        </p>
        <Link
          href="/all-facility"
          className="inline-block mt-8 px-8 py-3.5 rounded-xl text-sm font-bold bg-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ color: "#ec0000" }}
        >
          Find a facility
        </Link>
      </div>
    </section>
  );
};

export default FinalCta;