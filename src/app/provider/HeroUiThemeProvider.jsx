"use client";

import { ThemeProvider } from "next-themes";

const HeroUiThemeProvider = ({ children }) => {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </div>
  );
};

export default HeroUiThemeProvider;
