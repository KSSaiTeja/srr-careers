import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { BlogPageContent, BlogPostSummary } from "@/lib/types/blog";
import { cn } from "@/lib/utils/cn";

type CategoryCount = { name: string; count: number };

type BlogSidebarProps = {
  content: BlogPageContent["sidebar"];
  categories: CategoryCount[];
  recentPosts: BlogPostSummary[];
  query: string;
  activeCategory: string | null;
  activeTag: string | null;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onTagChange: (value: string | null) => void;
};

const widgetTitleClass =
  "mb-5 text-lg font-bold tracking-tight text-gray-900";

export function BlogSidebar({
  content,
  categories,
  recentPosts,
  query,
  activeCategory,
  activeTag,
  onQueryChange,
  onCategoryChange,
  onTagChange,
}: BlogSidebarProps) {
  return (
    <aside className="flex flex-col gap-8">
      <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={content.searchPlaceholder}
            aria-label={content.searchPlaceholder}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-4 pr-12 text-base text-gray-900 transition-colors placeholder:text-gray-400 focus-visible:border-brand-navy/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/10"
          />
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path
                d="m20 20-3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <h3 className={widgetTitleClass}>{content.categoryTitle}</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  activeCategory === null
                    ? "bg-brand-lavender/60 font-semibold text-brand-navy"
                    : "text-gray-600 hover:bg-brand-lavender/40 hover:text-brand-navy",
                )}
              >
                All Posts
              </button>
            </li>
            {categories.map((category) => {
              const active = activeCategory === category.name;
              return (
                <li key={category.name}>
                  <button
                    type="button"
                    onClick={() =>
                      onCategoryChange(active ? null : category.name)
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      active
                        ? "bg-brand-lavender/60 font-semibold text-brand-navy"
                        : "text-gray-600 hover:bg-brand-lavender/40 hover:text-brand-navy",
                    )}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-400">
                      ({String(category.count).padStart(2, "0")})
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {recentPosts.length > 0 && (
        <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <h3 className={widgetTitleClass}>{content.recentTitle}</h3>
          <ul className="flex flex-col gap-5">
            {recentPosts.map((post) => (
              <li key={post.slug} className="flex items-start gap-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="size-16 shrink-0 overflow-hidden rounded-xl"
                  aria-hidden
                  tabIndex={-1}
                >
                  {post.coverImage ? (
                    <span
                      className="block size-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    />
                  ) : (
                    <span className="block size-full bg-gradient-to-br from-brand-navy to-brand-purple" />
                  )}
                </Link>
                <div className="min-w-0">
                  <h4 className="mb-1 text-sm font-semibold leading-snug text-gray-900">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="line-clamp-2 transition-colors hover:text-brand-navy"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icon name="clock" className="size-3.5" strokeWidth={2} />
                    {post.dateLabel}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.popularTags.length > 0 && (
        <div className="rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <h3 className={widgetTitleClass}>{content.tagsTitle}</h3>
          <div className="flex flex-wrap gap-2.5">
            {content.popularTags.map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagChange(active ? null : tag)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-brand-navy bg-brand-navy text-white"
                      : "border-gray-200 text-gray-600 hover:border-brand-navy/40 hover:text-brand-navy",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
