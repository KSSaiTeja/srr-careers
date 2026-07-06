/**
 * Default content for global Site Settings (header, footer, contact, social,
 * navigation). Seeds the SiteSettings global on first run and acts as the
 * fallback when the CMS has no value. The shape mirrors the global's named
 * tabs. The logo image stays a bundled brand asset; everything else here is
 * editable in the admin.
 */
export const siteSettingsDefaults = {
  brand: {
    siteName: "SRR Careers",
    footerDescription:
      "A dedicated finishing school for SAP S/4 HANA FICO consultants. Live mentors, real client scenarios, lifetime career support.",
    header: {
      ctaLabel: "Book a Free Demo",
      ctaHref: "#demo-class",
    },
  },
  navigation: {
    items: [
      { label: "Home", href: "/", badge: false },
      { label: "Our Story", href: "/our-story", badge: false },
      {
        label: "Courses",
        href: "/courses",
        badge: false,
        children: [
          {
            label: "Consultant Level Training",
            href: "/courses/sap-fico-consultant-track",
          },
          {
            label: "End User Level Training",
            href: "/courses/sap-fico-end-user-track",
          },
        ],
      },
      { label: "Blog", href: "/blog", badge: false },
      { label: "What's New?", href: "/whats-new", badge: true },
    ],
  },
  contact: {
    phone: "+91 92861 23457",
    phoneHref: "tel:+919286123457",
    email: "suresh@srrcareers.in",
    emailHref: "mailto:suresh@srrcareers.in",
    whatsappNumber: "919286123457",
    whatsappLabel: "WhatsApp us",
    whatsappPrefillMessage:
      "Hi SRR Careers, I would like to know more about your SAP S/4 HANA FICO training.",
  },
  socialGroup: {
    social: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/srrcareers/?viewAsMember=true",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/suresh_srrcareers?igsh=MWRrcXg3cjJxNjBrZg==",
      },
      {
        platform: "whatsapp",
        label: "WhatsApp",
        href: "",
      },
    ],
  },
  footer: {
    exploreTitle: "Explore",
    exploreLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/our-story" },
      { label: "Course", href: "/courses" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#demo-class" },
    ],
    courseTitle: "SAP FI-CO with S/4 HANA",
    courseLinks: [
      { label: "SAP S/4Hana FICO", href: "/courses" },
      { label: "Consultant Track", href: "/courses/sap-fico-consultant-track" },
      { label: "End-User Track", href: "/courses/sap-fico-end-user-track" },
      { label: "Book a Free Demo", href: "#demo-class" },
    ],
    contactTitle: "Contact",
    copyright: "© 2026 SRR Careers. All rights reserved.",
    craftedText: "Crafted with care for future SAP consultants.",
  },
} as const;

export type SiteSettingsDefaults = typeof siteSettingsDefaults;
