import Image from "next/image";
import { images } from "@/lib/constants/images";
import { cn } from "@/lib/utils/cn";

type MsmeBadgeProps = {
  label?: string;
  className?: string;
  /** `strip` = compact header size; `footer` = mid-size brand mark */
  size?: "strip" | "footer";
};

const sizeClass = {
  strip: "h-7 sm:h-8",
  footer: "h-12 w-auto sm:h-14",
} as const;

export function MsmeBadge({
  label,
  className,
  size = "footer",
}: MsmeBadgeProps) {
  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      <Image
        src={images.msmeLogo}
        alt="MSME — Micro, Small & Medium Enterprises"
        width={600}
        height={600}
        className={cn(
          "w-auto rounded-sm bg-white object-contain shadow-sm ring-1 ring-black/5",
          sizeClass[size],
        )}
      />
      {label ? (
        <p className="text-xs font-medium leading-4 text-[#5a637b]">{label}</p>
      ) : null}
    </div>
  );
}
