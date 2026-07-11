import { Info } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { HomePageContent } from "@/lib/types/home-page-content";

type CurriculumSectionProps = {
  content: HomePageContent["curriculum"];
};

function renderWithHighlight(text: string, highlight?: string): ReactNode {
  if (!highlight) return text;
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);
  return (
    <Fragment>
      {before}
      <span className="font-semibold text-brand-navy">{match}</span>
      {after}
    </Fragment>
  );
}

export function CurriculumSection({ content }: CurriculumSectionProps) {
  return (
    <section id="courses" className="py-8 sm:py-10 lg:py-12">
      <Container>
        <BlurReveal as="div" className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-4 text-base font-medium tracking-widest text-brand-navy sm:mb-6 sm:text-lg lg:text-xl">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
            {content.titleLine1}
          </h2>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
            {content.titleLine2}{" "}
            <span className="text-brand-navy">{content.titleHighlight}</span>{" "}
            {content.titleLine2Suffix}
          </h2>
        </BlurReveal>

        {content.notice ? (
          <div className="mx-auto mb-8 flex max-w-[860px] items-start gap-3 rounded-2xl border border-brand-navy/15 bg-brand-navy/[0.04] px-5 py-4 sm:mb-10 sm:items-center sm:px-6">
            <Info
              className="mt-0.5 size-5 shrink-0 text-brand-navy sm:mt-0"
              aria-hidden
            />
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              {renderWithHighlight(
                content.notice.text,
                content.notice.highlight,
              )}
            </p>
          </div>
        ) : null}

        <ol className="divide-y divide-gray-200 border-t border-gray-200">
          {content.modules.map((module) => (
            <li
              key={module.num}
              data-reveal-item
              className="grid min-w-0 grid-cols-[3.5rem_1fr] gap-4 py-4 sm:grid-cols-[80px_1fr] sm:gap-6 sm:py-5 lg:gap-10"
            >
              <span className="text-xs font-bold tracking-wider text-gray-500">
                {module.num}
              </span>
              <div className="min-w-0">
                <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                  {module.title}
                </h3>
                <p className="text-gray-600">{module.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-gray-200 bg-white p-8 sm:flex-row sm:items-center sm:flex-wrap">
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm tracking-widest text-gray-600">
              {content.ctaEyebrow}
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {content.ctaTitle}
            </h3>
          </div>
          <Link
            href={content.cta.href}
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-brand-navy px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-navy-dark"
          >
            {content.cta.label}
            <Icon name="arrowUpRight" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
