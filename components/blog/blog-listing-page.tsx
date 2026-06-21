import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { BlogHero } from "@/components/blog/blog-hero";
import { Container } from "@/components/ui/container";
import type { BlogPageContent, BlogPostSummary } from "@/lib/types/blog";

type BlogListingPageProps = {
  content: BlogPageContent;
  posts: BlogPostSummary[];
};

export function BlogListingPage({ content, posts }: BlogListingPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 flex flex-col gap-20 pb-24 sm:gap-24 sm:pb-28 lg:gap-28 lg:pb-[136px]">
        <BlogHero
          eyebrow={content.intro.pageTitle}
          title={content.intro.headline}
          highlight={content.intro.headlineHighlight}
          subtext={content.intro.subtext}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />

        <AnimatedSection variant="fade-up" staggerChildren>
          <Container>
            <BlogExplorer posts={posts} sidebar={content.sidebar} />
          </Container>
        </AnimatedSection>

        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
