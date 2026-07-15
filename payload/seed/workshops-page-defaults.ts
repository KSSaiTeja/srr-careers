import { workshopDetailsDefaults } from "./workshop-details-defaults";

/**
 * Default content for the Workshops Listing global. Seeds on first run and
 * acts as fallback when CMS values are empty. Also supplies shared chrome for
 * every workshop detail page. Catalogue cards are edited here (like Courses
 * Listing programmes).
 */
export const workshopsPageDefaults = {
  meta: {
    title: "Workshops | SRR Careers",
    description:
      "Campus and corporate workshops from SRR Careers — career pathways, skills blueprint, resume & interview prep, GST, and personal finance. Duration and pricing are customisable.",
  },
  intro: {
    pageTitle: "Workshops",
    headline: "Practical programmes for campuses and teams",
    subtext:
      "Careers, skills, placements, GST, and personal finance — delivered by practitioners. Duration and pricing are both {{duration}} for your institution or batch.",
  },
  shared: {
    durationLabel: "Customisable",
    pricingLabel: "Customisable",
    durationNote:
      "Sample agenda below — length can be tailored to your institution or batch.",
    pricingNote: "Fees tailored to campus or corporate batch size.",
  },
  cards: {
    durationPrefix: "Duration:",
    pricePrefix: "Price:",
    samplePrefix: "· sample",
  },
  workshops: workshopDetailsDefaults.map((entry) => ({
    slug: entry.slug,
    sortOrder: entry.sortOrder,
    published: entry.published,
    navLabel: entry.navLabel,
    eyebrow: entry.card.eyebrow,
    title: entry.card.title,
    href: `/workshops/${entry.slug}`,
    summary: entry.card.summary,
    durationLabel: "Customisable",
    priceLabel: "Customisable",
    ...(entry.card.durationBaseline
      ? { durationBaseline: entry.card.durationBaseline }
      : {}),
  })),
  detail: {
    metaDurationLabel: "Duration",
    metaPriceLabel: "Price",
    metaModeLabel: "Mode",
    metaAudienceLabel: "Audience",
    metaSpeakerLabel: "Speaker",
    pricingEyebrow: "Duration & pricing",
    pricingHeadline: "Both customisable",
    sampleAgendaPrefix: "Sample agenda:",
    highlightsHeading: "What you'll take away",
    agendaEyebrow: "Agenda",
    agendaTitleModules: "Session modules",
    agendaTitleSessions: "One-day programme flow",
    agendaTitleFormats: "Choose a format",
    formatAudienceLabel: "Audience:",
    backCtaLabel: "All workshops",
    backCtaHref: "/workshops",
  },
};

export type WorkshopsPageDefaults = typeof workshopsPageDefaults;
