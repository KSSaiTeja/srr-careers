import config from "@payload-config";
import { getPayload } from "payload";
import { mapWhatsNewPageFromCMS } from "./map-whats-new-page";

export async function getWhatsNewPageContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "whats-new-page",
      depth: 1,
    });

    return mapWhatsNewPageFromCMS(global);
  } catch {
    return mapWhatsNewPageFromCMS(undefined);
  }
}
