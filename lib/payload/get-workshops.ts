import config from "@payload-config";
import { getPayload } from "payload";
import {
  listingCardsFromGlobal,
  mapListingCardsFromCMS,
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
import { workshopsPageDefaults } from "@/payload/seed/workshops-page-defaults";

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

    const listingCard =
      listingCardsFromGlobal(global).find((card) => card.slug === slug) ??
      mapListingCardsFromCMS(global).find((card) => card.slug === slug) ??
      null;

    const workshop =
      mapWorkshopDetailFromCMS(result.docs[0], slug, listingCard) ??
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
    const global = await payload.findGlobal({
      slug: "workshops-page",
      depth: 0,
    });

    const fromListing = listingCardsFromGlobal(global).map((card) => card.slug);
    if (fromListing.length > 0) return fromListing;

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

  return workshopsPageDefaults.workshops
    .filter((entry) => entry.published)
    .map((entry) => entry.slug);
}

export async function getWorkshopNavChildren(): Promise<
  { label: string; href: string }[]
> {
  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "workshops-page",
      depth: 0,
    });

    const fromListing = listingCardsFromGlobal(global).map((card) => ({
      label: card.navLabel,
      href: card.href,
    }));
    if (fromListing.length > 0) return fromListing;

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

  return workshopsPageDefaults.workshops
    .filter((entry) => entry.published)
    .map((entry) => ({
      label: entry.navLabel,
      href: entry.href,
    }));
}

/** Sync helper kept for call sites that already have a slug list. */
export function getWorkshopBySlugSync(
  slug: string,
): WorkshopDefinition | undefined {
  return mapWorkshopDetailFromDefaults(slug);
}
