import { HeroUIProvider } from "@heroui/system";
import type { ReactNode } from "react";

// Minimal provider for Astro islands.
// We don't use react-router navigation inside islands for now.
export function HeroUIProviderIsland({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
