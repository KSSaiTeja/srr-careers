import { coursesFaqSection } from "@/lib/constants/courses-content";

export const COURSE_DETAIL_SLUGS = [
  "sap-fico-consultant-track",
  "sap-fico-end-user-track",
] as const;

export type CourseDetailSlug = (typeof COURSE_DETAIL_SLUGS)[number];

export type CourseDetailMetaCard = {
  icon: "duration" | "modules" | "format" | "outcome";
  label: string;
  value: string;
  valueSuffix?: string;
};

export type SyllabusItem = {
  id: string;
  number: string;
  title: string;
  description?: string;
  topics: string[];
};

export type CourseDetailContent = {
  slug: CourseDetailSlug;
  meta: {
    title: string;
    description: string;
  };
  intro: {
    pageTitle: string;
    headline: string;
    headlineHighlight: string;
    subtext?: string;
  };
  overview: {
    description: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryCtaHref: string;
    moduleCount: string;
    moduleLabel: string;
    moduleBlurb: string;
    metaCards: CourseDetailMetaCard[];
  };
  whoIsItFor: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    audience: string[];
    handsOnTitle: string;
    handsOnDescription: string;
    handsOnFeatures: string[];
  };
  syllabus: {
    eyebrow: string;
    title: string;
    items: SyllabusItem[];
  };
  alsoOffered: {
    eyebrow: string;
    title: string;
    href: string;
    ctaLabel: string;
  };
  limitedSeatsCta: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  faq: typeof coursesFaqSection;
};

const consultantSyllabus: SyllabusItem[] = [
  {
    id: "01",
    number: "01",
    title: "ERP & SAP Foundations",
    topics: [
      "Introduction to ERP",
      "ECC vs S/4 HANA differences",
      "R/3 Architecture",
      "ASAP methodology",
    ],
  },
  {
    id: "02",
    number: "02",
    title: "Organizational Structure & Global Data",
    topics: [
      "Company & Company code",
      "Document types & number ranges",
      "Business area & Segment",
      "Field status variant",
      "Posting period variant",
      "Fiscal year variant & Posting keys",
    ],
  },
  {
    id: "03",
    number: "03",
    title: "Financial Accounting (FI)",
    topics: [
      "General ledger configuration",
      "Journal entries & posting",
      "Financial statement versions",
      "Parallel accounting",
    ],
  },
  {
    id: "04",
    number: "04",
    title: "Accounts Payable (AP)",
    topics: [
      "Vendor master data",
      "Invoice verification",
      "Payment program & clearing",
      "Withholding tax setup",
    ],
  },
  {
    id: "05",
    number: "05",
    title: "Accounts Receivable (AR)",
    topics: [
      "Customer master data",
      "Billing documents",
      "Incoming payments",
      "Dunning & correspondence",
    ],
  },
  {
    id: "06",
    number: "06",
    title: "Asset Accounting (AA)",
    topics: [
      "Asset classes & master data",
      "Acquisition & retirement",
      "Depreciation runs",
      "AUC capitalisation",
    ],
  },
  {
    id: "07",
    number: "07",
    title: "Controlling (CO)",
    topics: [
      "Cost centers & profit centers",
      "Internal orders",
      "Product costing basics",
      "COPA configuration",
    ],
  },
  {
    id: "08",
    number: "08",
    title: "Integration MM / SD / HR",
    topics: [
      "MM–FI integration flows",
      "SD–FI billing integration",
      "HR–FI payroll posting",
      "End-to-end scenario walkthroughs",
    ],
  },
  {
    id: "09",
    number: "09",
    title: "Real-Time Scenarios",
    topics: [
      "Implementation case studies",
      "UAT & cutover support",
      "Error analysis & fixes",
      "Interview & project readiness",
    ],
  },
];

