import type { UpdateBadgeVariant } from "@/lib/constants/whats-new-content";
import { cn } from "@/lib/utils/cn";

const badgeStyles: Record<
  UpdateBadgeVariant,
  { container: string; dot: string; label: string }
> = {
  update: {
    container: "bg-[rgba(0,122,85,0.1)]",
    dot: "bg-[#007a55]",
    label: "text-[#007a55]",
  },
  notice: {
    container: "bg-[rgba(255,195,26,0.1)]",
    dot: "bg-[#dda300]",
    label: "text-[#dda300]",
  },
  alert: {
    container: "bg-[rgba(255,26,26,0.1)]",
    dot: "bg-[#ff1a1a]",
    label: "text-[#ff1a1a]",
  },
  "update-navy": {
    container: "bg-brand-navy/10",
    dot: "bg-brand-navy",
    label: "text-brand-navy",
  },
};

type UpdateBadgeProps = {
  variant: UpdateBadgeVariant;
  label: string;
  className?: string;
  /** Pinned card uses brighter green label on dark background */
  onDark?: boolean;
};

export function UpdateBadge({
  variant,
  label,
  className,
  onDark = false,
}: UpdateBadgeProps) {
  const styles = badgeStyles[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[18px] rounded-xl px-3 py-1.5",
        onDark ? "bg-white/10" : styles.container,
        className,
      )}
    >
      <span
        className={cn("h-2 w-2 shrink-0 rounded-full", styles.dot)}
        aria-hidden
      />
      <span
        className={cn(
          "text-base font-normal uppercase tracking-[0.375em]",
          onDark && variant === "update"
            ? "text-[#00ff2b]"
            : styles.label,
        )}
      >
        {label}
      </span>
    </div>
  );
}
