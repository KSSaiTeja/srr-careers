import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MissionSection } from "@/components/home/mission-section";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { OurStoryIntroSection } from "./our-story-intro-section";
import { ValuesSection } from "./values-section";
import { ExcellenceSection } from "./excellence-section";
import { FaqSection } from "./faq-section";

/**
 * Figma node 31:119 — top-to-bottom content stack (Frame 46:47).
 * Excludes off-canvas "Journey of SRR Careers" (31:1040).
 */
export function OurStoryPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex flex-col gap-24 pb-24 sm:gap-28 sm:pb-28 md:gap-32 lg:gap-[136px] lg:pb-[136px]">
        <AnimatedSection variant="fade-up">
          <OurStoryIntroSection />
        </AnimatedSection>
        <AnimatedSection variant="scale-up" staggerChildren>
          <ValuesSection />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <MissionSection eyebrow="OUR MISSION" className="py-0" />
        </AnimatedSection>
        <AnimatedSection variant="slide-left" staggerChildren>
          <ExcellenceSection />
        </AnimatedSection>
        <AnimatedSection variant="fade-in" staggerChildren>
          <TestimonialsSection
            eyebrow="Testimonials"
            mutedBackground={false}
            className="py-0"
          />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <FaqSection />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
