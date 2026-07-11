import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JoinOurTeamForm } from "@/components/join-our-team/join-our-team-form";

export function JoinOurTeamPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex flex-col gap-8 pb-12 sm:gap-10 sm:pb-14 lg:pb-16">
        <AnimatedSection variant="fade-up">
          <section className="relative mx-auto w-full max-w-7xl px-5 pt-10 sm:px-6 sm:pt-14 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy">
              Careers
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Join our team
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Interested in mentoring or supporting learners at SRR Careers?
              Share your details below and we&apos;ll get back to you. You can
              also{" "}
              <Link
                href="/our-team"
                className="font-semibold text-brand-navy underline-offset-2 hover:underline"
              >
                meet the people you&apos;d work with
              </Link>
              .
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection variant="fade-up">
          <section className="mx-auto w-full max-w-3xl px-5 sm:px-6 md:px-10 lg:px-14">
            <JoinOurTeamForm />
          </section>
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
