/** Figma node 90:1781 — What's New Page Design Draft */

export type UpdateFilterCategory =
  | "all"
  | "admissions"
  | "curriculum"
  | "placements"
  | "notices"
  | "events";

export type UpdateBadgeVariant = "update" | "notice" | "alert" | "update-navy";

export const categoryFilters: ReadonlyArray<{
  id: UpdateFilterCategory;
  label: string;
}> = [
  { id: "all", label: "ALL UPDATES" },
  { id: "admissions", label: "ADMISSIONS" },
  { id: "curriculum", label: "CURRICULUM" },
  { id: "placements", label: "PLACEMENTS" },
  { id: "notices", label: "NOTICES" },
  { id: "events", label: "EVENTS" },
] as const;

export const whatsNewPageIntro = {
  pageTitle: "What's Happening at SRR",
} as const;

export const pinnedUpdate = {
  category: "events" as const,
  badge: "update" as const,
  title: "Free masterclass: Month-end close in S/4 HANA",
  description: [
    "Join Senior Consultant Ravi Menon for a 90-minute live walkthrough on June 8, 7:00 PM IST.",
    "Q&A included.",
  ],
  ctaLabel: "Register Now",
  ctaHref: "#pre-footer",
} as const;

export type WhatsNewUpdate = {
  id: string;
  category: Exclude<UpdateFilterCategory, "all">;
  badge: UpdateBadgeVariant;
  badgeLabel: string;
  timeAgo: string;
  title: string;
  description: string[];
};

export const updates: WhatsNewUpdate[] = [
  {
    id: "masterclass-listing",
    category: "events",
    badge: "update",
    badgeLabel: "UPDATE",
    timeAgo: "1 MONTH AGO",
    title: "Free masterclass: Month-end close in S/4 HANA",
    description: [
      "Join Senior Consultant Ravi Menon for a 90-minute live walkthrough on June 8, 7:00 PM IST.",
      "Q&A included.",
    ],
  },
  {
    id: "lab-maintenance",
    category: "notices",
    badge: "notice",
    badgeLabel: "NOTICE",
    timeAgo: "2 DAYS AGO",
    title: "Scheduled lab maintenance - SAP GUI Sandbox",
    description: [
      "Our practice sandbox will be unavailable on May 31 from 02:00-05:00 IST for an S/4 HANA",
      "patch upgrade. Plan your assignments accordingly.",
    ],
  },
  {
    id: "curriculum-refresh",
    category: "curriculum",
    badge: "update-navy",
    badgeLabel: "UPDATE",
    timeAgo: "1 WEEK AGO",
    title: "Curriculum refresh: GST e-Invoicing & Phase-2 TDS rules",
    description: [
      "The Taxation module now covers the latest IRP integration patterns and revised TDS",
      "thresholds effective FY 2026-27.",
    ],
  },
  {
    id: "security-protocols",
    category: "notices",
    badge: "alert",
    badgeLabel: "ALERT",
    timeAgo: "3 DAYS AGO",
    title: "New security protocols for data access",
    description: [
      "All users must adhere to the updated security measures by June 5 to ensure data integrity.",
    ],
  },
];

export const newsletterSection = {
  title: "Stay in the loop",
  description:
    "One email when something actually matters. No drip campaigns, no fluff — just pure career intelligence.",
  ctaLabel: "Subscribe",
  ctaHref: "mailto:kumar@moriyaedu.com?subject=SRR%20Careers%20newsletter",
} as const;
