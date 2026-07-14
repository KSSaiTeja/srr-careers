import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/course-detail/course-detail-page";
import { WorkshopDetailPage } from "@/components/workshops/workshop-detail-page";
import { getCourseDetailContent } from "@/lib/payload/get-course-detail";
import {
  getWorkshopDetailPageContent,
  getWorkshopSlugs,
} from "@/lib/payload/get-workshops";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getWorkshopSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getWorkshopDetailPageContent(slug);

  if (!content) {
    return { title: "Workshop Not Found | SRR Careers" };
  }

  const { workshop } = content;

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
    title: workshop.meta.title,
    description: workshop.meta.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const content = await getWorkshopDetailPageContent(slug);

  if (!content) {
    notFound();
  }

  const { workshop } = content;

  if (workshop.courseDetailSlug) {
    const course = await getCourseDetailContent(workshop.courseDetailSlug);
    if (!course) {
      notFound();
    }
    return <CourseDetailPage course={course} />;
  }

  return <WorkshopDetailPage content={content} />;
}
