import type { SocialPlatform } from "@/lib/constants/social";
import type {
  NavLink,
  SiteSettingsContent,
  SocialLink,
} from "@/lib/types/site-settings-content";
import type { SiteSetting } from "@/payload-types";
import { siteSettingsDefaults } from "@/payload/seed/site-settings-defaults";

const SOCIAL_PLATFORMS: SocialPlatform[] = ["linkedin", "instagram", "whatsapp"];

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function asPlatform(value: string | null | undefined): SocialPlatform {
  return SOCIAL_PLATFORMS.includes(value as SocialPlatform)
    ? (value as SocialPlatform)
    : "whatsapp";
}

export function buildWhatsAppHref(
  number: string,
  message: string,
): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mapSiteSettingsFromCMS(
  global: SiteSetting | null | undefined,
): SiteSettingsContent {
  const d = siteSettingsDefaults;
  const cms: Partial<SiteSetting> = global ?? {};

  const cmsNav = cms.navigation?.items;
  const nav: NavLink[] =
    cmsNav && cmsNav.length > 0
      ? cmsNav.map((item) => ({
          label: text(item.label),
          href: text(item.href, "#"),
          badge: Boolean(item.badge),
        }))
      : d.navigation.items.map((item) => ({ ...item }));

  const phone = text(cms.contact?.phone, d.contact.phone);
  const email = text(cms.contact?.email, d.contact.email);
  const phoneHref =
    text(cms.contact?.phoneHref) || `tel:${phone.replace(/[^\d+]/g, "")}`;
  const emailHref = text(cms.contact?.emailHref) || `mailto:${email}`;
  const whatsappNumber = text(
    cms.contact?.whatsappNumber,
    d.contact.whatsappNumber,
  );
  const whatsappPrefillMessage = text(
    cms.contact?.whatsappPrefillMessage,
    d.contact.whatsappPrefillMessage,
  );
  const whatsappHref = buildWhatsAppHref(whatsappNumber, whatsappPrefillMessage);

  const cmsSocial = cms.socialGroup?.social;
  const social: SocialLink[] = (
    cmsSocial && cmsSocial.length > 0
      ? cmsSocial.map((item) => {
          const platform = asPlatform(item.platform);
          return {
            platform,
            label: text(item.label, platform),
            href: text(item.href) || (platform === "whatsapp" ? whatsappHref : "#"),
          };
        })
      : d.socialGroup.social.map((item) => ({
          platform: item.platform as SocialPlatform,
          label: item.label,
          href:
            item.href || (item.platform === "whatsapp" ? whatsappHref : "#"),
        }))
  );

  const cmsExplore = cms.footer?.exploreLinks;
  const exploreLinks =
    cmsExplore && cmsExplore.length > 0
      ? cmsExplore.map((l) => ({ label: text(l.label), href: text(l.href, "#") }))
      : d.footer.exploreLinks.map((l) => ({ ...l }));

  const cmsCourse = cms.footer?.courseLinks;
  const courseLinks =
    cmsCourse && cmsCourse.length > 0
      ? cmsCourse.map((l) => ({ label: text(l.label), href: text(l.href, "#") }))
      : d.footer.courseLinks.map((l) => ({ ...l }));

  return {
    brand: {
      siteName: text(cms.brand?.siteName, d.brand.siteName),
      footerDescription: text(
        cms.brand?.footerDescription,
        d.brand.footerDescription,
      ),
    },
    header: {
      ctaLabel: text(cms.brand?.header?.ctaLabel, d.brand.header.ctaLabel),
      ctaHref: text(cms.brand?.header?.ctaHref, d.brand.header.ctaHref),
    },
    nav,
    contact: {
      phone,
      phoneHref,
      email,
      emailHref,
      whatsappNumber,
      whatsappLabel: text(cms.contact?.whatsappLabel, d.contact.whatsappLabel),
      whatsappPrefillMessage,
      whatsappHref,
    },
    social,
    footer: {
      exploreTitle: text(cms.footer?.exploreTitle, d.footer.exploreTitle),
      exploreLinks,
      courseTitle: text(cms.footer?.courseTitle, d.footer.courseTitle),
      courseLinks,
      contactTitle: text(cms.footer?.contactTitle, d.footer.contactTitle),
      copyright: text(cms.footer?.copyright, d.footer.copyright),
      craftedText: text(cms.footer?.craftedText, d.footer.craftedText),
    },
  };
}
