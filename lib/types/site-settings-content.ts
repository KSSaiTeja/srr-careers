import type { SocialPlatform } from "@/lib/constants/social";

export type NavChildLink = {
  label: string;
  href: string;
  /** Non-clickable parent that reveals nested links on hover / expand. */
  isGroup?: boolean;
  children?: NavChildLink[];
};

export type NavLink = {
  label: string;
  href: string;
  badge: boolean;
  children?: NavChildLink[];
};

export type FooterLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type SiteSettingsContent = {
  brand: {
    siteName: string;
    footerDescription: string;
  };
  header: {
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  nav: NavLink[];
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    whatsappNumber: string;
    whatsappLabel: string;
    whatsappPrefillMessage: string;
    whatsappHref: string;
  };
  social: SocialLink[];
  footer: {
    exploreTitle: string;
    exploreLinks: FooterLink[];
    courseTitle: string;
    courseLinks: FooterLink[];
    contactTitle: string;
    copyright: string;
    craftedText: string;
  };
};
