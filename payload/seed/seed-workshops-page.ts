import type { Payload } from "payload";
import { workshopsPageDefaults } from "./workshops-page-defaults";

type DetailDoc = {
  slug?: string | null;
  sortOrder?: number | null;
  published?: boolean | null;
  navLabel?: string | null;
  card?: {
    eyebrow?: string | null;
    title?: string | null;
    summary?: string | null;
    durationBaseline?: string | null;
  } | null;
};

function cardFromDetail(doc: DetailDoc) {
  const slug = doc.slug?.trim();
  const title = doc.card?.title?.trim();
  if (!slug || !title) return null;

  const durationBaseline = doc.card?.durationBaseline?.trim();

  return {
    slug,
    sortOrder: doc.sortOrder ?? 0,
    published: doc.published !== false,
    navLabel: doc.navLabel?.trim() || title,
    eyebrow: doc.card?.eyebrow?.trim() || "Workshop",
    title,
    href: `/workshops/${slug}`,
    summary: doc.card?.summary?.trim() || "",
    durationLabel: workshopsPageDefaults.shared.durationLabel,
    priceLabel: workshopsPageDefaults.shared.pricingLabel,
    ...(durationBaseline ? { durationBaseline } : {}),
  };
}

/** Build Workshops Listing cards from existing Workshop Detail Pages. */
export async function cardsFromWorkshopDetails(payload: Payload) {
  const result = await payload.find({
    collection: "workshop-details",
    limit: 100,
    depth: 0,
    pagination: false,
    sort: "sortOrder",
  });

  const fromDetails = result.docs
    .map((doc) => cardFromDetail(doc as DetailDoc))
    .filter(Boolean);

  if (fromDetails.length > 0) return fromDetails;

  return workshopsPageDefaults.workshops;
}

export async function seedWorkshopsPage(payload: Payload): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: "workshops-page",
      depth: 0,
    });

    const workshops = existing?.workshops;
    const hasWorkshops = Array.isArray(workshops) && workshops.length > 0;

    // Fresh global (never saved): seed everything, preferring live detail docs.
    if (!existing?.updatedAt) {
      const cards = await cardsFromWorkshopDetails(payload);
      await payload.updateGlobal({
        slug: "workshops-page",
        data: {
          ...workshopsPageDefaults,
          workshops: cards,
        } as Record<string, unknown>,
      });
      payload.logger.info("Workshops Listing content seeded with default copy.");
      return;
    }

    // Existing global with empty cards: fill from Workshop Detail Pages
    // (or defaults), without overwriting intro/SEO/chrome edits.
    if (!hasWorkshops) {
      const cards = await cardsFromWorkshopDetails(payload);
      await payload.updateGlobal({
        slug: "workshops-page",
        data: {
          workshops: cards,
        } as Record<string, unknown>,
      });
      payload.logger.info(
        `Workshops Listing cards synced from Workshop Detail Pages (${cards.length}).`,
      );
    }
  } catch (error) {
    payload.logger.warn(
      { err: error },
      "Workshops Listing seed skipped (database may not be ready yet). Run: npx payload migrate",
    );
  }
}