const endUserSyllabus: SyllabusItem[] = [
  {
    id: "01",
    number: "01",
    title: "SAP Navigation & Basics",
    topics: [
      "SAP GUI & Fiori navigation",
      "Transaction codes for FI",
      "User settings & favourites",
      "Document display & change logs",
    ],
  },
  {
    id: "02",
    number: "02",
    title: "FI Posting & Document Types",
    topics: [
      "Journal entry posting",
      "Document types & posting keys",
      "Park & hold documents",
      "Reversal & correction postings",
    ],
  },
  {
    id: "03",
    number: "03",
    title: "Accounts Payable Operations",
    topics: [
      "Vendor invoice entry",
      "Payment processing",
      "Automatic payment program",
      "Vendor reconciliation",
    ],
  },
  {
    id: "04",
    number: "04",
    title: "Accounts Receivable Operations",
    topics: [
      "Customer billing",
      "Incoming payment posting",
      "Clearing open items",
      "Customer account analysis",
    ],
  },
  {
    id: "05",
    number: "05",
    title: "Asset Accounting for Users",
    topics: [
      "Asset master inquiry",
      "Acquisition posting",
      "Depreciation run execution",
      "Asset retirement processing",
    ],
  },
  {
    id: "06",
    number: "06",
    title: "Reporting & Month-End",
    topics: [
      "Trial balance & GL reports",
      "Open item lists",
      "Period-end closing steps",
      "Reconciliation techniques",
    ],
  },
  {
    id: "07",
    number: "07",
    title: "GST & TDS Posting",
    topics: [
      "Tax code selection",
      "GST posting workflows",
      "TDS withholding entries",
      "Statutory report basics",
    ],
  },
  {
    id: "08",
    number: "08",
    title: "Live Business Scenarios",
    topics: [
      "Month-end close simulation",
      "Error resolution drills",
      "Cross-module document flow",
      "Role-based practice tickets",
    ],
  },
];

