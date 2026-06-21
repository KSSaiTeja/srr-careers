import type { Payload } from "payload";
import { siteSettingsDefaults } from "./site-settings-defaults";

export async function seedSiteSettings(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "site-settings",
      depth: 0,
    });

    // `findGlobal` returns field defaultValues even with no saved row, so detect
    // a real row via `updatedAt` (only set once the global has been persisted).
    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "site-settings",
      data: siteSettingsDefaults as Record<string, unknown>,
    });

    payload.logger.info("Site Settings seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Site Settings seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
