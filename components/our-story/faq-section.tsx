import Link from "next/link";
import { OurStorySection } from "@/components/our-story/our-story-section";
import { FaqList } from "@/components/our-story/faq-list";
import { faqSection as defaultFaqSection } from "@/lib/constants/our-story-content";
import { cn } from "@/lib/utils/cn";

type FaqContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  helperText: string;
  askLinkLabel: string;
  askLinkHref: string;
  items: readonly { question: string; answer: string }[];
};

type FaqSectionProps = {
  content?: FaqContent;
  className?: string;
  sectionClassName?: string;
};

/** Figma Frame89 — FAQs with interactive accordion. */
export function FaqSection({
  content = defaultFaqSection,
  className,
  sectionClassName,
}: FaqSectionProps) {
  return (
    <OurStorySection
      aria-labelledby="faq-heading"
      className={cn("py-0", sectionClassName)}
    >
      <div
        className={cn(
          "flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-14",
          className,
        )}
      >
        <div className="w-full max-w-[494px] shrink-0 lg:sticky lg:top-28">
          <p className="mb-6 text-xl font-medium uppercase tracking-[5px] text-brand-navy">
            {content.eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-semibold leading-[1.2] tracking-[-1px] text-black sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:leading-[63px]"
          >
            {content.title}
            <br />
            <span className="text-brand-navy">{content.highlight}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#525252] sm:text-xl sm:leading-[26px]">
            {content.helperText}
          </p>
          <Link
            href={content.askLinkHref}
            className="mt-6 inline-flex items-center gap-2 text-xl font-bold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-navy-dark"
          >
            {content.askLinkLabel}
          </Link>
        </div>

        <FaqList
          items={[...content.items]}
          askLinkHref={content.askLinkHref}
          askLinkLabel={content.askLinkLabel}
        />
      </div>
    </OurStorySection>
  );
}
