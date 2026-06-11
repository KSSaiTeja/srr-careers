import type { ReactNode } from "react";
import ourStoryIcons from "@/lib/assets/our-story-icons";

function IntroBackgroundBlob() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(380px,42vh)] overflow-hidden sm:h-[min(440px,48vh)] lg:h-[min(500px,52vh)]"
      aria-hidden
    >
      <div
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]"
      >
        <div className="absolute left-1/2 top-16 h-[min(360px,45vh)] w-[min(110%,800px)] -translate-x-1/2 rounded-[50%] bg-brand-lavender/70 blur-[60px] sm:top-20 sm:blur-[80px] lg:top-24 lg:blur-[100px]" />
        <svg
          className="absolute left-1/2 top-12 h-[min(400px,48vh)] w-[min(115%,860px)] -translate-x-1/2 max-w-none opacity-50 sm:top-16 sm:opacity-60 lg:top-20 lg:opacity-70"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1955.8 1125.8"
        >
          <defs>
            <filter
              id="whats-new-intro-blob-blur"
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
          <g filter="url(#whats-new-intro-blob-blur)">
            <path d={ourStoryIcons.heroBlob} fill="#F3EFFB" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/** Shared intro stack — blob clipped inside its own layer; tabs can scroll horizontally. */
export function WhatsNewIntroArea({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate w-full min-w-0">
      <IntroBackgroundBlob />
      <div className="relative z-10 flex min-w-0 flex-col gap-12 sm:gap-16 lg:gap-20">
        {children}
      </div>
    </div>
  );
}
