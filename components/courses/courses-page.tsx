import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/our-story/faq-section";
import { CoursesIntroSection } from "@/components/courses/courses-intro-section";
import { OfferingsSection } from "@/components/courses/offerings-section";
import { LearningApproachSection } from "@/components/courses/learning-approach-section";
import { TrackComparisonSection } from "@/components/courses/track-comparison-section";
import type { CoursesPageContent } from "@/lib/types/courses-page-content";

type CoursesPageProps = {
  content: CoursesPageContent;
};

/**
 * Figma node 46:87 — top-to-bottom content stack.
 * Excludes off-canvas Journey block (46:153).
 */
export function CoursesPage({ content }: CoursesPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 flex flex-col gap-12 pb-12 sm:gap-14 sm:pb-14 md:gap-16 lg:gap-[68px] lg:pb-[68px]">
        <AnimatedSection variant="fade-up">
          <CoursesIntroSection content={content.intro} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <OfferingsSection content={content.offerings} />
        </AnimatedSection>
        <AnimatedSection variant="slide-left" staggerChildren>
          <LearningApproachSection content={content.learningApproach} />
        </AnimatedSection>
        <AnimatedSection variant="scale-up" staggerChildren>
          <TrackComparisonSection content={content.trackComparison} />
        </AnimatedSection>
        <AnimatedSection variant="fade-in" staggerChildren>
          <TestimonialsSection
            eyebrow="Testimonials"
            mutedBackground={false}
            className="py-0"
          />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <FaqSection content={content.faq} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
