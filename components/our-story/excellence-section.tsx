import { Target } from "lucide-react";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { OurStorySection } from "@/components/our-story/our-story-section";
import type {
  OurStoryExcellencePillar,
  OurStoryPageContent,
} from "@/lib/types/our-story-page-content";
import { cn } from "@/lib/utils/cn";

/** Subtle upward offset for card 02 — matches Figma stagger at xl+. */
const staggerClass = [
  "",
  "xl:-translate-y-16",
  "",
  "",
] as const;

function ExcellenceCard({
  num,
  title,
  description,
  className,
}: OurStoryExcellencePillar & { className?: string }) {
  return (
    <article
      data-reveal-item
      className={cn(
        "flex h-full flex-col gap-8 rounded-3xl border border-[#eaeaea] bg-gradient-to-b from-brand-navy/0 to-brand-navy/10 p-6 transition-transform duration-300 hover:-translate-y-1 sm:gap-10 sm:p-7 xl:gap-12",
        className,
      )}
    >
      <p
        className="bg-gradient-to-b from-[#e7edf4] to-transparent bg-clip-text text-6xl font-bold leading-none text-transparent sm:text-7xl xl:text-8xl 2xl:text-[120px]"
        aria-hidden
      >
        {num}.
      </p>
      <div className="flex flex-col gap-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand-navy/15 p-2">
          <Target
            className="size-5 text-brand-navy"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div>
          <h3 className="text-xl font-bold leading-7 text-brand-navy sm:text-[23px]">
            {title}
          </h3>
          <p className="mt-3 text-base leading-7 text-[#525252]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

type ExcellenceSectionProps = {
  content: OurStoryPageContent["excellence"];
};

/** Figma Frame71 — excellence pillars; single responsive grid (no duplicate layouts). */
export function ExcellenceSection({ content }: ExcellenceSectionProps) {
  return (
    <OurStorySection aria-labelledby="excellence-heading">
      <div className="flex flex-col gap-12 sm:gap-16 xl:gap-20">
        <BlurReveal as="div">
          <h2
            id="excellence-heading"
            className="text-3xl font-semibold leading-[1.2] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] xl:text-[48px] xl:leading-[63px]"
          >
            {content.title}
            <br />
            <span className="text-brand-navy">{content.highlight}</span>
          </h2>
        </BlurReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4 xl:items-end xl:gap-5 2xl:gap-6">
          {content.pillars.map((pillar, index) => (
            <ExcellenceCard
              key={`${pillar.num}-${index}`}
              {...pillar}
              className={staggerClass[index]}
            />
          ))}
        </div>
      </div>
    </OurStorySection>
  );
}
