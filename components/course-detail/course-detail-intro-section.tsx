import { PageIntroWithBlob } from "@/components/shared/page-intro-with-blob";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";

type CourseDetailIntroSectionProps = {
  content: CourseDetailContent["intro"];
};

export function CourseDetailIntroSection({
  content,
}: CourseDetailIntroSectionProps) {
  return (
    <PageIntroWithBlob
      content={content}
      titleId="course-detail-page-title"
    />
  );
}
