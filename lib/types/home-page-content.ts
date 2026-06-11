import type { IconName } from "@/components/ui/icon";

export type HomeCta = {
  label: string;
  href: string;
};

export type HomePageContent = {
  hero: {
    badge: string;
    titleLine1: string;
    titleAccent: string;
    primaryCta: HomeCta;
    secondaryCta: HomeCta;
    imageUrl: string;
    imageAlt: string;
  };
  problem: {
    headingGray: string;
    headingNavy: string;
    items: { icon: IconName; text: string }[];
  };
  mission: {
    eyebrow: string;
    headingGray: string;
    headingNavy: string;
    roiCard: {
      label: string;
      value: string;
      suffix?: string;
      description: string;
      partnersLabel: string;
    };
    placementCardTop: {
      label: string;
      value: string;
      suffix?: string;
      description: string;
    };
    alumniCard: {
      body: string;
      rating: string;
      ratingSuffix: string;
      trustedBy: string;
    };
    placementCardBottom: {
      label: string;
      value: string;
      suffix?: string;
      description: string;
    };
    practiceCard: {
      label: string;
      value: string;
      description: string;
    };
  };
  instructor: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    photoUrl: string;
    journeyHeading: string;
    journeyBody: string;
    skillsHeading: string;
    skillsBody: string;
    featuresLeft: { title: string; description: string }[];
    featuresRight: { title: string; description: string }[];
  };
  curriculum: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    titleLine2Suffix: string;
    modules: { num: string; title: string; desc: string }[];
    ctaEyebrow: string;
    ctaTitle: string;
    cta: HomeCta;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    items: {
      name: string;
      role: string;
      initials: string;
      quote: string;
    }[];
  };
  preFooter: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    phoneButtonLabel: string;
    emailButtonLabel: string;
  };
};
