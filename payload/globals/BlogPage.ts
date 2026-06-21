import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const BlogPage: GlobalConfig = {
  slug: "blog-page",
  label: "Blog Page",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The /blog listing page header and sidebar labels. Posts, categories, and recent items come from the Blog Posts collection.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Intro",
          name: "intro",
          fields: [
            { name: "pageTitle", type: "text", required: true },
            { name: "headline", type: "text", required: true },
            { name: "headlineHighlight", type: "text", required: true },
            { name: "subtext", type: "textarea" },
          ],
        },
        {
          label: "Sidebar",
          name: "sidebar",
          fields: [
            {
              name: "searchPlaceholder",
              type: "text",
              defaultValue: "Search articles",
            },
            {
              name: "categoryTitle",
              type: "text",
              defaultValue: "Categories",
            },
            { name: "recentTitle", type: "text", defaultValue: "Recent Posts" },
            { name: "tagsTitle", type: "text", defaultValue: "Popular Tags" },
            {
              name: "popularTags",
              type: "textarea",
              label: "Popular tags (one per line)",
            },
          ],
        },
      ],
    },
  ],
};
