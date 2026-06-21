import type { Payload } from "payload";
import { whatsNewPageDefaults } from "./whats-new-page-defaults";

export async function seedWhatsNewPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "whats-new-page",
      depth: 0,
    });

    // `findGlobal` returns field defaultValues even with no saved row, so detect
    // a real row via `updatedAt` (only set once the global has been persisted).
    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "whats-new-page",
      data: whatsNewPageDefaults as Record<string, unknown>,
    });

    payload.logger.info("What's New Page content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "What's New Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
