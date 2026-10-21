"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch on Next.js SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Skeleton loader while theme resolves on client side
    return (
      <div className="h-10 w-32 rounded-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-slate-300/40 dark:border-slate-700/40" />
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      className="
        group relative inline-flex items-center gap-2 px-3 py-1.5 overflow-hidden
        rounded-full border border-slate-200 dark:border-slate-800
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
        text-xs font-bold tracking-wide
        text-slate-800 dark:text-slate-200
        shadow-md hover:shadow-xl hover:shadow-[#ec0000]/10
        transition-all duration-300 ease-out
        hover:scale-105 hover:border-[#ec0000]/40
        active:scale-95
      "
    >
      {/* Brand Glowing Background Hover Accent */}
      <span
        className="
          absolute inset-0 -z-10 opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          bg-gradient-to-r from-[#ec0000]/15 via-[#ec5300]/15 to-[#ecca00]/15
        "
      />

      {/* Animated Icon Ring Container */}
      <span
        className="
          relative flex h-7 w-7 items-center justify-center rounded-full
          bg-slate-100 dark:bg-slate-800/90
          text-slate-700 dark:text-slate-200
          shadow-inner
          transition-transform duration-500 ease-spring
          group-hover:rotate-45 group-hover:scale-110
        "
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-[#ecca00] transition-colors" />
        ) : (
          <Moon className="h-4 w-4 text-[#ec0000] transition-colors" />
        )}
      </span>

      {/* Theme Label */}
      <span className="pr-1 font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#ec0000] dark:group-hover:text-[#ec5300] transition-colors">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}