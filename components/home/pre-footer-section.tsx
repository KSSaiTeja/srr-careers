import { Container } from "@/components/ui/container";
import { EnrollmentForm } from "@/components/home/enrollment-form";
import { PreFooterContactButtons } from "@/components/home/pre-footer-contact-buttons";
import { getHomePageContent } from "@/lib/payload/get-home-page";
import type { HomePageContent } from "@/lib/types/home-page-content";
import { cn } from "@/lib/utils/cn";

type PreFooterSectionProps = {
  content?: HomePageContent["preFooter"];
  className?: string;
  containerClassName?: string;
};

export async function PreFooterSection({
  content: contentProp,
  className,
  containerClassName,
}: PreFooterSectionProps) {
  const content = contentProp ?? (await getHomePageContent()).preFooter;
  return (
    <section
      id="demo-class"
      aria-labelledby="demo-class-heading"
      className={cn("py-20 sm:py-24 lg:py-28", className)}
    >
      <Container className={containerClassName}>
        <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple to-brand-purple-deep sm:rounded-[40px]">
          <div
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-brand-purple-light/30 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-10 md:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16 xl:gap-28 xl:p-20">
            <div className="lg:pr-4 xl:pr-10">
              <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-[0.2em] text-white">
                  {content.badge}
                </span>
              </div>

              <h2
                id="demo-class-heading"
                className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:mb-6 sm:text-4xl lg:text-5xl xl:text-[3.25rem]"
              >
                {content.headingLine1}
                <br />
                {content.headingLine2}
              </h2>

              <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/90 xl:max-w-2xl">
                {content.description}
              </p>

              <PreFooterContactButtons
                phoneButtonLabel={content.phoneButtonLabel}
                emailButtonLabel={content.emailButtonLabel}
              />
            </div>

            <EnrollmentForm className="w-full min-w-0" />
          </div>
        </div>
      </Container>
    </section>
  );
}
