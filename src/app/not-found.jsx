import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const NotFound = () => {
  return (
    <section
      aria-labelledby="notfound-heading"
      className="relative overflow-hidden min-h-[75vh] flex items-center justify-center px-4 py-20"
      style={{ background: "var(--k-bg)" }}
    >
      {/* Soft glow behind the number */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{ background: "var(--k-gradient)" }}
      />

      <div className="relative text-center max-w-lg">
        <p
          aria-hidden="true"
          className="text-[7rem] sm:text-[10rem] font-black leading-none tracking-tighter bg-clip-text text-transparent select-none"
          style={{ backgroundImage: "var(--k-gradient)" }}
        >
          404
        </p>

        <h1
          id="notfound-heading"
          className="mt-2 text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: "var(--k-text)" }}
        >
          That one went out of bounds.
        </h1>

        <p className="mt-3 leading-relaxed" style={{ color: "var(--k-muted)" }}>
          The page you are looking for does not exist, or the facility may have been removed. Head back and
          find your next game.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5"
            style={{ background: "var(--k-gradient)" }}
          >
            Go home
          </Link>
          <Link
            href="/all-facility"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold border transition-colors hover:bg-[var(--k-surface-2)]"
            style={{ borderColor: "var(--k-border)", color: "var(--k-text)", background: "var(--k-surface)" }}
          >
            Browse facilities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;