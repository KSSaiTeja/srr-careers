import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { getHomePageFallback } from "@/lib/payload/home-page-fallback";
import type { HomePageContent } from "@/lib/types/home-page-content";
import { cn } from "@/lib/utils/cn";

function StarRating() {
  return (
    <div className="mb-5 flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          name="star"
          className="h-4 w-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

type TestimonialsSectionProps = {
  content?: HomePageContent["testimonials"];
  /** @deprecated Prefer `content.eyebrow` from CMS. */
  eyebrow?: string;
  className?: string;
  mutedBackground?: boolean;
};

export function TestimonialsSection({
  content: contentProp,
  eyebrow,
  className,
  mutedBackground = true,
}: TestimonialsSectionProps) {
  const base = contentProp ?? getHomePageFallback().testimonials;
  const content = eyebrow ? { ...base, eyebrow } : base;
  return (
    <section
      className={cn(
        mutedBackground && "bg-white/50",
        "py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          highlight={content.titleHighlight}
        />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((testimonial) => (
            <li
              key={testimonial.name}
              data-reveal-item
              className="relative rounded-3xl border border-gray-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="absolute right-6 top-6 opacity-10">
                <Icon
                  name="quote"
                  className="h-10 w-10 text-[#371ECB]"
                  strokeWidth={2}
                />
              </div>

              <StarRating />
              <blockquote className="mb-6 leading-relaxed text-gray-700">
                {testimonial.quote}
              </blockquote>

              <footer className="flex items-center gap-3 border-t border-gray-200 pt-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-light"
                  aria-hidden
                >
                  <span className="text-sm font-bold text-white">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <cite className="not-italic">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </cite>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
