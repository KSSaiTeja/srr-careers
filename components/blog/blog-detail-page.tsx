import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { BlogArticle } from "@/components/blog/blog-article";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { Container } from "@/components/ui/container";
import type { BlogPost, BlogPostSummary } from "@/lib/types/blog";

type BlogDetailPageProps = {
  post: BlogPost;
  related: BlogPostSummary[];
};

export function BlogDetailPage({ post, related }: BlogDetailPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 pb-12 sm:pb-14 lg:pb-[68px]">
        <Container className="pt-10 sm:pt-12">
          <nav
            className="flex items-center gap-2 text-sm font-medium text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-brand-navy">
              Home
            </Link>
            <span className="text-gray-300" aria-hidden>
              //
            </span>
            <Link
              href="/blog"
              className="transition-colors hover:text-brand-navy"
            >
              Blog
            </Link>
            <span className="text-gray-300" aria-hidden>
              //
            </span>
            <span className="truncate text-brand-navy">{post.category}</span>
          </nav>
        </Container>

        <AnimatedSection variant="fade-up" className="mt-8 sm:mt-10">
          <BlogArticle post={post} />
        </AnimatedSection>

        <AnimatedSection
          variant="fade-up"
          staggerChildren
          className="mt-16 sm:mt-20"
        >
          <BlogRelatedPosts posts={related} />
        </AnimatedSection>

        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
