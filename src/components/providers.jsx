// app/providers.jsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}