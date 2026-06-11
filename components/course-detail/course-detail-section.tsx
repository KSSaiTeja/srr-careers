import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type CourseDetailSectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
};

/** Content width aligned with courses page (max ~1218px). */
export function CourseDetailSection({
  children,
  className,
  containerClassName,
  id,
  "aria-labelledby": ariaLabelledBy,
}: CourseDetailSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("w-full", className)}
    >
      <Container
        className={cn(
          "max-w-[1218px] !px-4 py-0 sm:!px-6 md:!px-6 lg:!px-8 xl:!px-8 2xl:!px-8",
          containerClassName,
        )}
      >
        {children}
      </Container>
    </section>
  );
}
