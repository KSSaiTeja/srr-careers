import type { NavChildLink } from "@/lib/types/site-settings-content";
import { workshopDetailsDefaults } from "@/payload/seed/workshop-details-defaults";

/**
 * Fallback Workshops dropdown when CMS workshop-details are unavailable.
 * Live nav prefers `getWorkshopNavChildren()` from the CMS.
 */
export const workshopsNavChildren: NavChildLink[] = workshopDetailsDefaults
  .filter((entry) => entry.published)
  .map((entry) => ({
    label: entry.navLabel,
    href: `/workshops/${entry.slug}`,
  }));
