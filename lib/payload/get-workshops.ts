import config from "@payload-config";
import { getPayload } from "payload";
import {
  mapWorkshopDetailFromCMS,
  mapWorkshopDetailFromDefaults,
  mapWorkshopsPageFromCMS,
  mapWorkshopsSharedFromCMS,
} from "./map-workshops";
import type {
  WorkshopDefinition,
  WorkshopDetailPageContent,
  WorkshopsPageContent,
} from "@/lib/types/workshops-content";
import { workshopDetailsDefaults } from "@/payload/seed/workshop-details-defaults";

export async function getWorkshopsPageContent(): Promise<WorkshopsPageContent> {
  try {
    const payload = await getPayload({ config });
    const [global, workshops] = await Promise.all([
      payload.findGlobal({ slug: "workshops-page", depth: 0 }),
      payload.find({
        collection: "workshop-details",
        limit: 100,
        depth: 0,
        pagination: false,
        sort: "sortOrder",
      }),
    ]);

    return mapWorkshopsPageFromCMS(global, workshops.docs);
  } catch {
    return mapWorkshopsPageFromCMS(undefined, undefined);
  }
}

export async function getWorkshopDetailPageContent(
  slug: string,
): Promise<WorkshopDetailPageContent | undefined> {
  try {
    const payload = await getPayload({ config });
    const [global, result] = await Promise.all([
      payload.findGlobal({ slug: "workshops-page", depth: 0 }),
      payload.find({
        collection: "workshop-details",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      }),
    ]);

    const workshop =
      mapWorkshopDetailFromCMS(result.docs[0]) ??
      mapWorkshopDetailFromDefaults(slug);

    if (!workshop) return undefined;

    return {
      workshop,
      shared: mapWorkshopsSharedFromCMS(global),
    };
  } catch {
    const workshop = mapWorkshopDetailFromDefaults(slug);
    if (!workshop) return undefined;
    return {
      workshop,
      shared: mapWorkshopsSharedFromCMS(undefined),
    };
  }
}

export async function getWorkshopSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "workshop-details",
      limit: 100,
      depth: 0,
      pagination: false,
      sort: "sortOrder",
    });

    const slugs = result.docs
      .filter((doc) => doc.published !== false)
      .map((doc) => doc.slug)
      .filter((value): value is string => Boolean(value));

    if (slugs.length > 0) return slugs;
  } catch {
    // fall through
  }

  return workshopDetailsDefaults
    .filter((entry) => entry.published)
    .map((entry) => entry.slug);
}

export async function getWorkshopNavChildren(): Promise<
  { label: string; href: string }[]
> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "workshop-details",
      limit: 100,
      depth: 0,
      pagination: false,
      sort: "sortOrder",
    });

    const children = result.docs
      .filter((doc) => doc.published !== false)
      .map((doc) => {
        const workshop = mapWorkshopDetailFromCMS(doc);
        if (!workshop) return null;
        return {
          label: workshop.navLabel,
          href: `/workshops/${workshop.slug}`,
        };
      })
      .filter(Boolean) as { label: string; href: string }[];

    if (children.length > 0) return children;
  } catch {
    // fall through
  }

  return workshopDetailsDefaults
    .filter((entry) => entry.published)
    .map((entry) => ({
      label: entry.navLabel,
      href: `/workshops/${entry.slug}`,
    }));
}

/** Sync helper kept for call sites that already have a slug list. */
export function getWorkshopBySlugSync(
  slug: string,
): WorkshopDefinition | undefined {
  return mapWorkshopDetailFromDefaults(slug);
}
