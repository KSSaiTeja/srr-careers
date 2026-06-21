import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BlogBody } from "@/components/blog/blog-body";
import { BlogShareLinks } from "@/components/blog/blog-share-links";
import type { BlogPost } from "@/lib/types/blog";
import { blogAccent } from "@/lib/utils/blog-accent";
import { cn } from "@/lib/utils/cn";

type BlogArticleProps = {
  post: BlogPost;
};

export function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article>
      <Container className="max-w-4xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
          <span>
            By{" "}
            <span className="font-semibold text-brand-navy">{post.author}</span>
          </span>
          <span className="size-1 rounded-full bg-gray-300" aria-hidden />
          <span>{post.dateLabel}</span>
          <span className="size-1 rounded-full bg-gray-300" aria-hidden />
          <span>{post.readTime}</span>
        </div>

        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-[1.2] text-gray-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {post.tags.length > 0 ? (
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-brand-navy/40 hover:text-brand-navy"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>

      <Container className="mt-10 max-w-5xl sm:mt-12">
        {post.coverImage ? (
          <div
            className="aspect-[16/8] w-full overflow-hidden rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
        ) : (
          <div
            className={cn(
              "aspect-[16/8] w-full rounded-3xl bg-gradient-to-br",
              blogAccent(post.slug),
            )}
          />
        )}
      </Container>

      <Container className="mt-10 max-w-3xl sm:mt-12">
        <p className="mb-8 text-xl font-semibold leading-relaxed text-gray-900 sm:text-2xl">
          {post.excerpt}
        </p>

        {post.tableOfContents.length > 0 ? (
          <div className="mb-8 rounded-3xl border border-gray-200/70 bg-brand-lavender/30 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Table of contents
            </h2>
            <ul className="flex flex-col gap-2.5">
              {post.tableOfContents.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <ChevronRight
                    className="mt-0.5 size-5 shrink-0 text-brand-navy"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-base text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <BlogBody blocks={post.body} />

        <div className="mt-12 border-t border-gray-200 pt-8">
          <BlogShareLinks title={post.title} />
        </div>
      </Container>
    </article>
  );
}
