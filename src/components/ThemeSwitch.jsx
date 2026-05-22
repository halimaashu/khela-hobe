"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        group relative inline-flex items-center gap-2 overflow-hidden
        rounded-full border border-zinc-300 dark:border-zinc-700
        bg-white/80 dark:bg-zinc-900/80
        
        text-sm font-medium
        text-zinc-800 dark:text-zinc-100
        shadow-lg backdrop-blur-md
        transition-all duration-300
        hover:scale-105 hover:shadow-xl
        active:scale-95
      "
    >
      {/* Animated Background Glow */}
      <span
        className="
          absolute inset-0 -z-10 opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          bg-gradient-to-r from-yellow-300/20 via-orange-300/20 to-pink-300/20
          dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20
        "
      />

      {/* Icon */}
      <span
        className="
          flex h-8 w-8 items-center justify-center rounded-full
          bg-zinc-100 dark:bg-zinc-800
          transition-transform duration-500
          group-hover:rotate-12
        "
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-yellow-400" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-500" />
        )}
      </span>

      {/* Text */}
      <span className="tracking-wide">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
