import type { NavChildLink } from "@/lib/types/site-settings-content";
import { workshopsPageDefaults } from "@/payload/seed/workshops-page-defaults";

/**
 * Fallback Workshops dropdown when CMS listing cards are unavailable.
 * Live nav prefers `getWorkshopNavChildren()` from the Workshops Listing global.
 */
export const workshopsNavChildren: NavChildLink[] = workshopsPageDefaults.workshops
  .filter((entry) => entry.published)
  .map((entry) => ({
    label: entry.navLabel,
    href: entry.href,
  }));
