import config from "@payload-config";
import { getPayload } from "payload";
import { mapSiteSettingsFromCMS } from "./map-site-settings";

export async function getSiteSettings() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });

    return mapSiteSettingsFromCMS(global);
  } catch {
    return mapSiteSettingsFromCMS(undefined);
  }
}
