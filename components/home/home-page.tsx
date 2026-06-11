import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CurriculumSection } from "@/components/home/curriculum-section";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { HeroSection } from "@/components/home/hero-section";
import { InstructorSection } from "@/components/home/instructor-section";
import { MissionSection } from "@/components/home/mission-section";
import { ProblemSection } from "@/components/home/problem-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import type { HomePageContent } from "@/lib/types/home-page-content";

type HomePageProps = {
  content: HomePageContent;
};

export function HomePage({ content }: HomePageProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main>
        <HeroSection content={content.hero} />
        <AnimatedSection variant="fade-up" staggerChildren>
          <ProblemSection content={content.problem} />
        </AnimatedSection>
        <AnimatedSection variant="scale-up">
          <MissionSection content={content.mission} />
        </AnimatedSection>
        <AnimatedSection variant="slide-right">
          <InstructorSection content={content.instructor} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <CurriculumSection content={content.curriculum} />
        </AnimatedSection>
        <AnimatedSection variant="fade-in" staggerChildren>
          <TestimonialsSection content={content.testimonials} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection content={content.preFooter} />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
