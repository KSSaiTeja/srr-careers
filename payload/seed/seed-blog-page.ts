import type { Payload } from "payload";
import { blogPageDefaults } from "./blog-page-defaults";

export async function seedBlogPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({ slug: "blog-page", depth: 0 });
    if (existing?.updatedAt) {
      return;
    }

    await payload.updateGlobal({
      slug: "blog-page",
      data: {
        intro: { ...blogPageDefaults.intro },
        sidebar: {
          ...blogPageDefaults.sidebar,
          popularTags: blogPageDefaults.sidebar.popularTags.join("\n"),
        },
      } as Record<string, unknown>,
    });

    payload.logger.info("Blog Page seeded with default copy.");
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Blog Page seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
