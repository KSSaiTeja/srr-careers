export type OurStoryIconName =
  | "users"
  | "file-badge"
  | "building-2"
  | "medal"
  | "heart"
  | "target"
  | "award"
  | "graduation-cap";

export type OurStoryMetric = {
  value: string;
  label: string;
  icon: OurStoryIconName;
};

export type OurStoryPrinciple = {
  description: string;
  icon: OurStoryIconName;
  featured: boolean;
};

export type OurStoryExcellencePillar = {
  num: string;
  title: string;
  description: string;
};

export type OurStoryFaqItem = {
  question: string;
  answer: string;
};

export type OurStoryPageContent = {
  intro: {
    pageTitle: string;
    headline: string;
    headlineHighlight: string;
    headlineSuffix: string;
    subtext: string;
    metrics: OurStoryMetric[];
  };
  values: {
    title: string;
    titleLine2: string;
    intro: string;
    principles: OurStoryPrinciple[];
  };
  excellence: {
    title: string;
    highlight: string;
    pillars: OurStoryExcellencePillar[];
  };
  faq: {
    eyebrow: string;
    title: string;
    highlight: string;
    helperText: string;
    askLinkLabel: string;
    askLinkHref: string;
    items: OurStoryFaqItem[];
  };
};
