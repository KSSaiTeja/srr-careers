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
  {
    name: "Advanced Excel Workshop",
    slug: "advanced-excel",
    meta: {
      title: "Advanced Excel Workshop | SRR Careers",
      description:
        "Master advanced Excel formulas, Pivot Tables, dashboards, and automation. Hands-on workshop for students and professionals — 12–16 hours, customizable.",
    },
    intro: {
      pageTitle: "Advanced Excel",
      headline: "Workshop",
      headlineHighlight: "for professionals",
      subtext:
        "Practical, hands-on learning with real-world business scenarios — from advanced formulas to interactive dashboards.",
    },
    overview: {
      description:
        "In today's data-driven business environment, Microsoft Excel is one of the most sought-after skills across industries. Our Advanced Excel Workshop helps students and professionals master powerful Excel features that improve productivity, simplify data analysis, and support better business decision-making. Participants learn to work with large datasets, create insightful reports, automate repetitive tasks, and build interactive dashboards.",
      price: 15000,
      originalPrice: 20000,
      primaryCta: "Enroll Now",
      secondaryCta: "Explore Curriculum",
      secondaryCtaHref: "#syllabus",
      moduleCount: "10",
      moduleLabel: "Topics",
      moduleBlurb:
        "Interactive sessions, practical assignments, and industry-based case studies you can apply immediately.",
      metaCards: [
        {
          icon: "duration",
          label: "Duration",
          value: "12–16 Hours",
          valueSuffix: "Flexible",
        },
        { icon: "modules", label: "Topics", value: "10 Key Areas" },
        {
          icon: "format",
          label: "Format",
          value: "Hands-on",
          valueSuffix: "Workshop",
        },
        {
          icon: "outcome",
          label: "Outcome",
          value: "Excel fluency for analysis & reporting",
        },
      ],
    },
    whoIsItFor: {
      eyebrow: "who is it for",
      title: "Built for learners who",
      titleHighlight: "work with data.",
      audience:
        "Students preparing for campus placements and internships\nFinance, operations, and analytics professionals\nAnyone who wants to move beyond basic spreadsheets\nTeams that need faster reporting and cleaner data workflows",
      handsOnTitle: "Skills you can use immediately.",
      handsOnDescription:
        "Real business scenarios so every technique transfers to academic projects and the workplace.",
      handsOnFeatures:
        "Work confidently with large datasets\nBuild insightful reports and interactive dashboards\nAutomate repetitive tasks with macros basics",
    },
    syllabus: {
      eyebrow: "Curriculum",
      title: "Key Topics Covered",
      notice: {
        enabled: true,
        text: "Recommended duration: 12–16 hours — adjustable for campus or corporate batches.",
        highlight: "12–16 hours",
      },
      items: [
        {
          number: "01",
          title: "Advanced Formulas and Functions",
          topics:
            "Complex formula patterns\nNested functions\nError handling\nProductivity shortcuts",
        },
        {
          number: "02",
          title: "Lookup Functions",
          topics:
            "VLOOKUP\nXLOOKUP\nINDEX & MATCH\nWhen to use each lookup approach",
        },
        {
          number: "03",
          title: "Pivot Tables and Pivot Charts",
          topics:
            "Building pivot tables\nPivot charts for insight\nSlicers and filters\nSummarising large datasets",
        },
        {
          number: "04",
          title: "Data Validation and Conditional Formatting",
          topics:
            "Input rules and dropdowns\nHighlighting exceptions\nVisual cues for decision-making\nClean data entry workflows",
        },
        {
          number: "05",
          title: "Data Cleaning and Analysis",
          topics:
            "Cleaning messy data\nText and date tools\nDeduplication basics\nPreparing data for reporting",
        },
        {
          number: "06",
          title: "Charts and Interactive Dashboards",
          topics:
            "Chart selection for clarity\nDashboard layout principles\nInteractive controls\nPresenting insights to stakeholders",
        },
        {
          number: "07",
          title: "Financial and Business Reporting",
          topics:
            "Business report structures\nFinancial summaries\nKPI-style views\nStakeholder-ready outputs",
        },
        {
          number: "08",
          title: "What-If Analysis",
          topics:
            "Scenario planning\nGoal Seek\nData tables\nDecision support techniques",
        },
        {
          number: "09",
          title: "Basic Automation with Macros",
          topics:
            "Recording macros\nRunning repetitive workflows\nSafe automation habits\nWhen macros save the most time",
        },
        {
          number: "10",
          title: "Productivity Tips and Best Practices",
          topics:
            "Keyboard shortcuts\nWorkbook organisation\nNaming and structure conventions\nHabits that scale with team use",
        },
      ],
    },
    footerBlocks: {
      alsoOffered: {
        eyebrow: "Also offered",
        title: "Campus Recruitment Training",
        href: "/courses/campus-recruitment-training",
        ctaLabel: "Explore Workshop Details",
      },
      limitedSeatsCta: {
        eyebrow: "NEXT WORKSHOP OPENS SOON",
        titleLine1: "Ready to level up",
        titleLine2: "your Excel skills?",
        description:
          "Secure your seat online. Pay securely and get instant confirmation — or talk to us about campus and corporate batches.",
        ctaLabel: "Enroll Now",
        ctaHref: "#demo-class",
      },
    },
    faq: sharedFaq,
  },
  {
    name: "Campus Recruitment Training",
    slug: "campus-recruitment-training",
    meta: {
      title: "Campus Recruitment Training (CRT) | SRR Careers",
      description:
        "Comprehensive campus placement preparation — aptitude, communication, resume building, group discussions, and interview skills with SRR Careers.",
    },
    intro: {
      pageTitle: "Campus Recruitment",
      headline: "Training",
      headlineHighlight: "(CRT)",
      subtext:
        "Practical, industry-oriented placement preparation — aptitude, communication, interviews, and career readiness.",
    },
    overview: {
      description:
        "Campus Recruitment Training (CRT) is a comprehensive placement preparation program designed to equip students with the skills and confidence required to succeed in campus recruitment drives. At SRR Careers, our CRT program provides practical, industry-oriented training through interactive sessions, mock assessments, resume building, group discussions, and interview preparation — with personalized guidance to improve problem-solving, professional communication, and overall placement readiness.",
      price: 0,
      primaryCta: "Book a Free Demo",
      secondaryCta: "Explore Curriculum",
      secondaryCtaHref: "#syllabus",
      moduleCount: "08",
      moduleLabel: "Focus Areas",
      moduleBlurb:
        "Real-world examples, hands-on practice, and continuous feedback for recruitment confidence.",
      metaCards: [
        {
          icon: "duration",
          label: "Focus",
          value: "Placement",
          valueSuffix: "Ready",
        },
        { icon: "modules", label: "Coverage", value: "8 Focus Areas" },
        {
          icon: "format",
          label: "Format",
          value: "Interactive",
          valueSuffix: "Mock drills",
        },
        {
          icon: "outcome",
          label: "Outcome",
          value: "Confident campus placements",
        },
      ],
    },
    whoIsItFor: {
      eyebrow: "who is it for",
      title: "Designed for students who want to",
      titleHighlight: "get placed.",
      audience:
        "Final-year and pre-final students preparing for campus drives\nStudents targeting IT, finance, manufacturing, or consulting roles\nLearners who need stronger aptitude and communication skills\nAnyone seeking structured interview and GD practice",
      handsOnTitle: "Practice that builds confidence.",
      handsOnDescription:
        "Mock tests, mock interviews, and continuous feedback so students perform with clarity during recruitment.",
      handsOnFeatures:
        "Personalized guidance on problem-solving and communication\nResume building and LinkedIn profile guidance\nCorporate etiquette and professional skills",
    },
    syllabus: {
      eyebrow: "Curriculum",
      title: "Our CRT Program Covers",
      items: [
        {
          number: "01",
          title: "Quantitative Aptitude, Logical Reasoning & Verbal Ability",
          topics:
            "Quantitative aptitude fundamentals\nLogical reasoning practice\nVerbal ability for assessments\nTimed problem-solving drills",
        },
        {
          number: "02",
          title: "Communication & Soft Skills",
          topics:
            "Professional communication\nClarity and confidence in speech\nWorkplace soft skills\nPresentation basics",
        },
        {
          number: "03",
          title: "Resume Building & LinkedIn Profile Guidance",
          topics:
            "Resume structure for campus roles\nHighlighting projects and achievements\nLinkedIn profile optimisation\nPersonal branding basics",
        },
        {
          number: "04",
          title: "Group Discussion Techniques",
          topics:
            "GD formats and expectations\nStructuring arguments\nListening and turn-taking\nPractice rounds with feedback",
        },
        {
          number: "05",
          title: "HR & Technical Interview Preparation",
          topics:
            "Common HR questions\nTechnical interview readiness\nSTAR-style answers\nMock interview practice",
        },
        {
          number: "06",
          title: "Corporate Etiquette & Professional Skills",
          topics:
            "Workplace etiquette\nProfessional presence\nEmail and meeting basics\nFirst-impression skills",
        },
        {
          number: "07",
          title: "Mock Tests and Mock Interviews",
          topics:
            "Assessment-style mock tests\nInterview simulations\nFeedback loops\nImprovement tracking",
        },
        {
          number: "08",
          title: "Career Guidance and Placement Readiness",
          topics:
            "Industry awareness\nRole fit and career paths\nPlacement process readiness\nConfidence for recruitment day",
        },
      ],
    },
    footerBlocks: {
      alsoOffered: {
        eyebrow: "Also offered",
        title: "Advanced Excel Workshop",
        href: "/courses/advanced-excel",
        ctaLabel: "Explore Course Details",
      },
      limitedSeatsCta: {
        eyebrow: "NEXT BATCH STARTS SOON",
        titleLine1: "Maximise your",
        titleLine2: "placement opportunities.",
        description:
          "Whether preparing for IT, finance, manufacturing, consulting, or other industries — talk to us about bringing CRT to your campus.",
        ctaLabel: "Book a Free Demo",
        ctaHref: "#demo-class",
      },
    },
    faq: sharedFaq,
  },
] as const;
