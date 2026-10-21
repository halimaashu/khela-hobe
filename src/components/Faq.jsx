import React from "react";

// Edit these answers so they match how your app really works.
const faqs = [
  {
    q: "Do I need an account to book?",
    a: "You can browse every facility without one. You need to log in or sign up when you confirm a booking, so your bookings are saved to your account.",
  },
  {
    q: "How do I book a facility?",
    a: "Open a facility, choose a date, pick one of the available time slots and press Book now. Your booking appears in My Bookings.",
  },
  {
    q: "Can I book more than one time slot?",
    a: "Each booking covers one slot. To play for longer, make another booking for the next slot.",
  },
  {
    q: "What if a slot I want is already taken?",
    a: "Booked slots are crossed out on the booking panel. Pick another time or another date.",
  },
  {
    q: "How do I list my own facility?",
    a: "Log in, open Add Facility, upload a photo, set your price and add the time slots you offer. You can manage it later from Manage Facilities.",
  },
];

const Faq = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h2 id="faq-heading" className="text-3xl md:text-4xl font-black tracking-tight text-center" style={{ color: "var(--k-text)" }}>
        Questions, answered
      </h2>

      <div className="mt-10 space-y-3">
        {faqs.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border px-5 py-4 open:shadow-md transition-shadow"
            style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden"
              style={{ color: "var(--k-text)" }}
            >
              {q}
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                style={{ color: "var(--k-brand)" }}
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--k-muted)" }}>
              {a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;