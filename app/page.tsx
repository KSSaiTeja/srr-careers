import { HomePage } from "@/components/home/home-page";
import { getHomePageContent } from "@/lib/payload/get-home-page";

export const revalidate = 60;

export default async function Page() {
  const content = await getHomePageContent();

  return <HomePage content={content} />;
}
