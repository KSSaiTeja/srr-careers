import config from "@payload-config";
import { getPayload } from "payload";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";
import type { CourseDetail } from "@/payload-types";
import { courseDetailsDefaults } from "@/payload/seed/course-details-defaults";
import { mapCourseDetailFromCMS } from "./map-course-detail";

function defaultBySlug(slug: string): CourseDetailContent | undefined {
  const doc = courseDetailsDefaults.find((entry) => entry.slug === slug);
  return doc
    ? mapCourseDetailFromCMS(doc as unknown as Partial<CourseDetail>)
    : undefined;
}

export async function getCourseDetailContent(
  slug: string,
): Promise<CourseDetailContent | undefined> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "course-details",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    const doc = result.docs[0];
    if (doc) {
      return mapCourseDetailFromCMS(doc);
    }

    return defaultBySlug(slug);
  } catch {
    return defaultBySlug(slug);
  }
}

export async function getCourseDetailSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "course-details",
      limit: 100,
      depth: 0,
      pagination: false,
    });

    const slugs = result.docs
      .map((doc) => doc.slug)
      .filter((slug): slug is string => Boolean(slug));

    if (slugs.length > 0) {
      return slugs;
    }
  } catch {
    // fall through to defaults
  }

  return courseDetailsDefaults.map((doc) => doc.slug);
}
