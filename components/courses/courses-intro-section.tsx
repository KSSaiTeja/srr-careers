import { PageIntroWithBlob } from "@/components/shared/page-intro-with-blob";
import { coursesPageIntro } from "@/lib/constants/courses-content";

/** Figma 46:423 + 73:140 — page title and two-track hero. */
export function CoursesIntroSection() {
  return (
    <PageIntroWithBlob
      content={coursesPageIntro}
      titleId="courses-page-title"
    />
  );
}
