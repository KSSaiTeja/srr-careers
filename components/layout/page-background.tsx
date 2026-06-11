import { WebGLAmbient } from "@/components/motion/webgl-ambient";
import homeIcons from "@/lib/assets/home-icons";

export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-50 md:opacity-70 lg:opacity-100">
      <WebGLAmbient />
      <svg
        className="absolute -left-32 -top-20 h-auto w-full scale-110 md:scale-100"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 2342.8 1782.8"
        aria-hidden
      >
        <g filter="url(#filter0_f)">
          <path d={homeIcons.p29ec0500} fill="#F3EFFB" />
        </g>
        <g filter="url(#filter1_f)">
          <path d={homeIcons.p38390500} fill="#FEF5E2" />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="989.8"
            id="filter0_f"
            width="1576.8"
            x="766"
            y="793"
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
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="1243.8"
            id="filter1_f"
            width="1673.8"
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
      </svg>
    </div>
  );
}
