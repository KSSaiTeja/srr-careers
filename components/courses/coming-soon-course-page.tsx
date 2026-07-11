import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";

type ComingSoonCoursePageProps = {
  title: string;
  eyebrow: string;
  description: string;
};

export function ComingSoonCoursePage({
  title,
  eyebrow,
  description,
}: ComingSoonCoursePageProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex flex-col gap-8 pb-12 sm:gap-10 sm:pb-14 lg:pb-16">
        <AnimatedSection variant="fade-up">
          <section className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-5 pt-16 sm:px-6 sm:pt-20 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <p className="rounded-full bg-brand-gold/30 px-4 py-1.5 text-sm font-semibold text-brand-gold-dark-text">
              Coming soon
            </p>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy">
                {eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-dark sm:text-base"
              >
                Browse current courses
              </Link>
              <Link
                href="#demo-class"
                className="inline-flex rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-gold-dark sm:text-base"
              >
                Book a Free Demo
              </Link>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection variant="fade-up">
          <PreFooterSection />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
