import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type WhatsNewSectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
};

/** Matches Figma what's new page content width (1216px). */
export function WhatsNewSection({
  children,
  className,
  containerClassName,
  id,
  "aria-labelledby": ariaLabelledBy,
}: WhatsNewSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("w-full", className)}
    >
      <Container
        className={cn(
          "max-w-[1218px] !px-4 sm:!px-6 md:!px-6 lg:!px-8 xl:!px-8 2xl:!px-8",
          containerClassName,
        )}
      >
        {children}
      </Container>
    </section>
  );
}
