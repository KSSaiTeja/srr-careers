import type { Payload } from "payload";
import { ourStoryPageDefaults } from "./our-story-page-defaults";

export async function seedOurStoryPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "our-story-page",
      depth: 0,
    });

    // `findGlobal` returns field defaultValues even with no saved row, so detect
    // a real row via `updatedAt` (only set once the global has been persisted).
    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "our-story-page",
      data: ourStoryPageDefaults as Record<string, unknown>,
    });

    payload.logger.info("Our Story Page content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Our Story Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
