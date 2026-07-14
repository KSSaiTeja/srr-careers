export const COURSE_DETAIL_SLUGS = [
  "sap-fico-consultant-track",
  "sap-fico-end-user-track",
  "advanced-excel",
  "campus-recruitment-training",
] as const;

export type CourseDetailSlug = (typeof COURSE_DETAIL_SLUGS)[number];

/** Courses presented as workshops — no on-page demo form; CTAs go home. */
export const WORKSHOP_STYLE_COURSE_SLUGS = ["advanced-excel"] as const;

export function isWorkshopStyleCourse(slug: string): boolean {
  return (WORKSHOP_STYLE_COURSE_SLUGS as readonly string[]).includes(slug);
}

export type CourseDetailMetaCard = {
  icon: "duration" | "modules" | "format" | "outcome";
  label: string;
  value: string;
  valueSuffix?: string;
};

export type SyllabusItem = {
  id: string;
  number: string;
  title: string;
  description?: string;
  topics: string[];
};

export type CourseDetailFaq = {
  eyebrow: string;
  title: string;
  highlight: string;
  helperText: string;
  askLinkLabel: string;
  askLinkHref: string;
  items: { question: string; answer: string }[];
};

export type CourseDetailContent = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  intro: {
    pageTitle: string;
    headline: string;
    headlineHighlight: string;
    subtext?: string;
  };
  overview: {
    description: string;
    price: number;
    originalPrice?: number;
    primaryCta: string;
    secondaryCta: string;
    secondaryCtaHref: string;
    moduleCount: string;
    moduleLabel: string;
    moduleBlurb: string;
    metaCards: CourseDetailMetaCard[];
  };
  whoIsItFor: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    audience: string[];
    handsOnTitle: string;
    handsOnDescription: string;
    handsOnFeatures: string[];
  };
  syllabus: {
    eyebrow: string;
    title: string;
    notice?: {
      text: string;
      highlight?: string;
    };
    items: SyllabusItem[];
  };
  alsoOffered: {
    eyebrow: string;
    title: string;
    href: string;
    ctaLabel: string;
  };
  limitedSeatsCta: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  faq: CourseDetailFaq;
};

export function getCourseDetailPath(slug: string): string {
  return `/courses/${slug}`;
}
