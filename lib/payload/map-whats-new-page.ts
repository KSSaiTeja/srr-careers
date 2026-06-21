import type {
  UpdateBadgeVariant,
  UpdateCategory,
  WhatsNewPageContent,
  WhatsNewUpdate,
} from "@/lib/types/whats-new-page-content";
import type { WhatsNewPage } from "@/payload-types";
import { whatsNewPageDefaults } from "@/payload/seed/whats-new-page-defaults";

type RawUpdate = {
  pinned?: boolean | null;
  category?: string | null;
  badge?: string | null;
  badgeLabel?: string | null;
  timeAgo?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  id?: string | null;
};

const CATEGORIES: UpdateCategory[] = [
  "admissions",
  "curriculum",
  "placements",
  "notices",
  "events",
];

const BADGES: UpdateBadgeVariant[] = [
  "update",
  "update-navy",
  "notice",
  "alert",
];

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function asCategory(value: string | null | undefined): UpdateCategory {
  return value && CATEGORIES.includes(value as UpdateCategory)
    ? (value as UpdateCategory)
    : "events";
}

function asBadge(value: string | null | undefined): UpdateBadgeVariant {
  return value && BADGES.includes(value as UpdateBadgeVariant)
    ? (value as UpdateBadgeVariant)
    : "update";
}

function toLines(value: string | null | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function mapUpdate(raw: RawUpdate, index: number): WhatsNewUpdate {
  const label = raw.ctaLabel?.trim() ?? "";
  const href = raw.ctaHref?.trim() ?? "";
  const cta = label.length > 0 && href.length > 0 ? { label, href } : null;

  return {
    id: raw.id?.trim() || `update-${index}`,
    category: asCategory(raw.category),
    badge: asBadge(raw.badge),
    badgeLabel: text(raw.badgeLabel, "UPDATE"),
    timeAgo: text(raw.timeAgo, ""),
    title: text(raw.title, ""),
    description: toLines(raw.description),
    pinned: Boolean(raw.pinned),
    cta,
  };
}

export function mapWhatsNewPageFromCMS(
  global: WhatsNewPage | null | undefined,
): WhatsNewPageContent {
  const d = whatsNewPageDefaults;
  const cms: Partial<WhatsNewPage> = global ?? {};

  const cmsUpdates = cms.feed?.updates;
  const rawUpdates: RawUpdate[] =
    cmsUpdates && cmsUpdates.length > 0 ? cmsUpdates : [...d.feed.updates];

  return {
    pageTitle: text(cms.intro?.pageTitle, d.intro.pageTitle),
    updates: rawUpdates.map((raw, index) => mapUpdate(raw, index)),
    newsletter: {
      title: text(cms.newsletter?.title, d.newsletter.title),
      description: text(cms.newsletter?.description, d.newsletter.description),
      ctaLabel: text(cms.newsletter?.ctaLabel, d.newsletter.ctaLabel),
      ctaHref: text(cms.newsletter?.ctaHref, d.newsletter.ctaHref),
    },
  };
}
