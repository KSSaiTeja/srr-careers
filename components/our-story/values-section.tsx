import { BlurReveal } from "@/components/motion/blur-reveal";
import { OurStorySection } from "@/components/our-story/our-story-section";
import type { OurStoryPageContent } from "@/lib/types/our-story-page-content";
import { ourStoryIconMap } from "@/lib/utils/our-story-icon-map";
import { cn } from "@/lib/utils/cn";

function PrincipleCard({
  description,
  icon,
  featured = false,
}: OurStoryPageContent["values"]["principles"][number]) {
  const IconComponent = ourStoryIconMap[icon];
  return (
    <article
      data-reveal-item
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col gap-4 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1",
        featured
          ? "bg-gradient-to-br from-brand-purple-light via-brand-purple to-brand-purple-deep text-white"
          : "bg-white text-[#121212]",
      )}
    >
      {!featured ? (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border border-[#dfdfdf]"
          aria-hidden
        />
      ) : null}
      <div
        className={cn(
          "relative flex size-9 shrink-0 items-center justify-center rounded-lg p-2",
          featured ? "bg-white/15" : "bg-brand-navy/15",
        )}
      >
        <IconComponent
          className={cn(
            "size-5",
            featured ? "text-white" : "text-brand-navy",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </div>
      <p className="relative text-base leading-[1.45]">{description}</p>
    </article>
  );
}

type ValuesSectionProps = {
  content: OurStoryPageContent["values"];
};

/** Figma Frame42 — exactly 4 cards in 2×2; dark card top-left. */
export function ValuesSection({ content: ourValues }: ValuesSectionProps) {
  return (
    <OurStorySection aria-labelledby="our-values-heading">
      <div className="flex w-full flex-col items-start gap-12 xl:flex-row xl:items-center xl:gap-10 2xl:gap-14">
        <BlurReveal
          as="div"
          className="flex w-full min-w-0 max-w-[618px] flex-1 flex-col gap-6"
        >
          <h2
            id="our-values-heading"
            className="text-4xl font-bold leading-[1.2] text-black sm:text-5xl sm:leading-[1.35] md:text-6xl lg:text-[80px] lg:leading-[1.45]"
          >
            <span className="block">{ourValues.title}</span>
            <span className="block">{ourValues.titleLine2}</span>
          </h2>
          <p className="text-lg font-normal leading-[1.45] text-black sm:text-xl lg:text-2xl">
            {ourValues.intro}
          </p>
        </BlurReveal>

        <div className="grid w-full min-w-0 max-w-[566px] flex-1 grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:gap-x-[26px] sm:gap-y-[21px]">
          {ourValues.principles.map((principle, index) => (
            <PrincipleCard key={index} {...principle} />
          ))}
        </div>
      </div>
    </OurStorySection>
  );
}
