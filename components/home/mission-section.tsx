import Image from "next/image";
import { Container } from "@/components/ui/container";
import { images } from "@/lib/constants/images";
import { getHomePageFallback } from "@/lib/payload/home-page-fallback";
import type { HomePageContent } from "@/lib/types/home-page-content";
import { cn } from "@/lib/utils/cn";

const missionChartPaths = {
  line: "M3 155.276L18.0603 148.808C26.6087 145.136 34.634 140.35 41.9275 134.575L49.5563 128.533C63.2603 117.681 80.2284 111.776 97.709 111.776H113.633C126.791 111.776 139.109 105.313 146.586 94.4856C149.644 90.058 153.562 86.2921 158.108 83.4125L174.856 72.802C182.616 67.8861 191.612 65.2762 200.798 65.2762C210.164 65.2762 219.329 62.563 227.186 57.4648L244.291 46.3651C254.941 39.454 267.365 35.7762 280.061 35.7762C290.312 35.7762 300.421 33.3779 309.579 28.773L320.159 23.4537C323.66 21.6931 327.525 20.7762 331.445 20.7762C335.914 20.7762 340.302 19.5841 344.157 17.3229L346.03 16.2242C349.355 14.2738 352.314 11.758 354.773 8.78995L361 1.27616",
  fill: "M28.3294 143.276L0 155.276V198.276H363V1.27616L352.917 13.2762L339.952 20.7762H326.988L296.738 35.7762H261.206L215.111 65.2762H186.302L150.29 87.7762L144.532 95.999C137.608 105.887 126.295 111.776 114.224 111.776H96.0317H68.6627L28.3294 143.276Z",
} as const;

const cardBaseClass =
  "rounded-2xl border border-[#eaeaea] bg-white p-6 shadow-[0_55px_61px_rgba(0,0,0,0.03),0_222px_111px_rgba(0,0,0,0.03)] sm:p-7";

type StatCardProps = {
  label: string;
  value: string;
  suffix?: string;
  description: string;
  labelPosition?: "top" | "bottom";
  partners?: boolean;
  partnersLabel?: string;
  compact?: boolean;
  className?: string;
};

