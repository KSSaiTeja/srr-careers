import type { Payload, RequiredDataFromCollectionSlug } from "payload";
import { blogPostsDefaults } from "./blog-posts-defaults";

export async function seedBlogPosts(payload: Payload): Promise<void> {
  try {
    const existing = await payload.find({
      collection: "blog-posts",
      limit: 0,
      depth: 0,
    });

    if (existing.totalDocs > 0) {
      return;
    }

    for (const doc of blogPostsDefaults) {
      await payload.create({
        collection: "blog-posts",
        data: doc as unknown as RequiredDataFromCollectionSlug<"blog-posts">,
      });
    }

    payload.logger.info(
      `Blog Posts seeded (${blogPostsDefaults.length} articles).`,
    );
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Blog Posts seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
