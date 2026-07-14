import type { Payload, RequiredDataFromCollectionSlug } from "payload";
import { workshopDetailsDefaults } from "./workshop-details-defaults";

export async function seedWorkshopDetails(payload: Payload): Promise<void> {
  try {
    for (const doc of workshopDetailsDefaults) {
      const existing = await payload.find({
        collection: "workshop-details",
        where: { slug: { equals: doc.slug } },
        limit: 1,
        depth: 0,
      });

      if (existing.totalDocs > 0) {
        continue;
      }

      await payload.create({
        collection: "workshop-details",
        data: doc as unknown as RequiredDataFromCollectionSlug<"workshop-details">,
      });

      payload.logger.info(`Workshop detail seeded: ${doc.slug}`);
    }
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Workshop Details seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
