import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import {
  WORKSHOP_DURATION_LABEL,
  WORKSHOP_PRICING_LABEL,
  workshops,
} from "@/lib/constants/workshops";

export function WorkshopsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex flex-col gap-8 pb-12 sm:gap-10 sm:pb-14 lg:pb-16">
        <AnimatedSection variant="fade-up">
          <section className="relative mx-auto w-full max-w-7xl px-5 pt-10 sm:px-6 sm:pt-12 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy">
              Workshops
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Practical programmes for campuses and teams
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Careers, skills, placements, GST, and personal finance — delivered
              by practitioners. Duration and pricing are both{" "}
              {WORKSHOP_DURATION_LABEL.toLowerCase()} for your institution or
              batch.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" staggerChildren>
          <section className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {workshops.map((workshop) => (
                <li key={workshop.slug}>
                  <Link
                    href={`/workshops/${workshop.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-[#eaeaea] bg-white p-5 transition-colors hover:border-brand-navy/30 hover:bg-brand-lavender/20 sm:p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-navy">
                      {workshop.eyebrow}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                      {workshop.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                      {workshop.summary}
                    </p>
                    <div className="mt-4 space-y-1 border-t border-[#f0f0f0] pt-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                          Duration:
                        </span>{" "}
                        {WORKSHOP_DURATION_LABEL}
                        {workshop.durationBaseline ? (
                          <span className="text-gray-500">
                            {" "}
                            · sample {workshop.durationBaseline}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-sm font-semibold text-brand-navy">
                        Price: {WORKSHOP_PRICING_LABEL}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
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
