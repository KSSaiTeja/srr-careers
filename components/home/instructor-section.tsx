import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { InstructorBackgroundBlob } from "@/components/home/instructor-background-blob";
import { images } from "@/lib/constants/images";
import type { HomePageContent } from "@/lib/types/home-page-content";
import { socialProfiles } from "@/lib/constants/social";
import { cn } from "@/lib/utils/cn";

const instructorLinkedInHref =
  socialProfiles.find((profile) => profile.platform === "linkedin")?.href ??
  "#linkedin";

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

function LinkedInButton() {
  return (
    <a
      href={instructorLinkedInHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View LinkedIn profile"
      className="inline-flex size-[38px] shrink-0 items-center justify-center self-start rounded-lg bg-gray-400 p-2 transition-colors hover:bg-gray-500"
    >
      <svg
        className="size-[23px]"
        fill="none"
        viewBox="0 0 21.388 20.4158"
        aria-hidden
      >
        <path
          d="M14.5827 6.80528C16.1298 6.80528 17.6134 7.41984 18.7074 8.51375C19.8013 9.60767 20.4158 11.0913 20.4158 12.6384V19.4437H16.5271V12.6384C16.5271 12.1227 16.3223 11.6281 15.9576 11.2635C15.593 10.8989 15.0984 10.694 14.5827 10.694C14.0671 10.694 13.5725 10.8989 13.2079 11.2635C12.8432 11.6281 12.6384 12.1227 12.6384 12.6384V19.4437H8.74964V12.6384C8.74964 11.0913 9.3642 9.60767 10.4581 8.51375C11.552 7.41984 13.0357 6.80528 14.5827 6.80528Z"
          stroke="#F9FAFB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.94437"
        />
        <path
          d="M4.86091 7.77746H0.972183V19.4437H4.86091V7.77746Z"
          stroke="#F9FAFB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.94437"
        />
        <path
          d="M2.91655 4.86091C3.99039 4.86091 4.86091 3.99039 4.86091 2.91655C4.86091 1.8427 3.99039 0.972183 2.91655 0.972183C1.8427 0.972183 0.972183 1.8427 0.972183 2.91655C0.972183 3.99039 1.8427 4.86091 2.91655 4.86091Z"
          stroke="#F9FAFB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.94437"
        />
      </svg>
    </a>
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

        <div className="relative mt-1 min-h-[72px]">
          <LinkedInButton />

          <div
            className="pointer-events-none absolute right-0 bottom-0 z-10 flex h-[88px] w-[88px] items-center justify-center"
            aria-hidden
          >
            <div className="rotate-[17.43deg]">
              <div className="-rotate-[23.04deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images.instructorSignature}
                  alt=""
                  width={63}
                  height={63}
                  className="h-[63px] w-[62px] max-w-none object-contain"
                />
              </div>
            </div>
          </div>
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
