import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/our-story/faq-section";
import { CourseDetailIntroSection } from "@/components/course-detail/course-detail-intro-section";
import { CourseDetailOverviewSection } from "@/components/course-detail/course-detail-overview-section";
import { CourseDetailWhoSection } from "@/components/course-detail/course-detail-who-section";
import { CourseDetailSyllabusSection } from "@/components/course-detail/course-detail-syllabus-section";
import { CourseDetailAlsoOfferedSection } from "@/components/course-detail/course-detail-also-offered-section";
import { CourseDetailLimitedSeatsSection } from "@/components/course-detail/course-detail-limited-seats-section";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";

type CourseDetailPageProps = {
  course: CourseDetailContent;
};

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 flex flex-col gap-24 pb-24 sm:gap-28 sm:pb-28 md:gap-32 lg:gap-[136px] lg:pb-[136px]">
        <AnimatedSection variant="fade-up">
          <div className="relative flex flex-col gap-12 sm:gap-16 md:gap-20">
            <CourseDetailIntroSection content={course.intro} />
            <div className="relative z-10 bg-gradient-to-b from-transparent via-white/80 to-white pt-2 sm:pt-4">
              <CourseDetailOverviewSection content={course.overview} />
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection variant="slide-right" staggerChildren>
          <CourseDetailWhoSection content={course.whoIsItFor} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <CourseDetailSyllabusSection content={course.syllabus} />
        </AnimatedSection>
        <AnimatedSection variant="scale-up" staggerChildren>
          <CourseDetailAlsoOfferedSection content={course.alsoOffered} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <CourseDetailLimitedSeatsSection content={course.limitedSeatsCta} />
        </AnimatedSection>
        <AnimatedSection variant="fade-in" staggerChildren>
          <TestimonialsSection
            eyebrow="Testimonials"
            mutedBackground={false}
            className="py-0"
          />
        </AnimatedSection>
        <AnimatedSection variant="fade-up" staggerChildren>
          <FaqSection content={course.faq} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <PreFooterSection className="py-0" />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
