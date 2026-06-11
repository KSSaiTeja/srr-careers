import type { Payload } from "payload";
import { homePageDefaults } from "./home-page-defaults";

export async function seedHomePage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "home-page",
      depth: 0,
    });

    if (existing?.hero?.titleLine1) {
      return;
    }

    await payload.updateGlobal({
      slug: "home-page",
      data: homePageDefaults as Record<string, unknown>,
    });

    payload.logger.info("Home Page content seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Home Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
