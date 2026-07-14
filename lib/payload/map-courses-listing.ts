import type {
  CourseProgramCard,
  CoursesListingContent,
} from "@/lib/types/courses-listing-content";
import { coursesListingDefaults } from "@/payload/seed/courses-listing-defaults";

type CmsNavChild = {
  label?: string | null;
  href?: string | null;
};

type CmsProgram = {
  slug?: string | null;
  sortOrder?: number | null;
  published?: boolean | null;
  eyebrow?: string | null;
  title?: string | null;
  summary?: string | null;
  href?: string | null;
  durationLabel?: string | null;
  priceLabel?: string | null;
  navLabel?: string | null;
  isNavGroup?: boolean | null;
  navChildren?: CmsNavChild[] | null;
};

type CmsCoursesListing = {
  meta?: {
    title?: string | null;
    description?: string | null;
  } | null;
  intro?: {
    pageTitle?: string | null;
    headline?: string | null;
    subtext?: string | null;
  } | null;
  cards?: {
    durationPrefix?: string | null;
    pricePrefix?: string | null;
  } | null;
  programs?: CmsProgram[] | null;
  updatedAt?: string | null;
};

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function mapProgram(
  item: CmsProgram,
  fallback?: (typeof coursesListingDefaults.programs)[number],
): CourseProgramCard | null {
  const slug = text(item.slug, fallback?.slug ?? "");
  const title = text(item.title, fallback?.title ?? "");
  const href = text(item.href, fallback?.href ?? "");
  if (!slug || !title || !href) return null;

  const navChildren =
    item.navChildren && item.navChildren.length > 0
      ? item.navChildren
          .map((child) => ({
            label: text(child.label),
            href: text(child.href, "#"),
          }))
          .filter((child) => child.label && child.href)
      : (fallback?.navChildren ?? []).map((child) => ({ ...child }));

  return {
    slug,
    title,
    eyebrow: text(item.eyebrow, fallback?.eyebrow ?? "Programme"),
    summary: text(item.summary, fallback?.summary ?? ""),
    href,
    durationLabel: text(item.durationLabel) || fallback?.durationLabel,
    priceLabel: text(item.priceLabel) || fallback?.priceLabel,
    navLabel: text(item.navLabel, title),
    isNavGroup: item.isNavGroup ?? fallback?.isNavGroup ?? false,
    navChildren,
  };
}

function mapProgramFromDefaults(
  entry: (typeof coursesListingDefaults.programs)[number],
): CourseProgramCard {
  return {
    slug: entry.slug,
    title: entry.title,
    eyebrow: entry.eyebrow,
    summary: entry.summary,
    href: entry.href,
    durationLabel: entry.durationLabel,
    priceLabel: entry.priceLabel,
    navLabel: entry.navLabel,
    isNavGroup: entry.isNavGroup,
    navChildren: entry.navChildren.map((child) => ({ ...child })),
  };
}

export function mapCoursesListingFromCMS(
  global: CmsCoursesListing | null | undefined,
): CoursesListingContent {
  const d = coursesListingDefaults;
  const cms: CmsCoursesListing = global ?? {};

  const cmsItems = cms.programs;
  let programs: CourseProgramCard[];

  if (cmsItems && cmsItems.length > 0) {
    const bySlug = new Map(d.programs.map((p) => [p.slug, p]));
    programs = cmsItems
      .filter((item) => item.published !== false)
      .slice()
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((item) => mapProgram(item, bySlug.get(text(item.slug))))
      .filter((p): p is CourseProgramCard => Boolean(p));
  } else {
    programs = d.programs
      .filter((p) => p.published)
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(mapProgramFromDefaults);
  }

  if (programs.length === 0) {
    programs = d.programs
      .filter((p) => p.published)
      .map(mapProgramFromDefaults);
  }

  return {
    meta: {
      title: text(cms.meta?.title, d.meta.title),
      description: text(cms.meta?.description, d.meta.description),
    },
    intro: {
      pageTitle: text(cms.intro?.pageTitle, d.intro.pageTitle),
      headline: text(cms.intro?.headline, d.intro.headline),
      subtext: text(cms.intro?.subtext, d.intro.subtext),
    },
    cards: {
      durationPrefix: text(cms.cards?.durationPrefix, d.cards.durationPrefix),
      pricePrefix: text(cms.cards?.pricePrefix, d.cards.pricePrefix),
    },
    programs,
  };
}
