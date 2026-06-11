import Link from "next/link";
import { Command, Layers, Trophy } from "lucide-react";
import { CourseDetailSection } from "@/components/course-detail/course-detail-section";
import type {
  CourseDetailContent,
  CourseDetailMetaCard,
} from "@/lib/constants/course-detail-content";
import { cn } from "@/lib/utils/cn";

const metaIcons = {
  duration: Command,
  modules: Layers,
  format: Command,
  outcome: Trophy,
} as const;

type CourseDetailOverviewSectionProps = {
  content: CourseDetailContent["overview"];
};

export function CourseDetailOverviewSection({
  content,
}: CourseDetailOverviewSectionProps) {
  return (
    <CourseDetailSection className="py-0 sm:py-4">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between xl:gap-14">
        <div className="flex min-w-0 flex-1 flex-col gap-8 sm:gap-10 xl:max-w-[707px]">
          <p className="text-lg leading-[1.45] text-black sm:text-xl">
            {content.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="#pre-footer"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-navy px-5 py-3.5 text-base text-white transition-colors hover:bg-brand-navy-dark sm:w-auto sm:px-6 sm:text-lg lg:text-xl"
            >
              {content.primaryCta}
            </Link>
            <Link
              href={content.secondaryCtaHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-brand-navy bg-white px-5 py-3.5 text-base text-brand-navy transition-colors hover:bg-brand-navy/5 sm:w-auto sm:px-6 sm:text-lg lg:text-xl"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2.5 rounded-2xl border border-[#eaeaea] bg-gradient-to-br from-brand-navy to-brand-navy-deep p-6 sm:p-7 xl:max-w-[392px] xl:shrink-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-5xl font-bold leading-none text-brand-gold sm:text-6xl xl:text-[82px]">
              {content.moduleCount}
            </span>
            <span className="text-lg font-semibold text-white sm:text-xl xl:text-2xl">
              {content.moduleLabel}
            </span>
          </div>
          <p className="text-base leading-[1.45] text-[#e3e3e3] sm:text-lg xl:text-xl">
            {content.moduleBlurb}
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:mt-14 xl:grid-cols-4">
        {content.metaCards.map((card) => (
          <MetaCard key={card.label} card={card} />
        ))}
      </div>
    </CourseDetailSection>
  );
}

function MetaCard({ card }: { card: CourseDetailMetaCard }) {
  const Icon = metaIcons[card.icon];

  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#eaeaea] bg-white px-4 py-4 sm:px-5 sm:py-3.5">
      <div className="flex items-center gap-1.5 text-brand-navy">
        <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
        <span className="text-sm uppercase tracking-[2px] sm:text-base">
          {card.label}
        </span>
      </div>
      <div
        className={cn(
          "min-w-0 text-black",
          card.valueSuffix
            ? "flex flex-wrap items-center gap-1"
            : "text-lg font-semibold sm:text-xl",
        )}
      >
        <span className="font-semibold uppercase">{card.value}</span>
        {card.valueSuffix ? (
          <>
            <span className="text-[10px] font-medium">•</span>
            <span className="font-semibold">{card.valueSuffix}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
