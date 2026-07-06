import { coursesPageDefaults } from "./courses-page-defaults";

const sharedFaq = {
  eyebrow: coursesPageDefaults.faq.eyebrow,
  title: coursesPageDefaults.faq.title,
  highlight: coursesPageDefaults.faq.highlight,
  helperText: coursesPageDefaults.faq.helperText,
  askLinkLabel: coursesPageDefaults.faq.askLinkLabel,
  askLinkHref: coursesPageDefaults.faq.askLinkHref,
  items: coursesPageDefaults.faq.items.map((item) => ({ ...item })),
};

/**
 * Default documents for the Course Details collection. Seeds the two course
 * pages on first run. List fields (audience, hands-on features, topics) are
 * stored as newline-separated text; the mapper splits them into arrays.
 */
export const courseDetailsDefaults = [
  {
    name: "SAP FICO Consultant Track",
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
      price: 35000,
      originalPrice: 45000,
      primaryCta: "Enroll Now",
      secondaryCta: "Explore Curriculum",
      secondaryCtaHref: "#syllabus",
      moduleCount: "11",
      moduleLabel: "Modules",
      moduleBlurb:
        "Mapped to real implementation deliverables. Every concept ends in a working SAP transaction.",
      metaCards: [
        { icon: "duration", label: "Duration", value: "S/4 Hana", valueSuffix: "Live" },
        { icon: "modules", label: "Modules", value: "11 Modules" },
        { icon: "format", label: "Format", value: "Live", valueSuffix: "Mentored cohort" },
        {
          icon: "outcome",
          label: "Outcome",
          value: "Become SAP S/4HANA Consultant Private Cloud",
        },
      ],
    },
    whoIsItFor: {
      eyebrow: "who is it for",
      title: "Designed for serious",
      titleHighlight: "learners.",
      audience:
        "Finance graduates targeting an SAP consulting career\nWorking CAs, CMAs and finance professionals\nSAP end-users moving into a consultant role\nSupport consultants stepping into implementation",
      handsOnTitle: "Hands-on with real systems.",
      handsOnDescription:
        "End-to-end SAP S/4 HANA Finance & Controlling configuration.",
      handsOnFeatures:
        "Full configuration on S/4 HANA (Incl. ECC vs S/4 HANA differences)\nGST & TDS configuration + posting\nAsset Accounting end-to-end with AUC capitalisation",
    },
    syllabus: {
      eyebrow: "CURRICULUM",
      title: "An Eleven-module Journey",
      notice: {
        enabled: true,
        text: "For students from non-accounting backgrounds — Basics of Accounting is also covered, so everyone starts on the same solid ground.",
        highlight: "Basics of Accounting",
      },
      items: [
        {
          number: "01",
          title: "SAP & ERP Fundamentals",
          topics:
            "Introduction to ERP & SAP\nECC vs S/4 HANA differences\nSAP navigation & transaction codes\nASAP / Activate methodology",
        },
        {
          number: "02",
          title: "Company Code – Global Data",
          topics:
            "Company & company code configuration\nFiscal year & posting period variants\nField status variant & posting keys\nDocument types & number ranges",
        },
        {
          number: "03",
          title: "Business Partner (Customer & Supplier)",
          topics:
            "Business partner roles & categories\nCustomer master data configuration\nVendor master data configuration\nBP integration with FI transactions",
        },
        {
          number: "04",
          title: "Financial Statement Version",
          topics:
            "FSV structure & hierarchy\nFinancial statement layout design\nVersion assignment to company code\nReporting & financial statement output",
        },
        {
          number: "05",
          title: "General Ledger Accounting",
          topics:
            "Chart of accounts configuration\nGL account master & posting\nJournal entries & document flow\nParallel ledger concepts",
        },
        {
          number: "06",
          title: "Accounts Receivables",
          topics:
            "Customer invoice processing\nIncoming payments & clearing\nDunning & correspondence\nAR reporting & analytics",
        },
        {
          number: "07",
          title: "Accounts Payables",
          topics:
            "Vendor invoice verification\nPayment program & clearing\nWithholding tax configuration\nAP reporting & reconciliation",
        },
        {
          number: "08",
          title: "Taxation",
          topics:
            "Tax codes & tax procedures\nGST configuration & posting\nTDS / withholding tax setup\nStatutory compliance reporting",
        },
        {
          number: "09",
          title: "Asset Accounting",
          topics:
            "Asset classes & master data\nAcquisition, retirement & transfer\nDepreciation runs & areas\nAUC capitalisation",
        },
        {
          number: "10",
          title: "Controlling",
          topics:
            "Cost centers & profit centers\nInternal orders & product costing\nCOPA basics & configuration\nCO–FI integration",
        },
        {
          number: "11",
          title: "Integration",
          topics:
            "MM–FI integration flows\nSD–FI billing integration\nEnd-to-end scenario walkthroughs\nCross-module troubleshooting",
        },
      ],
    },
    footerBlocks: {
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
          "Secure your seat in the next live cohort. Pay online and get instant confirmation, or talk to us first if you have questions.",
        ctaLabel: "Enroll Now",
        ctaHref: "#demo-class",
      },
    },
    faq: sharedFaq,
  },
  {
    name: "SAP FICO End User Track",
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
      price: 15000,
      originalPrice: 20000,
      primaryCta: "Enroll Now",
      secondaryCta: "Explore Curriculum",
      secondaryCtaHref: "#syllabus",
      moduleCount: "7",
      moduleLabel: "Modules",
      moduleBlurb:
        "Practical modules aligned to real finance operations. Every session ends in live SAP transactions.",
      metaCards: [
        { icon: "duration", label: "Duration", value: "S/4 Hana", valueSuffix: "Live" },
        { icon: "modules", label: "Modules", value: "7 Modules" },
        { icon: "format", label: "Format", value: "Live", valueSuffix: "Mentored cohort" },
        {
          icon: "outcome",
          label: "Outcome",
          value: "Become SAP S/4HANA End User Private Cloud",
        },
      ],
    },
    whoIsItFor: {
      eyebrow: "who is it for",
      title: "Designed for serious",
      titleHighlight: "operators.",
      audience:
        "Finance executives using SAP in their current role\nAccounts teams moving from spreadsheets to SAP\nMBA / B.Com graduates joining finance operations\nConsultants who need stronger end-user fluency first",
      handsOnTitle: "Hands-on with real systems.",
      handsOnDescription:
        "Day-to-day SAP S/4 HANA Finance operations — posting, reporting, and period close.",
      handsOnFeatures:
        "FI document posting and reversals on S/4 HANA\nGST & TDS posting workflows\nMonth-end reporting and reconciliation drills",
    },
    syllabus: {
      eyebrow: "Curriculum",
      title: "An Nine-module journey",
      notice: {
        enabled: true,
        text: "New to finance? Accounting basics are also taught to students from non-accounting backgrounds, so everyone starts on the same solid ground.",
        highlight: "non-accounting backgrounds",
      },
      items: [
        {
          number: "01",
          title: "SAP Navigation & Basics",
          topics:
            "SAP GUI & Fiori navigation\nTransaction codes for FI\nUser settings & favourites\nDocument display & change logs",
        },
        {
          number: "02",
          title: "FI Posting & Document Types",
          topics:
            "Journal entry posting\nDocument types & posting keys\nPark & hold documents\nReversal & correction postings",
        },
        {
          number: "03",
          title: "Accounts Payable Operations",
          topics:
            "Vendor invoice entry\nPayment processing\nAutomatic payment program\nVendor reconciliation",
        },
        {
          number: "04",
          title: "Accounts Receivable Operations",
          topics:
            "Customer billing\nIncoming payment posting\nClearing open items\nCustomer account analysis",
        },
        {
          number: "05",
          title: "Asset Accounting for Users",
          topics:
            "Asset master inquiry\nAcquisition posting\nDepreciation run execution\nAsset retirement processing",
        },
        {
          number: "06",
          title: "Reporting & Month-End",
          topics:
            "Trial balance & GL reports\nOpen item lists\nPeriod-end closing steps\nReconciliation techniques",
        },
        {
          number: "07",
          title: "GST & TDS Posting",
          topics:
            "Tax code selection\nGST posting workflows\nTDS withholding entries\nStatutory report basics",
        },
      ],
    },
    footerBlocks: {
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
          "Secure your seat in the next live cohort. Pay online and get instant confirmation, or talk to us first if you have questions.",
        ctaLabel: "Enroll Now",
        ctaHref: "#demo-class",
      },
    },
    faq: sharedFaq,
  },
] as const;
