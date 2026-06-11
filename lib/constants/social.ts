import { getWhatsAppHref } from "@/lib/constants/site-contact";

export type SocialPlatform = "linkedin" | "instagram" | "whatsapp";

export type SocialProfile = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

/** Update hrefs when official profiles are available. */
export const socialProfiles: SocialProfile[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/srr-careers",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/srrcareers",
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href: getWhatsAppHref(),
  },
];
