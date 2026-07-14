import type { Payload } from "payload";
import { workshopsPageDefaults } from "./workshops-page-defaults";

export async function seedWorkshopsPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "workshops-page",
      depth: 0,
    });

    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "workshops-page",
      data: workshopsPageDefaults as Record<string, unknown>,
    });

    payload.logger.info("Workshops Page content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Workshops Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
