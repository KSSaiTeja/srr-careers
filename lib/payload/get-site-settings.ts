import config from "@payload-config";
import { getPayload } from "payload";
import { getWorkshopNavChildren } from "./get-workshops";
import { mapSiteSettingsFromCMS } from "./map-site-settings";

export async function getSiteSettings() {
  try {
    const payload = await getPayload({ config });
    const [global, workshopsNavChildren] = await Promise.all([
      payload.findGlobal({
        slug: "site-settings",
        depth: 1,
      }),
      getWorkshopNavChildren(),
    ]);

    return mapSiteSettingsFromCMS(global, { workshopsNavChildren });
  } catch {
    return mapSiteSettingsFromCMS(undefined);
  }
}
