import { CourseDetailSection } from "@/components/course-detail/course-detail-section";
import { SyllabusModuleAccordion } from "@/components/course-detail/syllabus-module-accordion";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";

type CourseDetailSyllabusSectionProps = {
  content: CourseDetailContent["syllabus"];
};

export function CourseDetailSyllabusSection({
  content,
}: CourseDetailSyllabusSectionProps) {
  return (
    <CourseDetailSection id="syllabus" className="py-16 sm:py-20">
      <div className="mx-auto mb-12 flex max-w-[781px] flex-col items-center gap-5 text-center sm:mb-14 sm:gap-6">
        <p className="text-sm font-medium uppercase tracking-[3px] text-brand-navy sm:text-base sm:tracking-[5px] lg:text-xl">
          {content.eyebrow}
        </p>
        <h2 className="text-3xl font-bold leading-[1.2] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[1.3]">
          {content.title}
        </h2>
      </div>

      <SyllabusModuleAccordion items={content.items} />
    </CourseDetailSection>
  );
}
