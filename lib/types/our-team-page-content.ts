export type TeamMember = {
  id: string;
  name: string;
  credential: string;
  /** Resolved URL — CMS upload, or public fallback path. Empty → gradient. */
  imageSrc: string;
  placeholderGradient: string;
  bio: string[];
  workshops: string[];
};

export type OurTeamPageContent = {
  intro: {
    pageTitle: string;
    headline: string;
    subtext: string;
  };
  viewProfileLabel: string;
  workshopsHeading: string;
  members: TeamMember[];
};
