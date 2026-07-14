import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { CoursesListingContent } from "@/lib/types/courses-listing-content";

type CoursesListingPageProps = {
  content: CoursesListingContent;
};

export function CoursesListingPage({ content }: CoursesListingPageProps) {
  const { intro, cards, programs } = content;

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex flex-col gap-8 pb-12 sm:gap-10 sm:pb-14 lg:pb-16">
        <AnimatedSection variant="fade-up">
          <section className="relative mx-auto w-full max-w-7xl px-5 pt-10 sm:px-6 sm:pt-12 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy">
              {intro.pageTitle}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {intro.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {intro.subtext}
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" staggerChildren>
          <section className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={program.href}
                    className="flex h-full flex-col rounded-2xl border border-[#eaeaea] bg-white p-5 transition-colors hover:border-brand-navy/30 hover:bg-brand-lavender/20 sm:p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-navy">
                      {program.eyebrow}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                      {program.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                      {program.summary}
                    </p>
                    {(program.durationLabel || program.priceLabel) && (
                      <div className="mt-4 space-y-1 border-t border-[#f0f0f0] pt-3">
                        {program.durationLabel ? (
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-gray-900">
                              {cards.durationPrefix}
                            </span>{" "}
                            {program.durationLabel}
                          </p>
                        ) : null}
                        {program.priceLabel ? (
                          <p className="text-sm font-semibold text-brand-navy">
                            {cards.pricePrefix} {program.priceLabel}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
