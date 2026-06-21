export type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string | null; caption: string };

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  dateLabel: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string | null;
  featured: boolean;
};

export type BlogPost = BlogPostSummary & {
  metaTitle: string;
  metaDescription: string;
  tableOfContents: string[];
  body: BlogBodyBlock[];
};

export type BlogPageContent = {
  intro: {
    pageTitle: string;
    headline: string;
    headlineHighlight: string;
    subtext: string;
  };
  sidebar: {
    searchPlaceholder: string;
    categoryTitle: string;
    recentTitle: string;
    tagsTitle: string;
    popularTags: string[];
  };
};
