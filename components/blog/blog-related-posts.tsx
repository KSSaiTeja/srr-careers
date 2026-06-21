import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Container } from "@/components/ui/container";
import type { BlogPostSummary } from "@/lib/types/blog";

type BlogRelatedPostsProps = {
  posts: BlogPostSummary[];
};

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-brand-lavender/30 py-16 sm:py-20 lg:py-24">
      <Container>
        <h2 className="mb-10 text-3xl font-semibold text-gray-900 sm:mb-12 sm:text-4xl">
          You may also like
        </h2>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
