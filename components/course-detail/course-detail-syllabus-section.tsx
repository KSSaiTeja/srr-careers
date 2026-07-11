import { Info } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { CourseDetailSection } from "@/components/course-detail/course-detail-section";
import { SyllabusModuleAccordion } from "@/components/course-detail/syllabus-module-accordion";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";

type CourseDetailSyllabusSectionProps = {
  content: CourseDetailContent["syllabus"];
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

export function CourseDetailSyllabusSection({
  content,
}: CourseDetailSyllabusSectionProps) {
  return (
    <CourseDetailSection id="syllabus" className="scroll-mt-24 py-8 sm:py-10">
      <div className="mx-auto mb-12 flex max-w-[781px] flex-col items-center gap-5 text-center sm:mb-14 sm:gap-6">
        <p className="text-sm font-medium uppercase tracking-[3px] text-brand-navy sm:text-base sm:tracking-[5px] lg:text-xl">
          {content.eyebrow}
        </p>
        <h2 className="text-3xl font-bold leading-[1.2] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[1.3]">
          {content.title}
        </h2>
      </div>

      {content.notice ? (
        <div className="mx-auto mb-8 flex max-w-[860px] items-start gap-3 rounded-2xl border border-brand-navy/15 bg-brand-navy/[0.04] px-5 py-4 sm:mb-10 sm:items-center sm:px-6">
          <Info
            className="mt-0.5 size-5 shrink-0 text-brand-navy sm:mt-0"
            aria-hidden
          />
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            {renderWithHighlight(content.notice.text, content.notice.highlight)}
          </p>
        </div>
      ) : null}

      <SyllabusModuleAccordion items={content.items} />
    </CourseDetailSection>
  );
}
