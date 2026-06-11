import Link from "next/link";
import { ArrowUpRight, Star, UsersRound, Zap } from "lucide-react";
import { CoursesSection } from "@/components/courses/courses-section";
import { learningApproachSection } from "@/lib/constants/courses-content";
import { cn } from "@/lib/utils/cn";

const cardBase =
  "flex flex-col rounded-2xl border border-[#eaeaea] p-6 sm:p-7";

/** Figma 76:371 — Built for the way Consultants Learn. */
export function LearningApproachSection() {
  const { stats } = learningApproachSection;

  return (
    <CoursesSection aria-labelledby="learning-approach-heading" className="py-0">
      <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-14 xl:gap-16">
        {/* Copy + CTA */}
        <div className="flex flex-col justify-center gap-8 lg:gap-10">
          <div className="flex flex-col gap-5 sm:gap-6">
            <h2
              id="learning-approach-heading"
              className="text-3xl font-semibold leading-[1.25] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[1.3]"
            >
              {learningApproachSection.title}{" "}
              <span className="text-brand-navy">
                {learningApproachSection.titleHighlight}
              </span>
            </h2>
            <p className="max-w-[642px] text-base leading-relaxed text-black sm:text-lg lg:text-xl">
              {learningApproachSection.description}
            </p>
          </div>

          <Link
            href={learningApproachSection.ctaHref}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-navy px-5 py-3.5 text-lg text-white transition-colors hover:bg-brand-navy-dark sm:w-fit sm:px-6 sm:text-xl"
          >
            {learningApproachSection.ctaLabel}
            <ArrowUpRight className="size-6 shrink-0" strokeWidth={2} />
          </Link>
        </div>

        {/*
          Bento stats:
          · mobile: stacked
          · sm/md: gold full-width, mentor + rating side-by-side
          · lg+: flex row — gold matches height of mentor + rating column
        */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-stretch">
          {/* Max seats — tall bento cell */}
          <article
            data-reveal-item
            className={cn(
              cardBase,
              "gap-6 border-brand-gold/30 bg-brand-gold transition-transform duration-300 hover:-translate-y-1 sm:gap-7",
              "lg:flex-1 lg:justify-between",
            )}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0b1023] p-3">
              <UsersRound
                className="size-6 text-white"
                strokeWidth={2}
                aria-hidden
              />
            </span>
            <div className="mt-6 flex flex-col gap-6 lg:mt-0 lg:flex-1 lg:justify-between">
              <div>
                <p className="text-5xl font-bold leading-none text-black sm:text-6xl xl:text-[82px]">
                  {stats.maxSeats.value}
                </p>
                <p className="mt-2 text-lg font-medium text-black sm:text-xl">
                  {stats.maxSeats.label}
                </p>
              </div>
              <p className="text-base leading-[1.45] text-black/90 sm:text-lg">
                {stats.maxSeats.description}
              </p>
            </div>
          </article>

          {/* Mentor + rating column */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:flex lg:min-w-0 lg:flex-1 lg:flex-col">
            <article
              data-reveal-item
              className={cn(
                cardBase,
                "gap-5 bg-white transition-transform duration-300 hover:-translate-y-1",
                "lg:flex-1 lg:justify-between",
              )}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy/15 p-2">
                <Zap
                  className="size-5 text-brand-navy"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
              <div className="mt-5 flex flex-col gap-3 lg:mt-0 lg:flex-1 lg:justify-center">
                <h3 className="text-xl font-bold text-brand-navy sm:text-2xl">
                  {stats.mentorLed.title}
                </h3>
                <p className="text-base leading-7 text-[#525252]">
                  {stats.mentorLed.description}
                </p>
              </div>
            </article>

            <article
              data-reveal-item
              className={cn(
                "flex flex-col justify-between gap-4 rounded-2xl bg-[#0b1023] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7",
                "lg:flex-1",
              )}
            >
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold leading-none text-white sm:text-5xl xl:text-[64px]">
                  {stats.rating.value}
                </span>
                <span className="pb-1 text-xl font-medium text-[#c4c4c4] sm:text-2xl xl:text-[28px]">
                  {stats.rating.suffix}
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </CoursesSection>
  );
}
