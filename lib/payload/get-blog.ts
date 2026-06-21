import config from "@payload-config";
import { getPayload } from "payload";
import type { BlogPageContent, BlogPost, BlogPostSummary } from "@/lib/types/blog";
import { blogPageDefaults } from "@/payload/seed/blog-page-defaults";
import { blogPostsDefaults } from "@/payload/seed/blog-posts-defaults";
import {
  type BlogPostInput,
  mapBlogPageFromCMS,
  mapBlogPost,
  mapBlogSummary,
} from "./map-blog";

function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function defaultSummaries(): BlogPostSummary[] {
  return sortByDateDesc(
    blogPostsDefaults.map((doc) =>
      mapBlogSummary(doc as unknown as BlogPostInput),
    ),
  );
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "blog-posts",
      limit: 200,
      depth: 1,
      pagination: false,
      sort: "-content.publishedDate",
    });

    if (result.docs.length > 0) {
      return sortByDateDesc(result.docs.map((doc) => mapBlogSummary(doc)));
    }
  } catch {
    // fall through to defaults
  }

  return defaultSummaries();
}

function defaultBySlug(slug: string): BlogPost | undefined {
  const doc = blogPostsDefaults.find((entry) => entry.slug === slug);
  return doc ? mapBlogPost(doc as unknown as BlogPostInput) : undefined;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    const doc = result.docs[0];
    if (doc) {
      return mapBlogPost(doc);
    }

    return defaultBySlug(slug);
  } catch {
    return defaultBySlug(slug);
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "blog-posts",
      limit: 200,
      depth: 0,
      pagination: false,
    });

    const slugs = result.docs
      .map((doc) => doc.slug)
      .filter((slug): slug is string => Boolean(slug));

    if (slugs.length > 0) {
      return slugs;
    }
  } catch {
    // fall through to defaults
  }

  return blogPostsDefaults.map((doc) => doc.slug);
}

export async function getBlogPageContent(): Promise<BlogPageContent> {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({ slug: "blog-page", depth: 0 });
    return mapBlogPageFromCMS(global);
  } catch {
    return mapBlogPageFromCMS(undefined);
  }
}

export { blogPageDefaults };
