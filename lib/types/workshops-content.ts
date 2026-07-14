export type WorkshopModule = {
  title: string;
  duration?: string;
};

export type WorkshopSession = {
  label: string;
  time?: string;
  modules: WorkshopModule[];
};

export type WorkshopFormat = {
  id: string;
  title: string;
  duration: string;
  note?: string;
  audience?: string;
  modules: WorkshopModule[];
};

export type WorkshopAgendaLayout = "modules" | "sessions" | "formats" | "none";

/** Card + detail content for one workshop programme. */
export type WorkshopDefinition = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  navLabel: string;
  /** When set, render the existing course-detail experience for this slug. */
  courseDetailSlug?: string;
  highlights: string[];
  /** Sample / baseline length from the source agenda — not a fixed quote. */
  durationBaseline?: string;
  audience?: string;
  mode?: string;
  speaker?: string;
  agendaLayout: WorkshopAgendaLayout;
  modules?: WorkshopModule[];
  sessions?: WorkshopSession[];
  formats?: WorkshopFormat[];
  meta: {
    title: string;
    description: string;
  };
};

export type WorkshopsSharedChrome = {
  durationLabel: string;
  pricingLabel: string;
  durationNote: string;
  pricingNote: string;
  cards: {
    durationPrefix: string;
    pricePrefix: string;
    samplePrefix: string;
  };
  detail: {
    metaDurationLabel: string;
    metaPriceLabel: string;
    metaModeLabel: string;
    metaAudienceLabel: string;
    metaSpeakerLabel: string;
    pricingEyebrow: string;
    pricingHeadline: string;
    sampleAgendaPrefix: string;
    highlightsHeading: string;
    agendaEyebrow: string;
    agendaTitleModules: string;
    agendaTitleSessions: string;
    agendaTitleFormats: string;
    formatAudienceLabel: string;
    backCtaLabel: string;
    backCtaHref: string;
  };
};

export type WorkshopsPageContent = {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    pageTitle: string;
    headline: string;
    subtext: string;
  };
  shared: WorkshopsSharedChrome;
  workshops: WorkshopDefinition[];
};

export type WorkshopDetailPageContent = {
  workshop: WorkshopDefinition;
  shared: WorkshopsSharedChrome;
};
