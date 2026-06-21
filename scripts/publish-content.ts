import config from "@payload-config";
import { getPayload } from "payload";
import type { RequiredDataFromCollectionSlug } from "payload";
import { courseDetailsDefaults } from "@/payload/seed/course-details-defaults";
import { coursesPageDefaults } from "@/payload/seed/courses-page-defaults";
import { homePageDefaults } from "@/payload/seed/home-page-defaults";
import { ourStoryPageDefaults } from "@/payload/seed/our-story-page-defaults";
import { siteSettingsDefaults } from "@/payload/seed/site-settings-defaults";

/**
 * Force-publishes curated default content to the DB, overwriting stale rows.
 * Use after editing the *-defaults.ts files. Run with:
 *   npx payload run scripts/publish-content.ts
 */
const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "home-page",
  data: homePageDefaults as unknown as Record<string, unknown>,
});
payload.logger.info("Published home-page.");

await payload.updateGlobal({
  slug: "courses-page",
  data: coursesPageDefaults as unknown as Record<string, unknown>,
});
payload.logger.info("Published courses-page.");

await payload.updateGlobal({
  slug: "site-settings",
  data: siteSettingsDefaults as unknown as Record<string, unknown>,
});
payload.logger.info("Published site-settings.");

await payload.updateGlobal({
  slug: "our-story-page",
  data: ourStoryPageDefaults as unknown as Record<string, unknown>,
});
payload.logger.info("Published our-story-page.");

for (const doc of courseDetailsDefaults) {
  const existing = await payload.find({
    collection: "course-details",
    where: { slug: { equals: doc.slug } },
    limit: 1,
    depth: 0,
  });
  if (existing.totalDocs > 0) {
    await payload.update({
      collection: "course-details",
      id: existing.docs[0].id,
      data: doc as unknown as RequiredDataFromCollectionSlug<"course-details">,
    });
    payload.logger.info(`Published course-detail: ${doc.slug}`);
  }
}

payload.logger.info("Content publish complete.");
process.exit(0);
