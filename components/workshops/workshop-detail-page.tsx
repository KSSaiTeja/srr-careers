import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { PageBackground } from "@/components/layout/page-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreFooterSection } from "@/components/home/pre-footer-section";
import { WorkshopFormatTabs } from "@/components/workshops/workshop-format-tabs";
import {
  WORKSHOP_DURATION_LABEL,
  WORKSHOP_DURATION_NOTE,
  WORKSHOP_PRICING_LABEL,
  WORKSHOP_PRICING_NOTE,
  type WorkshopDefinition,
  type WorkshopModule,
} from "@/lib/constants/workshops";

type WorkshopDetailPageProps = {
  workshop: WorkshopDefinition;
};

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-[2px] text-[#7b7b7b]">{label}</p>
      <p className="mt-1 text-sm font-medium leading-snug text-gray-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

function ModuleList({ modules }: { modules: WorkshopModule[] }) {
  return (
    <ol className="divide-y divide-[#eee]">
      {modules.map((module, index) => (
        <li
          key={`${module.title}-${index}`}
          className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0 sm:py-4"
        >
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-navy/8 text-xs font-semibold text-brand-navy">
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-gray-800 sm:text-base">
              {module.title}
            </p>
          </div>
          {module.duration ? (
            <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm">
              {module.duration}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function WorkshopDetailPage({ workshop }: WorkshopDetailPageProps) {
  const hasFormats = Boolean(workshop.formats?.length);
  const hasSessions = Boolean(workshop.sessions?.length);
  const hasModules = Boolean(workshop.modules?.length);
  const hasAgenda = hasFormats || hasSessions || hasModules;

  const metaItems = [
    { label: "Duration", value: WORKSHOP_DURATION_LABEL },
    { label: "Price", value: WORKSHOP_PRICING_LABEL },
    workshop.mode ? { label: "Mode", value: workshop.mode } : null,
    workshop.audience ? { label: "Audience", value: workshop.audience } : null,
    workshop.speaker ? { label: "Speaker", value: workshop.speaker } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageBackground />
      <SiteHeader />
      <main className="flex flex-col gap-8 pb-12 sm:gap-10 sm:pb-14 lg:pb-16">
        <AnimatedSection variant="fade-up">
          <section className="relative mx-auto w-full max-w-7xl px-5 pt-10 sm:px-6 sm:pt-12 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy">
              {workshop.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {workshop.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {workshop.description}
            </p>

            {metaItems.length > 0 ? (
              <div className="mt-8 grid gap-5 rounded-2xl border border-[#eaeaea] bg-white/80 px-5 py-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-3 xl:grid-cols-5">
                {metaItems.map((item) => (
                  <MetaItem key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#7b7b7b]">
                  Duration & pricing
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Both customisable
                </p>
                <p className="mt-1 max-w-md text-sm text-gray-500">
                  {WORKSHOP_DURATION_NOTE} {WORKSHOP_PRICING_NOTE}
                  {workshop.durationBaseline
                    ? ` Sample agenda: ${workshop.durationBaseline}.`
                    : null}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#demo-class"
                  className="inline-flex rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-dark sm:text-base"
                >
                  Book a Free Demo
                </Link>
                <Link
                  href="/workshops"
                  className="inline-flex rounded-full border border-brand-navy/25 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy/50 sm:text-base"
                >
                  All workshops
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" staggerChildren>
          <section className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              What you&apos;ll take away
            </h2>
            <ul className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
              {workshop.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[#eaeaea] bg-white px-5 py-4 text-sm leading-relaxed text-gray-700 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </AnimatedSection>

        {hasAgenda ? (
          <AnimatedSection variant="fade-up">
            <section className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy">
                    Agenda
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                    {hasFormats
                      ? "Choose a format"
                      : hasSessions
                        ? "One-day programme flow"
                        : "Session modules"}
                  </h2>
                </div>
              </div>

              {hasFormats && workshop.formats ? (
                <WorkshopFormatTabs formats={workshop.formats} />
              ) : null}

              {hasSessions && workshop.sessions ? (
                <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-5">
                  {workshop.sessions.map((session) => (
                    <div
                      key={session.label}
                      className="rounded-2xl border border-[#eaeaea] bg-white p-5 sm:p-6"
                    >
                      <div className="border-b border-[#eee] pb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {session.label}
                        </h3>
                        {session.time ? (
                          <p className="mt-1 text-sm font-medium text-brand-navy">
                            {session.time}
                          </p>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <ModuleList modules={session.modules} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {hasModules && workshop.modules ? (
                <div className="mt-6 rounded-2xl border border-[#eaeaea] bg-white p-5 sm:p-7">
                  <ModuleList modules={workshop.modules} />
                </div>
              ) : null}
            </section>
          </AnimatedSection>
        ) : null}

        <AnimatedSection variant="fade-up">
          <PreFooterSection />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
