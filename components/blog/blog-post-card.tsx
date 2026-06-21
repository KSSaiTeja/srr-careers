import Link from "next/link";
import type { BlogPostSummary } from "@/lib/types/blog";
import { blogAccent } from "@/lib/utils/blog-accent";
import { cn } from "@/lib/utils/cn";

type BlogPostCardProps = {
  post: BlogPostSummary;
  className?: string;
};

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <article
      data-reveal-item
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <Link
        href={href}
        aria-label={post.title}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        {post.coverImage ? (
          <span
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${post.coverImage})` }}
            aria-hidden
          />
        ) : (
          <span
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
              blogAccent(post.slug),
            )}
            aria-hidden
          />
        )}
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-brand-navy backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="mb-3 text-sm text-gray-500">
          By <span className="font-semibold text-brand-navy">{post.author}</span>
        </p>
        <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
          <Link href={href} className="transition-colors hover:text-brand-navy">
            {post.title}
          </Link>
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 text-xs font-medium text-gray-500">
          <span>{post.dateLabel}</span>
          <span className="size-1 rounded-full bg-gray-300" aria-hidden />
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}
