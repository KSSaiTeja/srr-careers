import config from "@payload-config";
import { getPayload } from "payload";
import type { CourseOffering } from "@/lib/types/courses-page-content";
import { getCourseDetailContent } from "./get-course-detail";
import { mapCoursesPageFromCMS } from "./map-courses-page";

export async function getCoursesPageContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "courses-page",
      depth: 1,
    });

    const content = mapCoursesPageFromCMS(global);
    await syncOfferingPrices(content.offerings.courses);
    return content;
  } catch {
    return mapCoursesPageFromCMS(undefined);
  }
}

/**
 * Pricing is owned by the `course-details` collection — the same source the
 * checkout charges from. The listing cards mirror it (by slug) so the displayed
 * price always equals what the customer is charged; the `courses-page` global's
 * own price field is ignored. Best-effort per course: a lookup failure leaves
 * the mapped fallback price in place rather than breaking the page.
 */
async function syncOfferingPrices(courses: CourseOffering[]): Promise<void> {
  await Promise.all(
    courses.map(async (course) => {
      if (!course.slug) return;
      try {
        const detail = await getCourseDetailContent(course.slug);
        if (!detail) return;
        course.price = detail.overview.price;
        course.originalPrice = detail.overview.originalPrice;
      } catch {
        // Keep the existing mapped price on failure.
      }
    }),
  );
}
