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
import { coursesFaqSection } from "@/lib/constants/courses-content";

/**
 * Figma node 46:87 — top-to-bottom content stack.
 * Excludes off-canvas Journey block (46:153).
 */
export function CoursesPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 flex flex-col gap-24 pb-24 sm:gap-28 sm:pb-28 md:gap-32 lg:gap-[136px] lg:pb-[136px]">
        <AnimatedSection variant="fade-up">
          <CoursesIntroSection />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <OfferingsSection />
        </AnimatedSection>
        <AnimatedSection variant="slide-left" staggerChildren>
          <LearningApproachSection />
        </AnimatedSection>
        <AnimatedSection variant="scale-up" staggerChildren>
          <TrackComparisonSection />
        </AnimatedSection>
        <AnimatedSection variant="fade-in" staggerChildren>
          <TestimonialsSection
            eyebrow="Testimonials"
            mutedBackground={false}
            className="py-0"
          />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <FaqSection content={coursesFaqSection} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
