import type { Payload } from "payload";
import { coursesListingDefaults } from "./courses-listing-defaults";

export async function seedCoursesListing(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "courses-listing",
      depth: 0,
    });

    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "courses-listing",
      data: {
        meta: coursesListingDefaults.meta,
        intro: coursesListingDefaults.intro,
        cards: coursesListingDefaults.cards,
        programs: coursesListingDefaults.programs,
      } as Record<string, unknown>,
    });

    payload.logger.info("Courses Listing content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Courses Listing seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
