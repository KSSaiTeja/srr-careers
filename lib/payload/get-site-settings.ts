import config from "@payload-config";
import { getPayload } from "payload";
import { getCoursesNavChildren } from "./get-courses-listing";
import { getWorkshopNavChildren } from "./get-workshops";
import { mapSiteSettingsFromCMS } from "./map-site-settings";

export async function getSiteSettings() {
  try {
    const payload = await getPayload({ config });
    const [global, workshopsNavChildren, coursesNavChildren] =
      await Promise.all([
        payload.findGlobal({
          slug: "site-settings",
          depth: 2,
        }),
        getWorkshopNavChildren(),
        getCoursesNavChildren(),
      ]);

    return mapSiteSettingsFromCMS(global, {
      workshopsNavChildren,
      coursesNavChildren,
    });
  } catch {
    return mapSiteSettingsFromCMS(undefined);
  }
}
