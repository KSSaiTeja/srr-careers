import { coursesNavChildren as defaultCoursesNavChildren } from "@/lib/constants/courses-nav";
import { workshopsNavChildren as defaultWorkshopsNavChildren } from "@/lib/constants/workshops-nav";
import type { SocialPlatform } from "@/lib/constants/social";
import type {
  NavChildLink,
  NavLink,
  SiteSettingsContent,
  SocialLink,
} from "@/lib/types/site-settings-content";
import type { SiteSetting } from "@/payload-types";
import { siteSettingsDefaults } from "@/payload/seed/site-settings-defaults";

function mapNavChild(child: {
  label?: string | null;
  href?: string | null;
  isGroup?: boolean | null;
  nestedChildren?:
    | {
        label?: string | null;
        href?: string | null;
      }[]
    | null;
  children?:
    | {
        label?: string | null;
        href?: string | null;
      }[]
    | null;
}): NavChildLink {
  const label = text(child.label);
  const href = text(child.href, "#");
  const rawNested = child.nestedChildren ?? child.children;
  const nested =
    rawNested && rawNested.length > 0
      ? rawNested
          .map((sub) => ({
            label: text(sub.label),
            href: text(sub.href, "#"),
          }))
          .filter((sub) => sub.label)
      : undefined;

  const isGroup = Boolean(child.isGroup && nested && nested.length > 0);

  return {
    label,
    href,
    ...(isGroup ? { isGroup: true, children: nested } : {}),
    ...(!isGroup && nested && nested.length > 0 ? { children: nested } : {}),
  };
}

function withCoursesNavItem(
  items: NavLink[],
  coursesChildren: NavChildLink[],
): NavLink[] {
  return items.map((item) =>
    item.href === "/courses"
      ? { ...item, children: coursesChildren }
      : item,
  );
}

function withWorkshopsNavItem(
  items: NavLink[],
  workshopsChildren: NavChildLink[],
): NavLink[] {
  if (items.some((item) => item.href === "/workshops")) {
    return items.map((item) =>
      item.href === "/workshops"
        ? { ...item, children: workshopsChildren }
        : item,
    );
  }
  const coursesIdx = items.findIndex((item) => item.href === "/courses");
  const insertAt = coursesIdx >= 0 ? coursesIdx + 1 : items.length;
  return [
    ...items.slice(0, insertAt),
    {
      label: "Workshops",
      href: "/workshops",
      badge: false,
      children: workshopsChildren,
    },
    ...items.slice(insertAt),
  ];
}

function withOurTeamNavItem(items: NavLink[]): NavLink[] {
  if (items.some((item) => item.href === "/our-team")) return items;
  const storyIdx = items.findIndex((item) => item.href === "/our-story");
  const insertAt = storyIdx >= 0 ? storyIdx + 1 : 1;
  return [
    ...items.slice(0, insertAt),
    { label: "Our Team", href: "/our-team", badge: false },
    ...items.slice(insertAt),
  ];
}

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
  options?: {
    workshopsNavChildren?: NavChildLink[];
    coursesNavChildren?: NavChildLink[];
  },
): SiteSettingsContent {
  const d = siteSettingsDefaults;
  const cms: Partial<SiteSetting> = global ?? {};
  const workshopsChildren =
    options?.workshopsNavChildren && options.workshopsNavChildren.length > 0
      ? options.workshopsNavChildren
      : defaultWorkshopsNavChildren;
  const coursesChildren =
    options?.coursesNavChildren && options.coursesNavChildren.length > 0
      ? options.coursesNavChildren
      : defaultCoursesNavChildren;

  const cmsNav = cms.navigation?.items;
  const nav: NavLink[] = withWorkshopsNavItem(
    withOurTeamNavItem(
      withCoursesNavItem(
        cmsNav && cmsNav.length > 0
          ? cmsNav.map((item) => {
              const cmsChildren = item.children;
              const children =
                cmsChildren && cmsChildren.length > 0
                  ? cmsChildren.map((child) => mapNavChild(child))
                  : undefined;
              return {
                label: text(item.label),
                href: text(item.href, "#"),
                badge: Boolean(item.badge),
                ...(children && children.length > 0 ? { children } : {}),
              };
            })
          : d.navigation.items.map((item) => {
              const fallbackChildren = (
                "children" in item ? item.children : undefined
              ) as ReadonlyArray<NavChildLink> | undefined;
              return {
                label: item.label,
                href: item.href,
                badge: item.badge,
                ...(fallbackChildren && fallbackChildren.length > 0
                  ? {
                      children: fallbackChildren.map((child) =>
                        mapNavChild(child),
                      ),
                    }
                  : {}),
              };
            }),
        coursesChildren,
      ),
    ),
    workshopsChildren,
  );

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
  const exploreLinks = (
    cmsExplore && cmsExplore.length > 0
      ? cmsExplore.map((l) => ({ label: text(l.label), href: text(l.href, "#") }))
      : d.footer.exploreLinks.map((l) => ({ ...l }))
  ).map((link) =>
    link.href === "#demo-class" ? { ...link, href: "/#demo-class" } : link,
  );

  const cmsCourse = cms.footer?.courseLinks;
  const courseLinks = (
    cmsCourse && cmsCourse.length > 0
      ? cmsCourse.map((l) => ({ label: text(l.label), href: text(l.href, "#") }))
      : d.footer.courseLinks.map((l) => ({ ...l }))
  ).map((link) => {
    if (
      link.href === "/courses/campus-free-training" ||
      link.href === "/workshops/campus-recruitment-training" ||
      link.label === "Campus Free Training" ||
      link.label === "Campus Recruitment Training"
    ) {
      return {
        label: "Campus Recruitment Training",
        href: "/courses/campus-recruitment-training",
      };
    }
    if (link.href === "#demo-class") {
      return { ...link, href: "/#demo-class" };
    }
    return link;
  });

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
      ctaHref: (() => {
        const href = text(cms.brand?.header?.ctaHref, d.brand.header.ctaHref);
        // Always send the primary "Book a Demo" CTA to the home demo section.
        return href === "#demo-class" ? "/#demo-class" : href;
      })(),
      secondaryCtaLabel: d.brand.header.secondaryCtaLabel,
      secondaryCtaHref: d.brand.header.secondaryCtaHref,
    },
    topStrip: {
      enabled: cms.brand?.topStrip?.enabled ?? d.brand.topStrip.enabled,
      label: text(cms.brand?.topStrip?.label, d.brand.topStrip.label),
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
      showMsmeLogo: cms.footer?.showMsmeLogo ?? d.footer.showMsmeLogo,
      msmeBadgeLabel: text(
        cms.footer?.msmeBadgeLabel,
        d.footer.msmeBadgeLabel,
      ),
    },
  };
}
