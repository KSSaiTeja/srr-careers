import type { SocialPlatform } from "@/lib/constants/social";

export type NavLink = {
  label: string;
  href: string;
  badge: boolean;
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