export const courseDetailContent: Record<CourseDetailSlug, CourseDetailContent> =
  {
    "sap-fico-consultant-track": {
      slug: "sap-fico-consultant-track",
      meta: {
        title: "SAP FICO Consultant Track | SRR Careers",
        description:
          "Complete SAP FICO consultant program on S/4 HANA — configuration, GST, TDS, Asset Accounting, and Controlling for implementation roles.",
      },
      intro: {
        pageTitle: "SAP FICO",
        headline: "Consultant",
        headlineHighlight: "Track",
        subtext:
          "The complete consultant program on S/4 HANA — configure FI, CO, taxation, and integration from the ground up.",
      },
      overview: {
        description:
          "The complete consultant program. Configure SAP FICO from the ground up — organizational structure, GL, AR, AP, Asset Accounting, Taxation (GST & TDS) and full Controlling (CO) including COPA. Built for those targeting implementation, support and consulting roles.",
        primaryCta: "Book a Free Demo",
        secondaryCta: "Explore Curriculum",
        secondaryCtaHref: "#syllabus",
        moduleCount: "11",
        moduleLabel: "Modules",
        moduleBlurb:
          "Mapped to real implementation deliverables. Every concept ends in a working SAP transaction.",
        metaCards: [
          {
            icon: "duration",
            label: "Duration",
            value: "S/4 Hana",
            valueSuffix: "Live",
          },
          { icon: "modules", label: "Modules", value: "11 Modules" },
          {
            icon: "format",
            label: "Format",
            value: "Live",
            valueSuffix: "Mentored cohort",
          },
          {
            icon: "outcome",
            label: "Outcome",
            value: "Job-ready FICO Consultant",
          },
        ],
      },
      whoIsItFor: {
        eyebrow: "who is it for",
        title: "Designed for serious",
        titleHighlight: "learners.",
        audience: [
          "Finance graduates targeting an SAP consulting career",
          "Working CAs, CMAs and finance professionals",
          "SAP end-users moving into a consultant role",
          "Support consultants stepping into implementation",
        ],
        handsOnTitle: "Hands-on with real systems.",
        handsOnDescription:
          "End-to-end SAP S/4 HANA Finance & Controlling configuration.",
        handsOnFeatures: [
          "Full configuration on S/4 HANA (Incl. ECC vs S/4 HANA differences)",
          "GST & TDS configuration + posting",
          "Asset Accounting end-to-end with AUC capitalisation",
        ],
      },
      syllabus: {
        eyebrow: "Curriculum",
        title: "Full Syllabus",
        items: consultantSyllabus,
      },
      alsoOffered: {
        eyebrow: "Also offered",
        title: "SAP FICO - End User Track",
        href: "/courses/sap-fico-end-user-track",
        ctaLabel: "Explore Course Details",
      },
      limitedSeatsCta: {
        eyebrow: "NEXT BATCH STARTS SOON",
        titleLine1: "Limited Seats.",
        titleLine2: "Reserve yours.",
        description:
          "Book a free live demo of the course — no card, no commitment. Meet your mentor and walk through the curriculum.",
        ctaLabel: "Book a Free Demo",
        ctaHref: "#pre-footer",
      },
      faq: coursesFaqSection,
    },
    "sap-fico-end-user-track": {
      slug: "sap-fico-end-user-track",
      meta: {
        title: "SAP FICO End User Track | SRR Careers",
        description:
          "SAP FICO end-user training on S/4 HANA — live mentored cohort for finance teams mastering day-to-day FI operations and reporting.",
      },
      intro: {
        pageTitle: "SAP FICO",
        headline: "End User",
        headlineHighlight: "Track",
        subtext:
          "Master day-to-day SAP FICO operations on S/4 HANA — postings, reporting, and month-end for finance teams.",
      },
      overview: {
        description:
          "Built for finance teams and professionals who run SAP daily. Master FI postings, AP/AR operations, asset transactions, tax postings, and month-end reporting on S/4 HANA — without the full implementation configuration depth of the consultant track.",
        primaryCta: "Book a Free Demo",
        secondaryCta: "Explore Curriculum",
        secondaryCtaHref: "#syllabus",
        moduleCount: "8",
        moduleLabel: "Modules",
        moduleBlurb:
          "Practical modules aligned to real finance operations. Every session ends in live SAP transactions.",
        metaCards: [
          {
            icon: "duration",
            label: "Duration",
            value: "S/4 Hana",
            valueSuffix: "Live",
          },
          { icon: "modules", label: "Modules", value: "8 Modules" },
          {
            icon: "format",
            label: "Format",
            value: "Live",
            valueSuffix: "Mentored cohort",
          },
          {
            icon: "outcome",
            label: "Outcome",
            value: "Confident SAP FICO End User",
          },
        ],
      },
      whoIsItFor: {
        eyebrow: "who is it for",
        title: "Designed for serious",
        titleHighlight: "operators.",
        audience: [
          "Finance executives using SAP in their current role",
          "Accounts teams moving from spreadsheets to SAP",
          "MBA / B.Com graduates joining finance operations",
          "Consultants who need stronger end-user fluency first",
        ],
        handsOnTitle: "Hands-on with real systems.",
        handsOnDescription:
          "Day-to-day SAP S/4 HANA Finance operations — posting, reporting, and period close.",
        handsOnFeatures: [
          "FI document posting and reversals on S/4 HANA",
          "GST & TDS posting workflows",
          "Month-end reporting and reconciliation drills",
        ],
      },
      syllabus: {
        eyebrow: "Curriculum",
        title: "Full Syllabus",
        items: endUserSyllabus,
      },
      alsoOffered: {
        eyebrow: "Also offered",
        title: "SAP FICO - Consultant Track",
        href: "/courses/sap-fico-consultant-track",
        ctaLabel: "Explore Course Details",
      },
      limitedSeatsCta: {
        eyebrow: "NEXT BATCH STARTS SOON",
        titleLine1: "Limited Seats.",
        titleLine2: "Reserve yours.",
        description:
          "Book a free live demo of the course — no card, no commitment. Meet your mentor and walk through the curriculum.",
        ctaLabel: "Book a Free Demo",
        ctaHref: "#pre-footer",
      },
      faq: coursesFaqSection,
    },
  };

export function getCourseDetail(slug: string): CourseDetailContent | undefined {
  if (!(COURSE_DETAIL_SLUGS as readonly string[]).includes(slug)) {
    return undefined;
  }
  return courseDetailContent[slug as CourseDetailSlug];
}

export function getCourseDetailPath(slug: CourseDetailSlug): string {
  return `/courses/${slug}`;
}
