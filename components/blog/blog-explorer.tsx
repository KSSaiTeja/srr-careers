"use client";

import { useMemo, useState } from "react";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import type { BlogPageContent, BlogPostSummary } from "@/lib/types/blog";

type BlogExplorerProps = {
  posts: BlogPostSummary[];
  sidebar: BlogPageContent["sidebar"];
};

const PAGE_SIZE = 6;

export function BlogExplorer({ posts, sidebar }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return Array.from(counts, ([name, count]) => ({ name, count })).sort(
      (a, b) => a.name.localeCompare(b.name),
    );
  }, [posts]);

  const recentPosts = useMemo(() => posts.slice(0, 4), [posts]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (activeTag && !post.tags.includes(activeTag)) return false;
      if (normalizedQuery) {
        const haystack =
          `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [posts, query, activeCategory, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function resetPageThen(action: () => void) {
    action();
    setPage(1);
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
      <div className="min-w-0">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {visible.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/60 p-12 text-center">
            <p className="text-lg font-semibold text-gray-900">
              No articles found
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Try a different search term or clear the filters.
            </p>
          </div>
        )}

        <BlogPagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <BlogSidebar
        content={sidebar}
        categories={categories}
        recentPosts={recentPosts}
        query={query}
        activeCategory={activeCategory}
        activeTag={activeTag}
        onQueryChange={(value) => resetPageThen(() => setQuery(value))}
        onCategoryChange={(value) =>
          resetPageThen(() => setActiveCategory(value))
        }
        onTagChange={(value) => resetPageThen(() => setActiveTag(value))}
      />
    </div>
  );
}
