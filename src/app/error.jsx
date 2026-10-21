"use client";

import { useEffect } from "react";
import Link from "next/link";

// Next.js passes `error` and `reset` to this file automatically
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <section
      role="alert"
      aria-labelledby="error-heading"
      className="relative overflow-hidden min-h-[75vh] flex items-center justify-center px-4 py-20"
      style={{ background: "var(--k-bg)" }}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{ background: "var(--k-gradient)" }}
      />

      <div className="relative text-center max-w-lg">
        <span
          aria-hidden="true"
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg"
          style={{ background: "var(--k-gradient)" }}
        >
          !
        </span>

        <h1
          id="error-heading"
          className="mt-6 text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: "var(--k-text)" }}
        >
          Something went wrong
        </h1>

        <p className="mt-3 leading-relaxed" style={{ color: "var(--k-muted)" }}>
          We could not load this page. This is usually temporary, so try again. If it keeps happening, come
          back in a few minutes.
        </p>

        {error?.digest && (
          <p className="mt-3 text-xs" style={{ color: "var(--k-muted)" }}>
            Error code: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5"
            style={{ background: "var(--k-gradient)" }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold border transition-colors hover:bg-[var(--k-surface-2)]"
            style={{ borderColor: "var(--k-border)", color: "var(--k-text)", background: "var(--k-surface)" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}