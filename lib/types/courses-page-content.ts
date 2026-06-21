export type CourseOfferingVariant = "consultant" | "end-user";

export type CourseOffering = {
  id: string;
  slug: string;
  title: string;
  description: string;
  variant: CourseOfferingVariant;
  duration: string;
  durationSuffix: string;
  modules: string;
  outcome: string;
  highlights: string[];
  price: number;
  originalPrice?: number;
  ctaLabel: string;
  ctaHref: string;
};

export type TrackBadgeVariant = "consultant" | "end-user";

export type TrackCard = {
  id: string;
  badge: string;
  badgeVariant: TrackBadgeVariant;
  personaPrefix: string;
  persona: string;
  personaDescription: string;
  image: string;
  imageAlt: string;
  workLabel: string;
  workItems: string[];
  toolsLabel: string;
  tools: string[];
  outcomeLabel: string;
  outcome: string;
  tags: string[];
};

export type CoursesFaqItem = {
  question: string;
  answer: string;
};

export type CoursesPageContent = {
  intro: {
    pageTitle: string;
    headline: string;
    headlineHighlight: string;
    subtext: string;
  };
  offerings: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    courses: CourseOffering[];
  };
  learningApproach: {
    title: string;
    titleHighlight: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    stats: {
      maxSeats: { value: string; label: string; description: string };
      mentorLed: { title: string; description: string };
      rating: { value: string; suffix: string };
    };
  };
  trackComparison: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    signpostImage: string;
    tracks: TrackCard[];
  };
  faq: {
    eyebrow: string;
    title: string;
    highlight: string;
    helperText: string;
    askLinkLabel: string;
    askLinkHref: string;
    items: CoursesFaqItem[];
  };
};
