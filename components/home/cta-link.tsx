import Link from "next/link";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { cn } from "@/lib/utils/cn";
import type { HomeCta } from "@/lib/types/home-page-content";

const variantStyles = {
  primary:
    "bg-brand-navy text-white hover:bg-brand-navy-dark rounded-2xl px-5 py-3 text-base font-medium transition-colors inline-flex items-center justify-center sm:px-6 sm:text-lg lg:text-xl",
  secondary:
    "border-2 border-brand-navy bg-white/10 text-brand-navy backdrop-blur-sm hover:bg-brand-navy hover:text-white rounded-2xl px-5 py-3 text-base font-medium transition-colors inline-flex items-center justify-center sm:px-6 sm:text-lg lg:text-xl",
} as const;

type CtaLinkProps = {
  cta: HomeCta;
  variant: keyof typeof variantStyles;
  className?: string;
};

export function CtaLink({ cta, variant, className }: CtaLinkProps) {
  const styles = cn(variantStyles[variant], className);
  const isExternal =
    cta.href.startsWith("http://") || cta.href.startsWith("https://");

  if (isExternal) {
    return (
      <MagneticButton>
        <a href={cta.href} className={styles} target="_blank" rel="noopener noreferrer">
          {cta.label}
        </a>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton>
      <Link href={cta.href} className={styles}>
        {cta.label}
      </Link>
    </MagneticButton>
  );
}
