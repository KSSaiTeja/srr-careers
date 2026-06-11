/** Default homepage copy for CMS seeding (no path aliases — safe for Payload CLI). */
export const homePageDefaults = {
  hero: {
    badge: "#1 SAP FICO TRAINING INSTITUTE",
    titleLine1: "Master SAP FICO with",
    titleAccent: "S4 HANA",
    primaryCta: { label: "Explore Curriculum", href: "#courses" },
    secondaryCta: { label: "Speak with an Expert", href: "#pre-footer" },
    imageAlt:
      "Students learning SAP FICO — two students working on laptops",
  },
  problem: {
    headingGray: "Does this relatable to your",
    headingNavy: "SAP FICO Journey?",
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
      description: "Average salary jump within 90 days of placement.",
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
      "Meet Mr. Kumar, a highly experienced and passionate SAP FICO S/4HANA trainer associated with SRR Careers as a Full-Time Trainer, trained 250+ professionals across India, UAE, Qatar & Saudi.",
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
    titleLine1: "A nine-module journey",
    titleLine2: "to becoming a",
    titleHighlight: "S/4 HANA",
    titleLine2Suffix: "consultant",
    modules: [
      {
        num: "01",
        title: "SAP & ERP Fundamentals",
        desc: "Core concepts, navigation, and the SAP landscape.",
      },
      {
        num: "02",
        title: "Organizational Structure",
        desc: "Company codes, business areas, and chart of accounts.",
      },
      {
        num: "03",
        title: "Financial Accounting (FI)",
        desc: "General ledger, journal entries, and reporting.",
      },
      {
        num: "04",
        title: "Accounts Payable (AP)",
        desc: "Vendor master, invoices, and payment processing.",
      },
      {
        num: "05",
        title: "Accounts Receivable (AR)",
        desc: "Customer master, billing, and collections.",
      },
      {
        num: "06",
        title: "Asset Accounting (AA)",
        desc: "Asset lifecycle, depreciation, and reporting.",
      },
      {
        num: "07",
        title: "Controlling (CO)",
        desc: "Cost centers, profit centers, and internal orders.",
      },
      {
        num: "08",
        title: "Integration MM / SD / HR",
        desc: "End-to-end cross-module business flows.",
      },
      {
        num: "09",
        title: "Real-Time Scenarios",
        desc: "Hands-on projects mirroring live SAP environments.",
      },
    ],
    ctaEyebrow: "FULL SYLLABUS",
    ctaTitle: "See every topic, every project, every outcome.",
    cta: {
      label: "View course detail",
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
    badge: "LIMITED SEATS — NEXT BATCH",
    headingLine1: "Book your free SAP",
    headingLine2: "S/4 HANA FICO Live Demo",
    description:
      "Interact live with SAP industry experts. Get the complete roadmap and syllabus. 100% free — no credit card.",
    phoneButtonLabel: "98485 40123",
    emailButtonLabel: "Email us",
  },
} as const;
