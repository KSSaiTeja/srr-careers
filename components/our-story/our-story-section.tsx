import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type OurStorySectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
};

/** Matches Figma Frame66 content width (1217px). */
export function OurStorySection({
  children,
  className,
  containerClassName,
  id,
  "aria-labelledby": ariaLabelledBy,
}: OurStorySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("w-full", className)}
    >
      <Container
        className={cn(
          "max-w-[1217px] !px-4 sm:!px-6 md:!px-6 lg:!px-8 xl:!px-8 2xl:!px-8",
          containerClassName,
        )}
      >
        {children}
      </Container>
    </section>
  );
}
