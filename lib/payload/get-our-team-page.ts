import config from "@payload-config";
import { getPayload } from "payload";
import { mapOurTeamPageFromCMS } from "./map-our-team-page";

export async function getOurTeamPageContent() {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "our-team-page",
      depth: 1,
    });

    return mapOurTeamPageFromCMS(global);
  } catch {
    return mapOurTeamPageFromCMS(undefined);
  }
}
