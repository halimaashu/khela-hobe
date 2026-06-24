"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Import Gravity UI Icons
import {
  House,
  Buildings,
  Plus,
  BookOpen,
  Briefcase,
  User,
  Bars,
  Xmark,
  ChevronDown
} from "@gravity-ui/icons";

import LogOutButton from "./LogOutButton";
import { ThemeSwitch } from "./ThemeSwitch";

const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/all-facility", label: "All facilities", icon: Buildings },
];

const userNavItems = [
  { href: "/add-facility", label: "Add facility", icon: Plus },
  { href: "/bookings", label: "My bookings", icon: BookOpen },
  { href: "/manage-facilities", label: "Manage facilities", icon: Briefcase },
];

function AvatarCircle({ name, src, size = 28 }) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full object-cover ring-2 ring-transparent"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center font-medium flex-shrink-0 bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

export const NavBarView = ({ user = null }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border/40 shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-1 ring-border/30 transition-transform group-hover:scale-105">
              <Image
                src="/khela-hobe.png"
                alt="Khela Hobe logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Khela <span className="text-primary">Hobe</span>
            </span>
          </Link>

          {/* ── Desktop centre links ── */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Icon className="text-sm shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop right ── */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeSwitch />

            {user ? (
              /* User dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-border/40 hover:border-border/80 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <AvatarCircle name={user.name} src={user.image} size={28} />
                  <div className="flex flex-col items-start leading-tight max-w-[110px]">
                    <span className="text-[13px] font-medium text-foreground truncate w-full">
                      {user.name || "User"}
                    </span>
                    <span className="text-[11px] text-muted-foreground capitalize">
                      {user.role || "Member"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`text-muted-foreground text-xs ml-0.5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+6px)] w-52 bg-background border border-border/50 rounded-xl shadow-lg py-1.5 z-50">
                    <DropdownLink
                      href="/profile"
                      icon={User}
                      label="Profile"
                      onClick={() => setDropdownOpen(false)}
                    />
                    {userNavItems.map(({ href, label, icon }) => (
                      <DropdownLink
                        key={href}
                        href={href}
                        icon={icon}
                        label={label}
                        onClick={() => setDropdownOpen(false)}
                      />
                    ))}
                    <div className="my-1 h-px bg-border/40 mx-2" />
                    <div className="px-1">
                      <LogOutButton />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth buttons */
              <div className="flex items-center gap-1.5">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-muted-foreground border border-border/40 hover:border-border/80 hover:bg-accent transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile: theme + hamburger ── */}
          <div className="flex lg:hidden items-center gap-1.5">
            <ThemeSwitch />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/40 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {mobileOpen ? (
                <Xmark className="text-base" />
              ) : (
                <Bars className="text-base" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border/40 ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 pt-3 space-y-1 bg-background max-h-[calc(100vh-56px)] overflow-y-auto">

          {/* User identity card */}
          {user && (
            <div className="flex items-center gap-3 p-3 mb-2 bg-accent/50 rounded-xl">
              <AvatarCircle name={user.name} src={user.image} size={38} />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role || "Member"}
                </p>
              </div>
            </div>
          )}

          {/* Navigation section */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2 pb-1 pt-1">
            Navigation
          </p>
          {navItems.map(({ href, label, icon: Icon }) => (
            <DrawerLink
              key={href}
              href={href}
              icon={Icon}
              label={label}
              onClick={() => setMobileOpen(false)}
            />
          ))}

          {/* Workspace section (logged in only) */}
          {user && (
            <>
              <div className="h-px bg-border/40 my-2 mx-1" />
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2 pb-1">
                Workspace
              </p>
              <DrawerLink
                href="/profile"
                icon={User}
                label="Profile"
                onClick={() => setMobileOpen(false)}
              />
              {userNavItems.map(({ href, label, icon }) => (
                <DrawerLink
                  key={href}
                  href={href}
                  icon={icon}
                  label={label}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <div className="h-px bg-border/40 my-2 mx-1" />
              <div className="px-1">
                <LogOutButton />
              </div>
            </>
          )}

          {/* Guest CTAs */}
          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-border/40">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center py-2 rounded-lg text-sm font-medium border border-border/50 text-muted-foreground hover:bg-accent transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

/* ── Small reusable sub-components ── */

function DropdownLink({ href, icon: Icon, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 px-3 py-1.5 mx-1 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
    >
      <Icon className="text-sm text-muted-foreground shrink-0" />
      {label}
    </Link>
  );
}

function DrawerLink({ href, icon: Icon, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
    >
      <Icon className="text-base text-primary shrink-0" />
      {label}
    </Link>
  );
}

export default NavBarView;