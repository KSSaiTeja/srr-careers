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
        { icon: "outcome", label: "Outcome", value: "Job-ready FICO Consultant" },
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
      eyebrow: "Curriculum",
      title: "Full Syllabus",
      items: [
        {
          number: "01",
          title: "ERP & SAP Foundations",
          topics:
            "Introduction to ERP\nECC vs S/4 HANA differences\nR/3 Architecture\nASAP methodology",
        },
        {
          number: "02",
          title: "Organizational Structure & Global Data",
          topics:
            "Company & Company code\nDocument types & number ranges\nBusiness area & Segment\nField status variant\nPosting period variant\nFiscal year variant & Posting keys",
        },
        {
          number: "03",
          title: "Financial Accounting (FI)",
          topics:
            "General ledger configuration\nJournal entries & posting\nFinancial statement versions\nParallel accounting",
        },
        {
          number: "04",
          title: "Accounts Payable (AP)",
          topics:
            "Vendor master data\nInvoice verification\nPayment program & clearing\nWithholding tax setup",
        },
        {
          number: "05",
          title: "Accounts Receivable (AR)",
          topics:
            "Customer master data\nBilling documents\nIncoming payments\nDunning & correspondence",
        },
        {
          number: "06",
          title: "Asset Accounting (AA)",
          topics:
            "Asset classes & master data\nAcquisition & retirement\nDepreciation runs\nAUC capitalisation",
        },
        {
          number: "07",
          title: "Controlling (CO)",
          topics:
            "Cost centers & profit centers\nInternal orders\nProduct costing basics\nCOPA configuration",
        },
        {
          number: "08",
          title: "Integration FI with MM & SD",
          topics:
            "MM–FI integration flows\nSD–FI billing integration\nHR–FI payroll posting\nEnd-to-end scenario walkthroughs",
        },
        {
          number: "09",
          title: "Real-Time Scenarios",
          topics:
            "Implementation case studies\nUAT & cutover support\nError analysis & fixes\nInterview & project readiness",
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
        ctaHref: "#pre-footer",
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
      moduleCount: "8",
      moduleLabel: "Modules",
      moduleBlurb:
        "Practical modules aligned to real finance operations. Every session ends in live SAP transactions.",
      metaCards: [
        { icon: "duration", label: "Duration", value: "S/4 Hana", valueSuffix: "Live" },
        { icon: "modules", label: "Modules", value: "8 Modules" },
        { icon: "format", label: "Format", value: "Live", valueSuffix: "Mentored cohort" },
        { icon: "outcome", label: "Outcome", value: "Confident SAP FICO End User" },
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
      title: "Full Syllabus",
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
        {
          number: "08",
          title: "Live Business Scenarios",
          topics:
            "Month-end close simulation\nError resolution drills\nCross-module document flow\nRole-based practice tickets",
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
        ctaHref: "#pre-footer",
      },
    },
    faq: sharedFaq,
  },
] as const;
