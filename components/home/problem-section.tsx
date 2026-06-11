import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { HomePageContent } from "@/lib/types/home-page-content";

type ProblemSectionProps = {
  content: HomePageContent["problem"];
};

export function ProblemSection({ content }: ProblemSectionProps) {
  return (
    <section className="bg-white/50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-3xl font-semibold text-gray-500 sm:mb-4 sm:text-4xl lg:text-5xl">
            {content.headingGray}
          </p>
          <h2 className="text-3xl font-semibold text-brand-navy sm:text-4xl lg:text-5xl">
            {content.headingNavy}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {content.items.map((item) => (
            <li
              key={item.text}
              data-reveal-item
              className="flex flex-col items-center gap-5 rounded-xl p-7 text-center transition hover:shadow-lg sm:p-8"
            >
              <Icon
                name={item.icon}
                className="h-9 w-9 text-brand-navy"
                strokeWidth={2}
              />
              <p className="text-base font-medium leading-relaxed text-gray-900">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
