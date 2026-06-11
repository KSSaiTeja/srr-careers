import homeIcons from "@/lib/assets/home-icons";
import { cn } from "@/lib/utils/cn";

type InstructorBackgroundBlobProps = {
  className?: string;
};

/** Matches Figma Frame29 — blur needs the expanded inset wrapper or it clips away. */
export function InstructorBackgroundBlob({
  className,
}: InstructorBackgroundBlobProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-[319.761px] w-[213.308px]",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-[-95.97%_-153.15%_-102.16%_-153.15%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 866.671 953.318"
        >
          <g filter="url(#instructor-blob-blur)">
            <path d={homeIcons.p2f56db0} fill="#F5F7FB" />
            <path d={homeIcons.p26bfab70} fill="#083F88" />
            <path d={homeIcons.p21542e80} fill="#083F88" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="973.124"
              id="instructor-blob-blur"
              width="866.671"
              x="0"
              y="-19.8064"
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
                stdDeviation="163.341"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
