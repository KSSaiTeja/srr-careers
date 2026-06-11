import { Fragment } from "react";
import { OurStorySection } from "@/components/our-story/our-story-section";
import { pageIntro } from "@/lib/constants/our-story-content";
import homeIcons from "@/lib/assets/home-icons";
import ourStoryIcons from "@/lib/assets/our-story-icons";

function HeroBackgroundBlob() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(640px,92vh)] overflow-visible"
      aria-hidden
    >
      {/* CSS wash — reliable across browsers; matches Figma #F3EFFB blob */}
      <div className="absolute left-1/2 top-[8%] h-[min(400px,50vh)] w-[min(120%,800px)] -translate-x-1/2 rounded-[50%] bg-brand-lavender/60 blur-[60px] md:h-[min(480px,55vh)] md:w-[min(125%,900px)] md:bg-brand-lavender/80 md:blur-[90px] lg:h-[min(520px,55vh)] lg:w-[min(130%,1000px)] lg:blur-[128px]" />

      {/* Figma vector 31:541 — same shape as export */}
      <svg
        className="absolute -inset-[18%_-12%] size-[136%] max-w-none"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1955.8 1125.8"
      >
        <defs>
          <filter
            id="our-story-hero-blob-blur"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="1125.8"
            width="1955.8"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              mode="normal"
              result="shape"
            />
            <feGaussianBlur
              result="effect1_foregroundBlur"
              stdDeviation="128.95"
            />
          </filter>
        </defs>
        <g filter="url(#our-story-hero-blob-blur)">
          <path d={ourStoryIcons.heroBlob} fill="#F3EFFB" />
        </g>
      </svg>
    </div>
  );
}

function MetricDivider() {
  return (
    <div
      className="h-14 w-px shrink-0 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
      aria-hidden
    />
  );
}

function MetricItem({
  value,
  label,
  icon: IconComponent,
}: {
  value: string;
  label: string;
  icon: (typeof pageIntro.metrics)[number]["icon"];
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 sm:gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-navy bg-white p-2.5 sm:size-14 sm:p-3">
        <IconComponent
          className="size-7 text-brand-navy sm:size-8"
          strokeWidth={2}
          aria-hidden
        />
      </div>
      <div className="min-w-0 xl:whitespace-nowrap">
        <p className="text-xl font-semibold text-brand-navy sm:text-2xl">{value}</p>
        <p className="text-sm text-[#3c3c3c] sm:text-base">{label}</p>
      </div>
    </div>
  );
}

function SapFicoUnderline() {
  return (
    <span
      className="pointer-events-none absolute -bottom-2 left-1/2 h-[11px] w-[min(320px,110%)] -translate-x-1/2"
      aria-hidden
    >
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 320.425 16.786"
      >
        <path d={homeIcons.p7dc7a80} fill="#FFD549" />
      </svg>
    </span>
  );
}

/**
 * Figma 31:1093 — page title, two-line headline, subtext, single-row metrics.
 */
export function OurStoryIntroSection() {
  return (
    <section className="relative isolate" aria-labelledby="our-story-page-title">
      <div className="overflow-x-clip" aria-hidden>
        <HeroBackgroundBlob />
      </div>

      <OurStorySection className="relative z-10 bg-transparent pb-0 pt-12 sm:pt-14 md:pt-16 lg:pt-20">
        <p
          id="our-story-page-title"
          className="mb-6 text-center font-serif text-3xl italic leading-[1.2] tracking-[-1px] text-transparent bg-gradient-to-b from-brand-navy to-brand-navy/0 bg-clip-text sm:mb-8 sm:text-4xl sm:tracking-[-1.5px] md:mb-10 md:text-[48px] md:leading-[63px] lg:mb-14"
        >
          {pageIntro.pageTitle}
        </p>

        <div className="mx-auto w-full max-w-[1216px]">
          <div className="flex flex-col gap-10 text-center sm:gap-12">
            <h1 className="font-serif text-4xl leading-[1.2] text-gray-900 sm:text-[48px] sm:leading-[1.35] md:text-[56px] lg:text-[76.87px] lg:leading-[1.45]">
              <span className="block">{pageIntro.headline}</span>
              <span className="mt-2 block text-brand-navy">
                <span className="relative inline-block italic">
                  {pageIntro.headlineHighlight}
                  <SapFicoUnderline />
                </span>
                {pageIntro.headlineSuffix}
              </span>
            </h1>

            <p className="mx-auto max-w-[1217px] whitespace-pre-wrap text-lg font-medium leading-[1.45] text-black sm:text-xl lg:text-2xl">
              {pageIntro.subtext}
            </p>
          </div>
        </div>
      </OurStorySection>

      {/* Full viewport width — Figma metrics row (61px gaps); not clipped by content max-width */}
      <div
        className="relative z-10 mt-20 w-full max-w-[100vw] pb-8 sm:mt-24 md:mt-28 lg:mt-32"
        role="list"
        aria-label="SRR Careers highlights"
      >
        <div className="mx-auto flex w-full max-w-[100vw] min-w-0 flex-nowrap items-center justify-between gap-4 px-4 sm:gap-8 sm:px-8 md:gap-[61px] md:px-12 lg:px-16 xl:px-20 max-xl:justify-start max-xl:overflow-x-auto max-xl:[-ms-overflow-style:none] max-xl:scrollbar-none max-xl:[&::-webkit-scrollbar]:hidden">
          {pageIntro.metrics.map((metric, index) => (
            <Fragment key={metric.label}>
              {index > 0 ? <MetricDivider /> : null}
              <MetricItem {...metric} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
