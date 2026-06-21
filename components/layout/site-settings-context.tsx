"use client";

import { createContext, useContext } from "react";
import type { SiteSettingsContent } from "@/lib/types/site-settings-content";

const SiteSettingsContext = createContext<SiteSettingsContent | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettingsContent;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsContent {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error(
      "useSiteSettings must be used within a SiteSettingsProvider",
    );
  }
  return ctx;
}
