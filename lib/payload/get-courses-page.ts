import config from "@payload-config";
import { getPayload } from "payload";
import { mapCoursesPageFromCMS } from "./map-courses-page";

export async function getCoursesPageContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "courses-page",
      depth: 1,
    });

    return mapCoursesPageFromCMS(global);
  } catch {
    return mapCoursesPageFromCMS(undefined);
  }
}
