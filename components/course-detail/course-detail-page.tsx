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
import type { CheckoutProduct } from "@/lib/payment/types";

type CourseDetailPageProps = {
  course: CourseDetailContent;
};

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const product: CheckoutProduct = {
    slug: course.slug,
    name: course.intro.pageTitle || course.meta.title,
    amount: course.overview.price,
    currency: "INR",
    originalAmount: course.overview.originalPrice,
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 flex flex-col gap-12 pb-12 sm:gap-14 sm:pb-14 md:gap-16 lg:gap-[68px] lg:pb-[68px]">
        <AnimatedSection variant="fade-up">
          <div className="relative flex flex-col gap-6 sm:gap-8 md:gap-10">
            <CourseDetailIntroSection content={course.intro} />
            <div className="relative z-10 bg-gradient-to-b from-transparent via-white/80 to-white pt-2 sm:pt-4">
              <CourseDetailOverviewSection
                content={course.overview}
                product={product}
              />
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
          <CourseDetailLimitedSeatsSection
            content={course.limitedSeatsCta}
            product={product}
          />
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
