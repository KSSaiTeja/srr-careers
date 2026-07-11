import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { WhatsNewIntroHeader } from "@/components/whats-new/whats-new-intro-header";
import { NewsletterSection } from "@/components/whats-new/newsletter-section";
import type { WhatsNewPageContent } from "@/lib/types/whats-new-page-content";

type WhatsNewPageProps = {
  content: WhatsNewPageContent;
};

/**
 * Figma node 90:1781 — top-to-bottom content stack.
 * Excludes off-canvas Journey block (90:1800).
 */
export function WhatsNewPage({ content }: WhatsNewPageProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex min-w-0 flex-col gap-12 pb-12 sm:gap-14 sm:pb-14 md:gap-16 lg:gap-[68px] lg:pb-[68px]">
        <AnimatedSection variant="fade-up">
          <WhatsNewIntroHeader
            pageTitle={content.pageTitle}
            updates={content.updates}
          />
        </AnimatedSection>
        <AnimatedSection variant="scale-up">
          <NewsletterSection content={content.newsletter} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
