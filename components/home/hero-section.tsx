"use client";

import Image from "next/image";
import homeIcons from "@/lib/assets/home-icons";
import type { HomePageContent } from "@/lib/types/home-page-content";
import { CtaLink } from "@/components/home/cta-link";
import {
  HeroEntrance,
  HeroEntranceItem,
} from "@/components/motion/hero-entrance";
import { ParallaxLayer } from "@/components/motion/parallax-layer";

const heroMaskStyle = {
  maskImage:
    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0) 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0) 100%)",
} as const;

type HeroSectionProps = {
  content: HomePageContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="home" className="relative overflow-x-clip px-5 sm:px-6">
      <HeroEntrance className="flex flex-col items-center">
        <HeroEntranceItem>
          <div className="mb-8 mt-8 inline-flex max-w-[calc(100vw-2.5rem)] rounded-[44px] border border-brand-gold bg-brand-cream px-5 py-2.5 sm:mb-10 sm:mt-10 sm:px-6">
            <span className="text-center text-sm font-semibold tracking-[1.5px] text-brand-gold-dark-text sm:text-base sm:tracking-[2.56px]">
              {content.badge}
            </span>
          </div>
        </HeroEntranceItem>

        <HeroEntranceItem>
          <div className="relative mb-8 text-center sm:mb-10">
            <h1 className="font-serif text-4xl leading-[1.2] sm:text-5xl sm:leading-[1.45] lg:text-[4.8rem]">
              {content.titleLine1}
            </h1>
            <div className="relative inline-block max-w-full">
              <h1 className="font-serif text-4xl italic leading-[1.2] text-brand-navy sm:text-5xl sm:leading-[1.45] lg:text-[4.8rem]">
                {content.titleAccent}
              </h1>
              <div className="absolute -bottom-2 left-1/2 h-[11px] w-[min(320px,90vw)] -translate-x-1/2">
                <svg
                  className="h-full w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 320.425 16.786"
                  aria-hidden
                >
                  <path d={homeIcons.p7dc7a80} fill="#FFD549" />
                </svg>
              </div>
            </div>
          </div>
        </HeroEntranceItem>

        <HeroEntranceItem>
          <div className="relative z-10 mb-12 flex w-full max-w-md flex-col items-stretch justify-center gap-4 sm:mb-14 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 lg:gap-8">
            <CtaLink cta={content.primaryCta} variant="primary" />
            <CtaLink cta={content.secondaryCta} variant="secondary" />
          </div>
        </HeroEntranceItem>
      </HeroEntrance>

      <ParallaxLayer speed={-0.08} className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div
          className="relative aspect-[1672/641] w-full overflow-hidden"
          style={heroMaskStyle}
        >
          <Image
            src={content.imageUrl}
            alt={content.imageAlt}
            fill
            priority
            sizes="100vw"
            className="!h-[142%] !w-full !max-w-none object-cover object-top"
            style={{
              top: "-38%",
              left: 0,
              right: "auto",
              bottom: "auto",
            }}
          />
        </div>
      </ParallaxLayer>
    </section>
  );
}
