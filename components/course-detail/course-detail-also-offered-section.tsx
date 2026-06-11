import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseDetailSection } from "@/components/course-detail/course-detail-section";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";

type CourseDetailAlsoOfferedSectionProps = {
  content: CourseDetailContent["alsoOffered"];
};

export function CourseDetailAlsoOfferedSection({
  content,
}: CourseDetailAlsoOfferedSectionProps) {
  return (
    <CourseDetailSection className="py-16 sm:py-20">
      <div className="flex flex-col gap-6 rounded-[30px] border border-[#e3e3f2] bg-white p-6 sm:gap-8 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex flex-col gap-2.5">
          <p className="text-sm font-semibold uppercase tracking-[1.98px] text-[#5a637b] sm:text-base">
            {content.eyebrow}
          </p>
          <p className="text-xl font-bold tracking-tight text-[#0b1023] sm:text-2xl">
            {content.title}
          </p>
        </div>
        <Link
          href={content.href}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-navy-dark sm:w-auto"
        >
          {content.ctaLabel}
          <ArrowRight className="size-5" strokeWidth={2} />
        </Link>
      </div>
    </CourseDetailSection>
  );
}