function StatCard({
  label,
  value,
  suffix,
  description,
  labelPosition = "top",
  partners,
  partnersLabel = "800+ Partners",
  compact = false,
  className,
}: StatCardProps) {
  const labelEl = (
    <p
      className={cn(
        "tracking-[2.56px] text-brand-navy",
        compact ? "text-sm" : "text-base",
      )}
    >
      {label}
    </p>
  );

  const valueEl = (
    <div className="flex items-end gap-1">
      <span
        className={cn(
          "font-bold leading-none text-gray-900",
          compact ? "text-5xl sm:text-6xl" : "text-5xl sm:text-6xl xl:text-[5.125rem]",
        )}
      >
        {value}
      </span>
      {suffix && (
        <span
          className={cn(
            "font-medium text-gray-900",
            compact ? "pb-2 text-2xl" : "pb-3 text-[2rem]",
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );

  const descriptionEl = (
    <p
      className={cn(
        "text-gray-900",
        compact
          ? "text-base leading-relaxed text-gray-600"
          : "text-lg leading-snug sm:text-xl",
      )}
    >
      {description}
    </p>
  );

  return (
    <article className={cn(cardBaseClass, "h-full", className)}>
      {partners && (
        <div className="mb-6 flex items-center gap-2">
          <div className="flex -space-x-2">
            {images.founders.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={34}
                height={34}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-base text-gray-900">{partnersLabel}</span>
        </div>
      )}

      {labelPosition === "top" ? (
        <div className={cn("flex flex-col", compact ? "gap-4" : "gap-5")}>
          {labelEl}
          {valueEl}
          {descriptionEl}
        </div>
      ) : (
        <div className={cn("flex flex-col", compact ? "gap-5" : "gap-6")}>
          {descriptionEl}
          {valueEl}
          {labelEl}
        </div>
      )}
    </article>
  );
}

function MissionGrowthChart() {
  return (
    <div className="relative mx-auto h-[197px] w-full max-w-[361px] overflow-visible px-2">
      <svg
        className="h-full w-full overflow-visible"
        viewBox="-4 -12 372 214"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="mission-chart-fill"
            x1="181.5"
            x2="181.5"
            y1="-162.724"
            y2="335.276"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="0.694272" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={missionChartPaths.fill} fill="url(#mission-chart-fill)" />
        <path
          d={missionChartPaths.line}
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="361" cy="1.27616" r="6" fill="#FFC31A" aria-hidden />
      </svg>
    </div>
  );
}

function AlumniHighlightCard({
  content,
}: {
  content: HomePageContent["mission"]["alumniCard"];
}) {
  const trustedLines = content.trustedBy.split("\n");

  return (
    <article className="flex h-full min-h-0 flex-col overflow-clip rounded-2xl bg-[#0b1023] p-6 text-white sm:p-7 xl:h-full">
      <p className="shrink-0 text-xl leading-relaxed sm:text-2xl">
        {content.body}
      </p>

      <div className="flex min-h-[200px] flex-1 items-center justify-center overflow-visible px-2 py-8 sm:min-h-[220px]">
        <MissionGrowthChart />
      </div>

      <div className="flex shrink-0 flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="flex shrink-0 items-end gap-1">
          <span className="text-5xl font-bold leading-none sm:text-6xl xl:text-7xl">
            {content.rating}
          </span>
          <span className="pb-1.5 text-xl text-[#c4c4c4] xl:text-2xl">
            {content.ratingSuffix}
          </span>
        </div>
        <p className="min-w-0 flex-1 text-left text-xs leading-relaxed tracking-wide text-[#cfc5c5] sm:text-right xl:text-sm">
          {trustedLines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}

function MissionBentoGrid({
  mission,
}: {
  mission: HomePageContent["mission"];
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1216px]",
        "grid grid-cols-1 gap-6 sm:gap-8",
        "md:grid-cols-2",
        "xl:grid-cols-3 xl:grid-rows-[auto_auto] xl:items-stretch",
      )}
    >
      <StatCard
        className="min-w-0 md:col-start-1 md:row-start-1 xl:col-start-1 xl:row-start-1"
        label={mission.roiCard.label}
        value={mission.roiCard.value}
        suffix={mission.roiCard.suffix}
        description={mission.roiCard.description}
        labelPosition="bottom"
        partners
        partnersLabel={mission.roiCard.partnersLabel}
      />

      <StatCard
        className="min-w-0 md:col-start-2 md:row-start-1 xl:col-start-2 xl:row-start-1"
        label={mission.placementCardTop.label}
        value={mission.placementCardTop.value}
        suffix={mission.placementCardTop.suffix}
        description={mission.placementCardTop.description}
      />

      <div className="min-w-0 md:col-span-2 md:row-start-2 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:row-span-2 xl:self-stretch">
        <AlumniHighlightCard content={mission.alumniCard} />
      </div>

      <StatCard
        compact
        className="min-w-0 md:col-start-1 md:row-start-3 xl:col-start-1 xl:row-start-2"
        label={mission.placementCardBottom.label}
        value={mission.placementCardBottom.value}
        suffix={mission.placementCardBottom.suffix}
        description={mission.placementCardBottom.description}
      />

      <StatCard
        compact
        className="min-w-0 md:col-start-2 md:row-start-3 xl:col-start-2 xl:row-start-2"
        label={mission.practiceCard.label}
        value={mission.practiceCard.value}
        description={mission.practiceCard.description}
      />
    </div>
  );
}

type MissionSectionProps = {
  content?: HomePageContent["mission"];
  /** @deprecated Prefer `content.eyebrow` from CMS. Kept for Our Story page. */
  eyebrow?: string;
  className?: string;
};

export function MissionSection({
  content: contentProp,
  eyebrow,
  className,
}: MissionSectionProps) {
  const base = contentProp ?? getHomePageFallback().mission;
  const content = eyebrow ? { ...base, eyebrow } : base;
  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-24", className)}
      aria-labelledby="mission-heading"
    >
      <Container className="flex flex-col items-center gap-10 sm:gap-12">
        <div className="max-w-[781px] text-center">
          <p
            id="mission-heading"
            className="mb-5 text-sm font-medium uppercase tracking-[3px] text-brand-navy sm:mb-6 sm:text-base sm:tracking-[5px] lg:text-xl"
          >
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-[1.25] tracking-[-1px] text-black/50 sm:text-4xl sm:tracking-[-1.5px] xl:text-[48px] xl:leading-[1.3]">
            {content.headingGray}
          </h2>
          <p className="mt-2 text-3xl font-semibold leading-[1.25] tracking-[-1px] text-brand-navy sm:text-4xl sm:tracking-[-1.5px] xl:text-[48px] xl:leading-[1.3]">
            {content.headingNavy}
          </p>
        </div>

        <MissionBentoGrid mission={content} />
      </Container>
    </section>
  );
}
