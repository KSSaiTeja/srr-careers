import { PageIntroWithBlob } from "@/components/shared/page-intro-with-blob";
import type { CoursesPageContent } from "@/lib/types/courses-page-content";

type CoursesIntroSectionProps = {
  content: CoursesPageContent["intro"];
};

/** Figma 46:423 + 73:140 — page title and two-track hero. */
export function CoursesIntroSection({ content }: CoursesIntroSectionProps) {
  return (
    <PageIntroWithBlob content={content} titleId="courses-page-title" />
  );
}
