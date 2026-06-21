import type { Payload, RequiredDataFromCollectionSlug } from "payload";
import { courseDetailsDefaults } from "./course-details-defaults";

export async function seedCourseDetails(payload: Payload): Promise<void> {
  try {
    for (const doc of courseDetailsDefaults) {
      const existing = await payload.find({
        collection: "course-details",
        where: { slug: { equals: doc.slug } },
        limit: 1,
        depth: 0,
      });

      if (existing.totalDocs > 0) {
        continue;
      }

      await payload.create({
        collection: "course-details",
        data: doc as unknown as RequiredDataFromCollectionSlug<"course-details">,
      });

      payload.logger.info(`Course detail seeded: ${doc.slug}`);
    }
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Course Details seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
