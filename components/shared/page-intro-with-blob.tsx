import {
  HeroEntrance,
  HeroEntranceItem,
} from "@/components/motion/hero-entrance";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import ourStoryIcons from "@/lib/assets/our-story-icons";
import { cn } from "@/lib/utils/cn";

export type PageIntroContent = {
  pageTitle: string;
  headline: string;
  headlineHighlight: string;
  subtext?: string;
};

type PageIntroWithBlobProps = {
  content: PageIntroContent;
  titleId: string;
  className?: string;
};

function HeroBackgroundBlob() {
  return (
    <ParallaxLayer
      speed={0.12}
      className="pointer-events-none absolute inset-0 -z-10 overflow-visible [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      aria-hidden
    >
      {/* Soft wash — fades out via mask on parent, no hard box edge */}
      <div className="absolute -right-[20%] top-[5%] h-[min(520px,70vh)] w-[min(120%,900px)] rounded-[50%] bg-brand-lavender/50 blur-[60px] md:h-[min(640px,80vh)] md:w-[min(130%,1000px)] md:bg-brand-lavender/70 md:blur-[90px] lg:h-[min(720px,85vh)] lg:w-[min(140%,1100px)] lg:bg-brand-lavender/90 lg:blur-[140px]" />
      <div className="absolute left-1/2 top-[10%] h-[min(360px,55vh)] w-[min(90%,700px)] -translate-x-1/2 rounded-[50%] bg-[#f3effb]/50 blur-[50px] md:h-[min(420px,65vh)] md:bg-[#f3effb]/70 md:blur-[80px] lg:h-[min(480px,70vh)] lg:w-[min(100%,800px)] lg:blur-[100px]" />

      <svg
        className="absolute -right-[25%] top-0 h-[min(900px,100%)] w-[min(160%,1200px)] max-w-none opacity-30 md:opacity-50 lg:opacity-70"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1955.8 1125.8"
      >
        <defs>
          <filter
            id="page-intro-blob-blur"
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
        <g filter="url(#page-intro-blob-blur)">
          <path d={ourStoryIcons.heroBlob} fill="#F3EFFB" />
        </g>
      </svg>

      {/* Bottom blend into page white */}
      <div className="absolute inset-x-0 bottom-0 h-[min(280px,40%)] bg-gradient-to-b from-transparent via-white/60 to-white" />
    </ParallaxLayer>
  );
}

/** Shared “Our Programs”–style page hero with background blur. */
export function PageIntroWithBlob({
  content,
  titleId,
  className,
}: PageIntroWithBlobProps) {
  return (
    <section
      className={cn(
        "relative z-0 isolate overflow-x-clip pb-6 sm:pb-8",
        className,
      )}
      aria-labelledby={titleId}
    >
      <HeroBackgroundBlob />

      <HeroEntrance className="relative z-10 mx-auto max-w-[1218px] bg-transparent px-4 pb-0 pt-10 sm:px-6 sm:pt-14 md:pt-16 lg:px-8 lg:pt-20">
        <HeroEntranceItem>
          <p
            id={titleId}
            className="mb-6 break-words text-center font-serif text-3xl italic leading-[1.2] tracking-[-1px] text-transparent bg-gradient-to-b from-brand-navy to-brand-navy/0 bg-clip-text sm:mb-8 sm:text-4xl sm:tracking-[-1.5px] md:mb-10 md:text-[48px] md:leading-[63px] lg:mb-14"
          >
            {content.pageTitle}
          </p>
        </HeroEntranceItem>

        <div className="mx-auto flex max-w-[900px] flex-col gap-12 text-center sm:gap-14">
          <HeroEntranceItem className="flex flex-col gap-8 sm:gap-10">
            <h1 className="break-words font-serif text-4xl leading-[1.2] text-gray-900 sm:text-[48px] md:text-[56px] lg:text-[76.87px] lg:leading-[1.05]">
              <span className="block">{content.headline}</span>
              <span className="mt-2 block italic text-brand-navy">
                {content.headlineHighlight}
              </span>
            </h1>
            {content.subtext ? (
              <p className="mx-auto max-w-[720px] break-words text-lg font-medium leading-[1.45] text-black sm:text-xl lg:text-2xl">
                {content.subtext}
              </p>
            ) : null}
          </HeroEntranceItem>
        </div>
      </HeroEntrance>
    </section>
  );
}
