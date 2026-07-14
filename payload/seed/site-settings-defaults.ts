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
    topStrip: {
      enabled: true,
      label: "Registered with MSME",
    },
    header: {
      ctaLabel: "Book a Free Demo",
      ctaHref: "/#demo-class",
      secondaryCtaLabel: "Join our team",
      secondaryCtaHref: "/join-our-team",
    },
  },
  navigation: {
    items: [
      { label: "Home", href: "/", badge: false },
      { label: "Our Story", href: "/our-story", badge: false },
      { label: "Our Team", href: "/our-team", badge: false },
      {
        label: "Courses",
        href: "/courses",
        badge: false,
        // Nested SAP group is applied in mapSiteSettingsFromCMS via
        // `coursesNavChildren` (Payload children stay flat label/href pairs).
        children: [
          {
            label: "Consultant Track",
            href: "/courses/sap-fico-consultant-track",
          },
          {
            label: "End User Track",
            href: "/courses/sap-fico-end-user-track",
          },
          {
            label: "Advanced Excel",
            href: "/courses/advanced-excel",
          },
        ],
      },
      {
        label: "Workshops",
        href: "/workshops",
        badge: false,
        // Full list applied in mapSiteSettingsFromCMS via `workshopsNavChildren`.
        children: [
          {
            label: "Career Pathways and Success Strategies",
            href: "/workshops/career-pathways-and-success-strategies",
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
      { label: "Our Team", href: "/our-team" },
      { label: "Course", href: "/courses" },
      { label: "Blog", href: "/blog" },
      { label: "Internships", href: "/internships" },
      { label: "Join our team", href: "/join-our-team" },
      { label: "Contact", href: "/#demo-class" },
    ],
    courseTitle: "SAP FI-CO with S/4 HANA",
    courseLinks: [
      { label: "Consultant Track", href: "/courses/sap-fico-consultant-track" },
      { label: "End-User Track", href: "/courses/sap-fico-end-user-track" },
      { label: "Advanced Excel", href: "/courses/advanced-excel" },
      {
        label: "Campus Recruitment Training",
        href: "/courses/campus-recruitment-training",
      },
      { label: "All Workshops", href: "/workshops" },
      { label: "Book a Free Demo", href: "/#demo-class" },
    ],
    contactTitle: "Contact",
    copyright: "© 2026 SRR Careers. All rights reserved.",
    craftedText:
      "MSME-registered institute · Udyam No. UDYAM-TS-02-0353884",
    showMsmeLogo: true,
    msmeBadgeLabel: "Registered with MSME",
  },
} as const;

export type SiteSettingsDefaults = typeof siteSettingsDefaults;
