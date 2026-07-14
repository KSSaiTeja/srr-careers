import type { Payload } from "payload";
import { ourTeamPageDefaults } from "./our-team-page-defaults";

export async function seedOurTeamPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "our-team-page",
      depth: 0,
    });

    // `findGlobal` returns field defaultValues even with no saved row, so detect
    // a real row via `updatedAt` (only set once the global has been persisted).
    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "our-team-page",
      data: ourTeamPageDefaults as Record<string, unknown>,
    });

    payload.logger.info("Our Team Page content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Our Team Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
