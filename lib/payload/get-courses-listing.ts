import config from "@payload-config";
import { getPayload } from "payload";
import type { NavChildLink } from "@/lib/types/site-settings-content";
import { mapCoursesListingFromCMS } from "./map-courses-listing";
import { coursesListingDefaults } from "@/payload/seed/courses-listing-defaults";

export async function getCoursesListingContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "courses-listing",
      depth: 0,
    });
    return mapCoursesListingFromCMS(global);
  } catch {
    return mapCoursesListingFromCMS(undefined);
  }
}

/** Courses dropdown from the listing CMS (programmes + nested tracks). */
export async function getCoursesNavChildren(): Promise<NavChildLink[]> {
  try {
    const content = await getCoursesListingContent();
    const children = content.programs.map((program) => {
      if (program.isNavGroup && program.navChildren.length > 0) {
        return {
          label: program.navLabel,
          href: program.href,
          isGroup: true,
          children: program.navChildren.map((child) => ({
            label: child.label,
            href: child.href,
          })),
        } satisfies NavChildLink;
      }
      return {
        label: program.navLabel,
        href: program.href,
      } satisfies NavChildLink;
    });
    if (children.length > 0) return children;
  } catch {
    // fall through
  }

  return coursesListingDefaults.programs
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
}
