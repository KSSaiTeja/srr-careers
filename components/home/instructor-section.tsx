import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { InstructorBackgroundBlob } from "@/components/home/instructor-background-blob";
import type { HomePageContent } from "@/lib/types/home-page-content";
import { cn } from "@/lib/utils/cn";

function FeatureItem({
  title,
  description,
  align = "start",
}: {
  title: string;
  description: string;
  align?: "start" | "end";
}) {
  return (
    <div
      className={cn(
        "flex w-full max-w-full flex-col gap-5 sm:gap-6 xl:max-w-[234px]",
        align === "end"
          ? "items-center text-center xl:items-end xl:text-right"
          : "items-center text-center xl:items-start xl:text-left",
      )}
    >
      <Icon name="document" className="h-7 w-7 text-gray-500" strokeWidth={2} />
      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h3>
      <p className="text-base text-gray-600 sm:text-lg">{description}</p>
    </div>
  );
}

function FeatureColumn({
  items,
  align = "start",
}: {
  items: readonly { title: string; description: string }[];
  align?: "start" | "end";
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-center gap-12 sm:gap-16 xl:gap-[76px]",
        align === "end"
          ? "items-center xl:items-end"
          : "items-center xl:items-start",
      )}
    >
      {items.map((feature) => (
        <FeatureItem
          key={feature.title}
          title={feature.title}
          description={feature.description}
          align={align}
        />
      ))}
    </div>
  );
}

function InstructorCard({
  content,
}: {
  content: HomePageContent["instructor"];
}) {
  return (
    <article className="relative z-10 w-full max-w-md shrink-0 rounded-3xl border-2 border-white bg-gradient-to-b from-gray-100 to-white p-6 shadow-lg sm:p-7">
      <Image
        src={content.photoUrl}
        alt="SAP FICO instructor"
        width={338}
        height={189}
        className="mb-6 h-auto w-full rounded-2xl object-cover"
      />

      <div className="flex flex-col gap-7">
        <div>
          <h4 className="mb-2 text-lg font-bold text-gray-900">
            {content.journeyHeading}
          </h4>
          <p className="text-sm leading-relaxed text-gray-600">
            {content.journeyBody}
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-lg font-bold text-gray-900">
            {content.skillsHeading}
          </h4>
          <p className="text-sm text-gray-600">{content.skillsBody}</p>
        </div>
      </div>
    </article>
  );
}

type InstructorSectionProps = {
  content: HomePageContent["instructor"];
};

export function InstructorSection({ content }: InstructorSectionProps) {
  return (
    <section id="story" className="relative bg-white/50 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          highlight={content.titleHighlight}
          className="mb-10 sm:mb-12 lg:mb-16"
        />

        <div className="relative mx-auto max-w-6xl min-h-0 lg:min-h-[480px]">
          <InstructorBackgroundBlob className="left-[calc(50%-10px)] top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 xl:block" />

          <div className="relative z-10 flex flex-col items-center justify-center gap-16 sm:gap-20 xl:flex-row xl:items-center xl:gap-10">
            <FeatureColumn items={content.featuresLeft} align="start" />
            <InstructorCard content={content} />
            <FeatureColumn items={content.featuresRight} align="start" />
          </div>
        </div>
      </Container>
    </section>
  );
}
