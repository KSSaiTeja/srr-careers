import { WhatsNewSection } from "@/components/whats-new/whats-new-section";
import { whatsNewPageIntro } from "@/lib/constants/whats-new-content";

/** Figma 90:1825 — page title; background wash lives on WhatsNewIntroArea. */
export function WhatsNewHeroSection() {
  return (
    <WhatsNewSection
      className="bg-transparent pb-0 pt-12 sm:pt-14 md:pt-16 lg:pt-20"
      aria-labelledby="whats-new-page-title"
    >
      <h1
        id="whats-new-page-title"
        className="text-center font-serif text-3xl italic leading-[1.2] tracking-[-1px] text-transparent bg-gradient-to-b from-brand-navy to-brand-navy/0 bg-clip-text sm:text-4xl sm:tracking-[-1.5px] md:text-[48px] md:leading-[63px]"
      >
        {whatsNewPageIntro.pageTitle}
      </h1>
    </WhatsNewSection>
  );
}
