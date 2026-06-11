import { CircleCheck, Star } from "lucide-react";
import { CourseDetailSection } from "@/components/course-detail/course-detail-section";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";

type CourseDetailWhoSectionProps = {
  content: CourseDetailContent["whoIsItFor"];
};

export function CourseDetailWhoSection({ content }: CourseDetailWhoSectionProps) {
  return (
    <CourseDetailSection className="py-16 sm:py-20">
      <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:gap-14 2xl:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-8 xl:max-w-[726px]">
          <div className="flex flex-col gap-5 sm:gap-6">
            <p className="text-sm font-medium uppercase tracking-[3px] text-brand-navy sm:text-base sm:tracking-[5px] lg:text-xl">
              {content.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold leading-[1.2] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[1.3]">
              {content.title}{" "}
              <span className="text-brand-navy">{content.titleHighlight}</span>
            </h2>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {content.audience.map((item) => (
              <li
                key={item}
                data-reveal-item
                className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#dfdfdf] bg-white px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 sm:px-5 sm:py-4"
              >
                <Star
                  className="size-[18px] shrink-0 fill-brand-navy text-brand-navy"
                  aria-hidden
                />
                <span className="min-w-0 text-base font-medium leading-snug text-black sm:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-5 rounded-2xl bg-[#0b1023] px-6 py-7 sm:px-8 sm:py-8 xl:max-w-[461px] xl:shrink-0">
          <div className="flex min-w-0 flex-col gap-2.5">
            <h3 className="text-2xl font-semibold leading-tight tracking-[-1px] text-white sm:text-[32px]">
              {content.handsOnTitle}
            </h3>
            <p className="text-base leading-relaxed text-white/90">
              {content.handsOnDescription}
            </p>
          </div>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {content.handsOnFeatures.map((feature) => (
              <li key={feature} className="flex min-w-0 items-start gap-2.5">
                <CircleCheck
                  className="mt-0.5 size-5 shrink-0 text-brand-gold"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="min-w-0 text-base leading-snug text-[#e3e3f2]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CourseDetailSection>
  );
}
