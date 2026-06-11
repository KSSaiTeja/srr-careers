import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Layers,
  Terminal,
  Trophy,
} from "lucide-react";
import { CoursesSection } from "@/components/courses/courses-section";
import {
  offeringsSection,
  type CourseOffering,
} from "@/lib/constants/courses-content";
import { cn } from "@/lib/utils/cn";

function MetaColumn({
  icon: Icon,
  label,
  value,
  valueSuffix,
  variant,
}: {
  icon: typeof Terminal;
  label: string;
  value: string;
  valueSuffix?: string;
  variant: CourseOffering["variant"];
}) {
  const isDark = variant === "consultant";

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs uppercase tracking-[2px]",
          isDark ? "text-[#cacaca]" : "text-[#7b7b7b]",
        )}
      >
        <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        <span>{label}</span>
      </div>
      <div
        className={cn(
          "flex flex-wrap items-center gap-1 text-base font-semibold",
          isDark ? "text-white" : "text-black",
        )}
      >
        <span className="uppercase">{value}</span>
        {valueSuffix ? (
          <>
            <span className="text-[8px] font-medium">•</span>
            <span>{valueSuffix}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}

function OfferingCard({ course }: { course: CourseOffering }) {
  const isConsultant = course.variant === "consultant";

  return (
    <article
      id={course.id}
      data-reveal-item
      className={cn(
        "@container/offering-card scroll-mt-28 flex h-full flex-col justify-between gap-8 rounded-2xl px-6 py-7 sm:gap-10 sm:px-8 sm:py-8",
        isConsultant
          ? "bg-[#0b1023] text-white"
          : "border border-[#eaeaea] bg-white text-black",
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="break-words text-[24px] font-semibold leading-tight tracking-[-1.5px] sm:text-[32px]">
            {course.title}
          </h3>
          <p
            className={cn(
              "text-base leading-relaxed",
              isConsultant ? "text-white/90" : "text-[#3c3c3c]",
            )}
          >
            {course.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 @[28rem]:grid-cols-3 @[28rem]:gap-8">
          <MetaColumn
            icon={Terminal}
            label="Duration"
            value={course.duration}
            valueSuffix={course.durationSuffix}
            variant={course.variant}
          />
          <MetaColumn
            icon={Layers}
            label="Modules"
            value={course.modules}
            variant={course.variant}
          />
          <MetaColumn
            icon={Trophy}
            label="Outcome"
            value={course.outcome}
            variant={course.variant}
          />
        </div>

        <ul className="flex flex-col gap-3">
          {course.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CircleCheck
                className={cn(
                  "mt-0.5 size-5 shrink-0",
                  isConsultant ? "text-brand-gold" : "text-brand-navy",
                )}
                strokeWidth={2}
                aria-hidden
              />
              <span
                className={cn(
                  "text-base",
                  isConsultant ? "text-[#e3e3f2]" : "text-[#3c3c3c]",
                )}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Link
          href={course.ctaHref}
          className={cn(
            "text-base font-bold transition-opacity hover:opacity-80",
            isConsultant ? "text-white" : "text-brand-navy",
          )}
        >
          {course.ctaLabel}
        </Link>
        <Link
          href={course.ctaHref}
          className={cn(
            "flex size-12 items-center justify-center rounded-full transition-opacity hover:opacity-90",
            isConsultant ? "bg-brand-gold text-black" : "bg-[#0b1023] text-white",
          )}
          aria-label={course.ctaLabel}
        >
          <ArrowRight className="size-6" strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

/** Figma 73:265 — Our Offerings course cards. */
export function OfferingsSection() {
  return (
    <CoursesSection
      aria-labelledby="offerings-heading"
      className="py-0"
    >
      <div className="mb-12 flex flex-col items-center gap-6 text-center sm:mb-14 sm:gap-8">
        <p className="text-sm font-medium uppercase tracking-[3px] text-brand-navy sm:text-base sm:tracking-[5px] lg:text-xl">
          {offeringsSection.eyebrow}
        </p>
        <h2
          id="offerings-heading"
          className="max-w-[781px] break-words text-3xl font-semibold leading-[1.25] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[1.3]"
        >
          {offeringsSection.title}{" "}
          <span className="text-brand-navy">
            {offeringsSection.titleHighlight}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:gap-12 xl:grid-cols-2">
        {offeringsSection.courses.map((course) => (
          <OfferingCard key={course.id} course={course} />
        ))}
      </div>
    </CoursesSection>
  );
}
