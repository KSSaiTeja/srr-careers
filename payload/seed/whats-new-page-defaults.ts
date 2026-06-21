/**
 * Default content for the What's New page. Used to seed the Payload global on
 * first run and as the fallback when the CMS has no value yet. The shape mirrors
 * the WhatsNewPage global's named tabs (intro / feed / newsletter); description
 * is a multiline string and the CTA is a pair of optional text fields. The
 * mapper normalises these into render-ready content.
 */
export const whatsNewPageDefaults = {
  intro: {
    pageTitle: "What's Happening at SRR",
  },
  feed: {
    updates: [
      {
        pinned: true,
        category: "events",
        badge: "update",
        badgeLabel: "UPDATE",
        timeAgo: "1 MONTH AGO",
        title: "Free masterclass: Month-end close in S/4 HANA",
        description:
          "Join Senior Consultant Ravi Menon for a 90-minute live walkthrough on June 8, 7:00 PM IST.\nQ&A included.",
        ctaLabel: "Register Now",
        ctaHref: "#pre-footer",
      },
      {
        pinned: false,
        category: "notices",
        badge: "notice",
        badgeLabel: "NOTICE",
        timeAgo: "2 DAYS AGO",
        title: "Scheduled lab maintenance - SAP GUI Sandbox",
        description:
          "Our practice sandbox will be unavailable on May 31 from 02:00-05:00 IST for an S/4 HANA\npatch upgrade. Plan your assignments accordingly.",
        ctaLabel: "",
        ctaHref: "",
      },
      {
        pinned: false,
        category: "curriculum",
        badge: "update-navy",
        badgeLabel: "UPDATE",
        timeAgo: "1 WEEK AGO",
        title: "Curriculum refresh: GST e-Invoicing & Phase-2 TDS rules",
        description:
          "The Taxation module now covers the latest IRP integration patterns and revised TDS\nthresholds effective FY 2026-27.",
        ctaLabel: "",
        ctaHref: "",
      },
      {
        pinned: false,
        category: "notices",
        badge: "alert",
        badgeLabel: "ALERT",
        timeAgo: "3 DAYS AGO",
        title: "New security protocols for data access",
        description:
          "All users must adhere to the updated security measures by June 5 to ensure data integrity.",
        ctaLabel: "",
        ctaHref: "",
      },
    ],
  },
  newsletter: {
    title: "Stay in the loop",
    description:
      "One email when something actually matters. No drip campaigns, no fluff — just pure career intelligence.",
    ctaLabel: "Subscribe",
    ctaHref: "mailto:suresh@srrcareers.in?subject=SRR%20Careers%20newsletter",
  },
} as const;

export type WhatsNewPageDefaults = typeof whatsNewPageDefaults;
