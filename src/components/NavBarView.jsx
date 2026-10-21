"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Layers3Diagonal,
  Plus,
  Receipt,
  ShieldCheck,
  Person,
  Bars,
  Xmark,
  ChevronDown,
} from "@gravity-ui/icons";
import LogOutButton from "./LogOutButton";
import { ThemeSwitch } from "./ThemeSwitch";

const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/all-facility", label: "All Facilities", icon: Layers3Diagonal },
];

const userNavItems = [
  { href: "/add-facility", label: "Add Facility", icon: Plus },
  { href: "/bookings", label: "My Bookings", icon: Receipt },
  { href: "/manage-facilities", label: "Manage Facilities", icon: ShieldCheck },
];

const getInitials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase() || "U";

const UserAvatar = ({ user, size = 36 }) => (
  <span
    className="inline-flex items-center justify-center rounded-full overflow-hidden text-xs font-bold text-white shrink-0"
    style={{ width: size, height: size, background: "var(--k-gradient)" }}
  >
    {user?.image ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={user.image} alt={user?.name || "User avatar"} className="w-full h-full object-cover" />
    ) : (
      getInitials(user?.name)
    )}
  </span>
);

export const NavBarView = ({ user = null }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userRef = useRef(null);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Click outside + Escape for the user dropdown
  useEffect(() => {
    const onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setIsUserOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsUserOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkBase =
    "relative inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors";

  return (
    <>
      {/* Skip link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg text-white font-semibold"
        style={{ background: "var(--k-brand)" }}
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-shadow border-b ${
          scrolled ? "shadow-lg" : "shadow-none"
        }`}
        style={{
          background: "color-mix(in srgb, var(--k-bg) 88%, transparent)",
          borderColor: "var(--k-border)",
        }}
      >
        {/* Brand gradient accent line */}
        <div className="h-[3px] w-full" style={{ background: "var(--k-gradient)" }} aria-hidden="true" />

        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4"
        >
          {/* Logo */}
          <Link href="/" aria-label="Khalahobe - Home" className="flex items-center gap-2.5 shrink-0">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md"
              style={{ background: "var(--k-gradient)" }}
              aria-hidden="true"
            >
              K
            </span>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: "var(--k-text)" }}>
              Khala<span style={{ color: "var(--k-brand)" }}>hobe</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={linkBase}
                    style={{
                      color: active ? "var(--k-brand)" : "var(--k-muted)",
                      background: active
                        ? "color-mix(in srgb, var(--k-brand) 10%, transparent)"
                        : "transparent",
                    }}
                  >
                    <Icon className="text-base" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeSwitch />

            {/* Desktop: user menu or auth buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <div className="relative" ref={userRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={isUserOpen}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-colors hover:opacity-90"
                    style={{ borderColor: "var(--k-border)", background: "var(--k-surface)" }}
                  >
                    <UserAvatar user={user} size={32} />
                    <span className="text-sm font-semibold max-w-[110px] truncate" style={{ color: "var(--k-text)" }}>
                      {user?.name || "Account"}
                    </span>
                    <ChevronDown
                      className={`text-xs transition-transform ${isUserOpen ? "rotate-180" : ""}`}
                      style={{ color: "var(--k-muted)" }}
                    />
                  </button>

                  {isUserOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-2 animate-in fade-in zoom-in-95"
                      style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
                    >
                      <div className="flex items-center gap-3 p-3 mb-1 rounded-xl" style={{ background: "var(--k-surface-2)" }}>
                        <UserAvatar user={user} size={40} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: "var(--k-text)" }}>
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs capitalize" style={{ color: "var(--k-muted)" }}>
                            {user?.role || "Member"}
                          </p>
                        </div>
                      </div>

                      {[{ href: "/profile", label: "Profile", icon: Person }, ...userNavItems].map(
                        ({ href, label, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            role="menuitem"
                            aria-current={isActive(href) ? "page" : undefined}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--k-surface-2)]"
                            style={{ color: isActive(href) ? "var(--k-brand)" : "var(--k-text)" }}
                          >
                            <Icon className="text-base" style={{ color: "var(--k-brand)" }} />
                            {label}
                          </Link>
                        )
                      )}

                      <div className="mt-1 pt-2 px-1 border-t" style={{ borderColor: "var(--k-border)" }}>
                        <LogOutButton />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors hover:bg-[var(--k-surface-2)]"
                    style={{ color: "var(--k-text)", borderColor: "var(--k-border)" }}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 py-2 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:brightness-110 hover:-translate-y-0.5"
                    style={{ background: "var(--k-gradient)" }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ borderColor: "var(--k-border)", color: "var(--k-text)", background: "var(--k-surface)" }}
            >
              {isMenuOpen ? <Xmark className="text-xl" /> : <Bars className="text-xl" />}
            </button>
          </div>
        </nav>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={`lg:hidden absolute top-full left-0 w-full border-b shadow-2xl transition-all duration-300 origin-top ${
            isMenuOpen
              ? "opacity-100 scale-y-100 visible"
              : "opacity-0 scale-y-95 invisible pointer-events-none"
          }`}
          style={{ background: "var(--k-bg)", borderColor: "var(--k-border)" }}
        >
          <div className="px-4 pt-3 pb-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {user && (
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--k-surface-2)" }}>
                <UserAvatar user={user} size={44} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--k-text)" }}>
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs capitalize" style={{ color: "var(--k-muted)" }}>
                    {user?.role || "Member"}
                  </p>
                </div>
              </div>
            )}

            <MobileSection title="Explore" items={navItems} isActive={isActive} />

            {user && (
              <div className="pt-2 border-t" style={{ borderColor: "var(--k-border)" }}>
                <MobileSection
                  title="Workspace"
                  items={[{ href: "/profile", label: "Profile", icon: Person }, ...userNavItems]}
                  isActive={isActive}
                />
                <div className="pt-3 px-3">
                  <LogOutButton />
                </div>
              </div>
            )}

            {!user && (
              <div className="grid grid-cols-2 gap-2 pt-4 border-t" style={{ borderColor: "var(--k-border)" }}>
                <Link
                  href="/login"
                  className="text-center py-3 rounded-xl text-sm font-semibold border"
                  style={{ color: "var(--k-text)", borderColor: "var(--k-border)" }}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="text-center py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "var(--k-gradient)" }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop behind the mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

const MobileSection = ({ title, items, isActive }) => (
  <div className="space-y-1">
    <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-1" style={{ color: "var(--k-muted)" }}>
      {title}
    </p>
    {items.map(({ href, label, icon: Icon }) => {
      const active = isActive(href);
      return (
        <Link
          key={href}
          href={href}
          aria-current={active ? "page" : undefined}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-colors"
          style={{
            color: active ? "var(--k-brand)" : "var(--k-text)",
            background: active ? "color-mix(in srgb, var(--k-brand) 10%, transparent)" : "transparent",
          }}
        >
          <Icon className="text-xl" style={{ color: "var(--k-brand)" }} />
          {label}
        </Link>
      );
    })}
  </div>
);

export default NavBarView;