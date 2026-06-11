import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { HomePageContent } from "@/lib/types/home-page-content";

type CurriculumSectionProps = {
  content: HomePageContent["curriculum"];
};

export function CurriculumSection({ content }: CurriculumSectionProps) {
  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
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
        </div>

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
