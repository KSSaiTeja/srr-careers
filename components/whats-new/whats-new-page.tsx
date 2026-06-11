import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { WhatsNewIntroHeader } from "@/components/whats-new/whats-new-intro-header";
import { NewsletterSection } from "@/components/whats-new/newsletter-section";

/**
 * Figma node 90:1781 — top-to-bottom content stack.
 * Excludes off-canvas Journey block (90:1800).
 */
export function WhatsNewPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex min-w-0 flex-col gap-24 pb-24 sm:gap-28 sm:pb-28 md:gap-32 lg:gap-[136px] lg:pb-[136px]">
        <AnimatedSection variant="fade-up">
          <WhatsNewIntroHeader />
        </AnimatedSection>
        <AnimatedSection variant="scale-up">
          <NewsletterSection />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
