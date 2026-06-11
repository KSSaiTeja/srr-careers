import Image from "next/image";
import { Briefcase, CircleCheck } from "lucide-react";
import { CoursesSection } from "@/components/courses/courses-section";
import { trackComparisonSection } from "@/lib/constants/courses-content";
import { cn } from "@/lib/utils/cn";

type TrackCardProps = (typeof trackComparisonSection.tracks)[number];

function TrackCharacter({
  track,
  className,
}: {
  track: TrackCardProps;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <Image
        src={track.image}
        alt={track.imageAlt}
        width={214}
        height={219}
        className="h-auto w-36 object-contain sm:w-40"
      />
    </div>
  );
}

function TrackCard({ track }: { track: TrackCardProps }) {
  const isConsultant = track.badgeVariant === "consultant";
  const accentClass = isConsultant ? "text-brand-navy" : "text-[#e2a700]";
  const accentBgClass = isConsultant ? "bg-brand-navy/10" : "bg-brand-gold/10";

  return (
    <article
      id={track.id}
      data-reveal-item
      className={cn(
        "@container/track-card scroll-mt-28 flex flex-col gap-8 rounded-3xl border p-6 sm:gap-10 sm:p-8",
        isConsultant
          ? "border-brand-navy/30 bg-gradient-to-br from-brand-navy/10 to-white"
          : "border-brand-gold/40 bg-gradient-to-br from-brand-gold/10 to-white",
      )}
    >
      <div
        className={cn(
          "inline-flex w-fit items-center gap-2.5 rounded-[30px] px-3 py-2",
          accentBgClass,
        )}
      >
        <Briefcase
          className={cn("size-6 shrink-0", accentClass)}
          strokeWidth={2}
          aria-hidden
        />
        <span
          className={cn(
            "text-sm font-medium uppercase tracking-[1.92px] sm:text-base",
            accentClass,
          )}
        >
          {track.badge}
        </span>
      </div>

      {/* Persona + in-flow character (hidden when card is wide enough for overlay) */}
      <div className="flex flex-col items-center gap-8 @[52rem]/track-card:flex-row @[52rem]/track-card:items-start @[52rem]/track-card:gap-10">
        <div className="min-w-0 flex-1 text-center @[52rem]/track-card:text-left">
          <h3 className="text-3xl leading-tight sm:text-4xl">
            <span className="block font-bold text-black">
              {track.personaPrefix}
            </span>
            <span className={cn("font-serif italic", accentClass)}>
              {track.persona}
            </span>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[#323232] sm:text-lg">
            {track.personaDescription}
          </p>
        </div>

        <TrackCharacter
          track={track}
          className="@[52rem]/track-card:hidden"
        />
      </div>

      {/* Work + tools panel */}
      <div className="relative">
        {/* Overlay character — only when the card itself is very wide (single-column page layout) */}
        <TrackCharacter
          track={track}
          className="pointer-events-none absolute -top-4 right-2 z-10 hidden @[52rem]/track-card:block"
        />

        <div className="relative rounded-2xl border border-[#dfdfdf] bg-white p-6 sm:p-8 @[52rem]/track-card:pr-48">
          {/*
            Two-column work | tools only when the card has ≥36rem (~576px) inner width.
            Never use 1fr_auto_1fr — that collapses when two track cards sit side-by-side.
          */}
          <div className="flex flex-col gap-10 @[36rem]/track-card:grid @[36rem]/track-card:grid-cols-2 @[36rem]/track-card:items-start @[36rem]/track-card:gap-8">
            <div className="min-w-0">
              <p
                className={cn(
                  "mb-5 text-sm font-medium uppercase tracking-[1.92px] sm:text-base",
                  accentClass,
                )}
              >
                {track.workLabel}
              </p>
              <ul className="flex flex-col gap-4">
                {track.workItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CircleCheck
                      className={cn(
                        "mt-0.5 size-5 shrink-0 sm:size-6",
                        accentClass,
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="text-base leading-snug text-black">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#dfdfdf] pt-10 @[36rem]/track-card:border-t-0 @[36rem]/track-card:pt-0">
              <p
                className={cn(
                  "mb-5 text-sm font-medium uppercase tracking-[1.92px] sm:text-base",
                  accentClass,
                )}
              >
                {track.toolsLabel}
              </p>
              <ul className="grid grid-cols-1 gap-2.5 @[20rem]/track-card:grid-cols-2 @[36rem]/track-card:grid-cols-1">
                {track.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-xl border border-[#e3e3e3] px-3 py-2.5 text-center text-sm text-black sm:text-base"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e3e3e3] bg-white/80 p-5 sm:p-6">
        <p className="text-sm font-medium uppercase tracking-[3.2px] text-brand-navy sm:text-base">
          {track.outcomeLabel}
        </p>
        <p className="mt-3 text-lg font-bold text-[#323232] sm:text-xl">
          {track.outcome}
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
          {track.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-xl bg-brand-navy/10 px-3 py-2 text-sm font-medium text-brand-navy sm:text-base"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Figma 86:739 — Which SAP FICO career is Right for you? */
export function TrackComparisonSection() {
  return (
    <CoursesSection
      id="track-comparison"
      aria-labelledby="track-comparison-heading"
      className="py-0"
    >
      <div className="relative mb-12 flex flex-col items-center gap-6 text-center sm:mb-14 sm:gap-8">
        <p className="text-sm font-medium uppercase tracking-[3px] text-brand-navy sm:text-base sm:tracking-[5px] lg:text-xl">
          {trackComparisonSection.eyebrow}
        </p>
        <h2
          id="track-comparison-heading"
          className="max-w-[781px] text-3xl font-semibold leading-tight tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[1.3]"
        >
          {trackComparisonSection.title}
          <br />
          <span className="text-brand-navy">
            {trackComparisonSection.titleHighlight}
          </span>
        </h2>

        <div className="relative mx-auto mt-2 h-28 w-28 sm:h-[142px] sm:w-[149px]">
          <Image
            src={trackComparisonSection.signpostImage}
            alt=""
            fill
            className="object-contain"
            sizes="149px"
            aria-hidden
          />
        </div>
      </div>

      {/*
        Side-by-side only on very wide screens. Below that, full-width cards
        give the inner work/tools grid enough room to breathe.
      */}
      <div className="grid grid-cols-1 gap-12 min-[1400px]:grid-cols-2 min-[1400px]:gap-16">
        {trackComparisonSection.tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </CoursesSection>
  );
}
