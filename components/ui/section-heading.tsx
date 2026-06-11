import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={cn("mb-10 sm:mb-12 lg:mb-16", alignClass, className)}>
      {eyebrow && (
        <p className="mb-4 text-base font-medium tracking-widest text-brand-navy sm:mb-6 sm:text-lg lg:text-xl">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-brand-navy">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mt-2 text-3xl font-semibold text-gray-500 sm:text-4xl lg:text-5xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
