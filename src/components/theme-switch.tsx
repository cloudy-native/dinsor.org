import { FC, useState, useEffect } from "react";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  // Safe theme initialization - works in SSR + client
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");

    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // During SSR or before mount, render a stable placeholder to avoid hydration mismatch
  if (!isMounted) {
    return <div className={clsx("w-6 h-6", className)} aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer text-default-500",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </button>
  );
};

