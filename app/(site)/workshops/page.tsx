import type { Metadata } from "next";
import { WorkshopsPage } from "@/components/workshops/workshops-page";
import { getWorkshopsPageContent } from "@/lib/payload/get-workshops";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWorkshopsPageContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function Page() {
  const content = await getWorkshopsPageContent();
  return <WorkshopsPage content={content} />;
}
