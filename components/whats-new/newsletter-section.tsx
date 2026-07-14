import { NewsletterForm } from "@/components/whats-new/newsletter-form";
import type { WhatsNewPageContent } from "@/lib/types/whats-new-page-content";

type NewsletterSectionProps = {
  content: WhatsNewPageContent["newsletter"];
};

/** Figma 90:2023 — Stay in the loop newsletter CTA band. */
export function NewsletterSection({ content }: NewsletterSectionProps) {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="w-full bg-gradient-to-br from-brand-purple to-brand-purple-deep py-11 sm:py-14"
    >
      <div className="mx-auto flex max-w-[982px] flex-col items-center gap-10 px-6 text-center sm:gap-14">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h2
            id="newsletter-heading"
            className="font-serif text-3xl font-semibold italic leading-tight text-[#ffc31a] sm:text-4xl sm:leading-snug md:text-[48px] md:leading-[64px]"
          >
            {content.title}
          </h2>
          <p className="text-lg font-medium leading-normal text-[#d8d8d8] sm:text-xl">
            {content.description}
          </p>
        </div>

        <NewsletterForm ctaLabel={content.ctaLabel} />
      </div>
    </section>
  );
}
