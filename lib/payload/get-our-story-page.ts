import config from "@payload-config";
import { getPayload } from "payload";
import { mapOurStoryPageFromCMS } from "./map-our-story-page";

export async function getOurStoryPageContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "our-story-page",
      depth: 1,
    });

    return mapOurStoryPageFromCMS(global);
  } catch {
    return mapOurStoryPageFromCMS(undefined);
  }
}
