import config from "@payload-config";
import { getPayload } from "payload";
import { mapHomePageFromCMS } from "./map-home-page";

export async function getHomePageContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    });

    return mapHomePageFromCMS(global);
  } catch {
    return mapHomePageFromCMS(undefined);
  }
}
