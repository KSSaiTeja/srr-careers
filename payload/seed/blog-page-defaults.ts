/**
 * Default content for the Blog listing page global (/blog). Mirrors the
 * BlogPage global's named tabs. Seeds on first run and acts as the frontend
 * fallback. Categories and recent posts are derived from the posts themselves.
 */
export const blogPageDefaults = {
  intro: {
    pageTitle: "From the SRR Careers desk",
    headline: "Insights to fast-track your",
    headlineHighlight: "SAP FICO career",
    subtext:
      "Practical guides, real client scenarios, and career advice from trainers who place consultants in live S/4HANA projects.",
  },
  sidebar: {
    searchPlaceholder: "Search articles",
    categoryTitle: "Categories",
    recentTitle: "Recent Posts",
    tagsTitle: "Popular Tags",
    popularTags: [
      "SAP FICO",
      "S/4HANA",
      "Careers",
      "Interviews",
      "Configuration",
      "Asset Accounting",
      "GST & TDS",
      "End User",
    ],
  },
} as const;

export type BlogPageDefaults = typeof blogPageDefaults;
