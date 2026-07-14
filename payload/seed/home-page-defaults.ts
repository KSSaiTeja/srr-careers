/** Default homepage copy for CMS seeding (no path aliases — safe for Payload CLI). */
export const homePageDefaults = {
  hero: {
    badge: "#1 SAP FICO TRAINING INSTITUTE",
    titleLine1: "Master SAP FICO on",
    titleAccent: "S/4 HANA",
    primaryCta: { label: "View Courses & Fees", href: "/courses" },
    secondaryCta: { label: "Book a Free Demo", href: "/#demo-class" },
    imageAlt:
      "Students learning SAP FICO — two students working on laptops",
  },
  problem: {
    headingGray: "Does any of this sound like your",
    headingNavy: "SAP FICO journey?",
    items: [
      {
        icon: "chat",
        text: "Overwhelmed by complex SAP navigation and system processes?",
      },
      {
        icon: "settings",
        text: "Unsure how to configure key settings in SAP?",
      },
      {
        icon: "chart",
        text: "Finding it difficult to apply theoretical knowledge",
      },
      {
        icon: "alert",
        text: "Lacking confidence in your ability to troubleshoot SAP errors?",
      },
      {
        icon: "project",
        text: "Missing hands-on experience with SAP project implementation?",
      },
      {
        icon: "clock",
        text: "Concerned about keeping up with the latest SAP updates",
      },
    ],
  },
  mission: {
    eyebrow: "Our Mission",
    headingGray: "Our focus is simple",
    headingNavy: "Train to deliver.",
    roiCard: {
      label: "RETURN ON INVESTMENT",
      value: "2.4",
      suffix: "x",
      description: "Average salary multiple our placed consultants achieve.",
      partnersLabel: "800+ Partners",
    },
    placementCardTop: {
      label: "COHORT PLACEMENT RATE",
      value: "94",
      suffix: "%",
      description: "Average salary jump within 90 days of placement.",
    },
    alumniCard: {
      body: "We've placed 15,000+ consultants worldwide, helping them break into top SAP practices in the industry",
      rating: "4.8",
      ratingSuffix: "/5",
      trustedBy: "TRUSTED BY\n15K+ ALUMNI",
    },
    placementCardBottom: {
      label: "COHORT PLACEMENT RATE",
      value: "94",
      suffix: "%",
      description:
        "Average across the last 4 cohorts — most students receive their first offer within 45 days of graduation.",
    },
    practiceCard: {
      label: "FOCUSED PRACTICE",
      value: "12",
      description: "Years on SAP FICO",
    },
  },
  instructor: {
    eyebrow: "ABOUT YOUR INSTRUCTOR",
    title: "Your personal guide to",
    titleHighlight: "SAP FICO Success",
    journeyHeading: "My Journey:",
    journeyBody:
      "Meet Mr. Kumar, a highly experienced and passionate SAP FICO S/4HANA trainer associated with SRR Careers as a Full-Time Trainer, trained 250+ professionals across India, UAE, Qatar, Saudi, Philippines, USA, Malaysia, Singapore & Kuwait.",
    skillsHeading: "Hands-on SAP Skills",
    skillsBody: "Master SAP FICO with accounting and finance skills.",
    featuresLeft: [
      {
        title: "Accounting Expertise",
        description: "Solid SAP FICO foundation.",
      },
      {
        title: "Finance Insights",
        description: "Practical finance exposure.",
      },
    ],
    featuresRight: [
      {
        title: "In-depth Knowledge",
        description: "Deep subject insights.",
      },
      {
        title: "Quality Training",
        description: "Commitment to top-notch training.",
      },
    ],
  },
  curriculum: {
    eyebrow: "CURRICULUM",
    titleLine1: "An eleven-module journey",
    titleLine2: "to becoming a",
    titleHighlight: "S/4 HANA",
    titleLine2Suffix: "consultant",
    notice: {
      enabled: true,
      text: "For students from non-accounting backgrounds — Basics of Accounting is also covered, so everyone starts on the same solid ground.",
      highlight: "Basics of Accounting",
    },
    modules: [
      {
        num: "01",
        title: "SAP & ERP Fundamentals",
        desc: "Core concepts, navigation, and the SAP landscape.",
      },
      {
        num: "02",
        title: "Company Code – Global Data",
        desc: "Company code setup, global parameters, and organizational assignment.",
      },
      {
        num: "03",
        title: "Business Partner (Customer & Supplier)",
        desc: "Master data, roles, and business partner configuration.",
      },
      {
        num: "04",
        title: "Financial Statement Version",
        desc: "FSV structure, hierarchy, and financial reporting layouts.",
      },
      {
        num: "05",
        title: "General Ledger Accounting",
        desc: "Chart of accounts, journal entries, and GL reporting.",
      },
      {
        num: "06",
        title: "Accounts Receivables",
        desc: "Customer invoicing, payments, dunning, and collections.",
      },
      {
        num: "07",
        title: "Accounts Payables",
        desc: "Vendor invoices, payments, and open-item management.",
      },
      {
        num: "08",
        title: "Taxation",
        desc: "Tax codes, withholding tax, and statutory compliance.",
      },
      {
        num: "09",
        title: "Asset Accounting",
        desc: "Asset lifecycle, depreciation, and reporting.",
      },
      {
        num: "10",
        title: "Controlling",
        desc: "Cost centers, profit centers, and internal orders.",
      },
      {
        num: "11",
        title: "Integration",
        desc: "End-to-end cross-module flows with MM, SD, and related areas.",
      },
    ],
    ctaEyebrow: "FULL SYLLABUS",
    ctaTitle: "See every topic, every project, every outcome.",
    cta: {
      label: "See the Full Syllabus",
      href: "/courses/sap-fico-consultant-track",
    },
  },
  testimonials: {
    eyebrow: "TESTIMONIALS",
    title: "Stories from our",
    titleHighlight: "satisfied students",
    items: [
      {
        name: "Rahul S.",
        role: "SAP FICO Consultant",
        initials: "RS",
        quote:
          "SRR Careers gave me a rock-solid foundation in FICO. The integration with MM and SD modules clicked for me only because of how Kumar sir teaches with live data.",
      },
      {
        name: "Sneha R.",
        role: "Finance Manager",
        initials: "SR",
        quote:
          "Within 3 months I switched from core accounting to an SAP consultant role. The placement team genuinely fought for me until I landed the offer.",
      },
      {
        name: "Ananya P.",
        role: "S/4 HANA Analyst",
        initials: "AP",
        quote:
          "Cost center accounting and product costing felt intimidating — until I saw the real client scenarios SRR walks you through. Precise, practical, career-changing.",
      },
    ],
  },
  preFooter: {
    badge: "FREE LIVE DEMO",
    headingLine1: "Book your free",
    headingLine2: "live demo class",
    description:
      "Pick any programme — SAP FICO, Advanced Excel, or a workshop. Meet our mentors, get a clear roadmap, and find the right fit. 100% free — no credit card.",
    phoneButtonLabel: "+91 92861 23457",
    emailButtonLabel: "Email us",
  },
} as const;
