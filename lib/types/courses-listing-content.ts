export type CourseProgramCard = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  href: string;
  durationLabel?: string;
  priceLabel?: string;
  navLabel: string;
  /** When true, nav shows this as a group with nested track links. */
  isNavGroup: boolean;
  navChildren: { label: string; href: string }[];
};

export type CoursesListingContent = {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    pageTitle: string;
    headline: string;
    subtext: string;
  };
  cards: {
    durationPrefix: string;
    pricePrefix: string;
  };
  programs: CourseProgramCard[];
};
