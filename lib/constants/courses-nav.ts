import type { NavChildLink } from "@/lib/types/site-settings-content";
import { coursesListingDefaults } from "@/payload/seed/courses-listing-defaults";

/**
 * Fallback Courses dropdown when the Courses Listing CMS is unavailable.
 * Live nav prefers `getCoursesNavChildren()` from the listing global.
 *
 * SAP FICO is a clickable parent (/courses/sap-fico) with nested tracks;
 * Advanced Excel links straight to its detail page.
 */
export const coursesNavChildren: NavChildLink[] =
  coursesListingDefaults.programs
    .filter((p) => p.published)
    .map((program) => {
      if (program.isNavGroup && program.navChildren.length > 0) {
        return {
          label: program.navLabel,
          href: program.href,
          isGroup: true,
          children: program.navChildren.map((child) => ({ ...child })),
        };
      }
      return {
        label: program.navLabel,
        href: program.href,
      };
    });
