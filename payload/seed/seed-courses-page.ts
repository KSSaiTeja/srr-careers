import type { Payload } from "payload";
import { coursesPageDefaults } from "./courses-page-defaults";

export async function seedCoursesPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "courses-page",
      depth: 0,
    });

    // `findGlobal` returns field defaultValues even with no saved row, so detect
    // a real row via `updatedAt` (only set once the global has been persisted).
    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "courses-page",
      data: coursesPageDefaults as Record<string, unknown>,
    });

    payload.logger.info("Courses Page content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Courses Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
