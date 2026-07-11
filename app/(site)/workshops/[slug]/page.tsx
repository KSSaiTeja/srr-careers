import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/course-detail/course-detail-page";
import { WorkshopDetailPage } from "@/components/workshops/workshop-detail-page";
import {
  getWorkshopBySlug,
  getWorkshopSlugs,
} from "@/lib/constants/workshops";
import { getCourseDetailContent } from "@/lib/payload/get-course-detail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkshopSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    return { title: "Workshop Not Found | SRR Careers" };
  }

  if (workshop.courseDetailSlug) {
    const course = await getCourseDetailContent(workshop.courseDetailSlug);
    if (course) {
      return {
        title: course.meta.title,
        description: course.meta.description,
      };
    }
  }

  return {
    title: `${workshop.title} | SRR Careers`,
    description: workshop.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    notFound();
  }

  if (workshop.courseDetailSlug) {
    const course = await getCourseDetailContent(workshop.courseDetailSlug);
    if (!course) {
      notFound();
    }
    return <CourseDetailPage course={course} />;
  }

  return <WorkshopDetailPage workshop={workshop} />;
}
