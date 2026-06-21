import type {
  BlogBodyBlock,
  BlogPageContent,
  BlogPost,
  BlogPostSummary,
} from "@/lib/types/blog";
import type { BlogPost as CMSBlogPost, BlogPage as CMSBlogPage } from "@/payload-types";
import { blogPageDefaults } from "@/payload/seed/blog-page-defaults";
import { getMediaUrl } from "./media-url";

function splitLines(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function formatDateLabel(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  return `${day} ${month}, ${date.getUTCFullYear()}`;
}

type CMSArticle = NonNullable<CMSBlogPost["article"]>;

export type BlogPostInput = {
  slug?: string | null;
  meta?: Partial<CMSBlogPost["meta"]> | null;
  content?: Partial<CMSBlogPost["content"]> | null;
  article?: {
    tableOfContents?: string | null;
    body?: CMSArticle["body"];
  } | null;
};

type ContentInput = NonNullable<BlogPostInput["content"]>;
type MetaInput = NonNullable<BlogPostInput["meta"]>;
type ArticleInput = NonNullable<BlogPostInput["article"]>;

export function mapBlogSummary(doc: BlogPostInput): BlogPostSummary {
  const content: ContentInput = doc.content ?? {};
  const date = content.publishedDate ?? null;
  const coverUrl = content.coverImage ? getMediaUrl(content.coverImage, "") : "";

  return {
    slug: text(doc.slug),
    title: text(content.title),
    excerpt: text(content.excerpt),
    author: text(content.author, "SRR Careers"),
    authorRole: text(content.authorRole),
    date: date ?? "",
    dateLabel: formatDateLabel(date),
    readTime: text(content.readTime, "5 min read"),
    category: text(content.category, "SAP FICO"),
    tags: splitLines(content.tags),
    coverImage: coverUrl.length > 0 ? coverUrl : null,
    featured: Boolean(content.featured),
  };
}

function mapBody(
  body: CMSArticle["body"] | null | undefined,
): BlogBodyBlock[] {
  if (!body) return [];

  return body.map((block): BlogBodyBlock => {
    switch (block.blockType) {
      case "heading":
        return { type: "heading", text: text(block.text) };
      case "quote":
        return { type: "quote", text: text(block.text) };
      case "list":
        return { type: "list", items: splitLines(block.items) };
      case "image":
        return {
          type: "image",
          url: block.image ? getMediaUrl(block.image, "") || null : null,
          caption: text(block.caption),
        };
      case "paragraph":
      default:
        return { type: "paragraph", text: text(block.text) };
    }
  });
}

export function mapBlogPost(doc: BlogPostInput): BlogPost {
  const summary = mapBlogSummary(doc);
  const meta: MetaInput = doc.meta ?? {};
  const article: ArticleInput = doc.article ?? {};

  return {
    ...summary,
    metaTitle: text(meta.title, summary.title),
    metaDescription: text(meta.description, summary.excerpt),
    tableOfContents: splitLines(article.tableOfContents),
    body: mapBody(article.body),
  };
}

export function mapBlogPageFromCMS(
  global: CMSBlogPage | null | undefined,
): BlogPageContent {
  const d = blogPageDefaults;
  const intro = global?.intro;
  const sidebar = global?.sidebar;

  const cmsTags = splitLines(sidebar?.popularTags);

  return {
    intro: {
      pageTitle: text(intro?.pageTitle, d.intro.pageTitle),
      headline: text(intro?.headline, d.intro.headline),
      headlineHighlight: text(
        intro?.headlineHighlight,
        d.intro.headlineHighlight,
      ),
      subtext: text(intro?.subtext, d.intro.subtext),
    },
    sidebar: {
      searchPlaceholder: text(
        sidebar?.searchPlaceholder,
        d.sidebar.searchPlaceholder,
      ),
      categoryTitle: text(sidebar?.categoryTitle, d.sidebar.categoryTitle),
      recentTitle: text(sidebar?.recentTitle, d.sidebar.recentTitle),
      tagsTitle: text(sidebar?.tagsTitle, d.sidebar.tagsTitle),
      popularTags:
        cmsTags.length > 0 ? cmsTags : [...d.sidebar.popularTags],
    },
  };
}
