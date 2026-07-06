/**
 * Default content for the Courses page. Seeds the CoursesPage global on first run
 * and acts as the fallback when the CMS has no value. Shapes mirror the global's
 * named tabs. Bullet lists (highlights / work items / tools / tags) are stored as
 * newline-separated text; the mapper splits them into arrays. Track illustrations
 * and the signpost image are static assets resolved in the mapper.
 */
export const coursesPageDefaults = {
  intro: {
    pageTitle: "Our Programs",
    headline: "Two Tracks. One Obsession.",
    headlineHighlight: "FICO done right",
    subtext:
      "Whether you're stepping into SAP for the first time or sharpening end-user fluency, every cohort is mentored live by working consultants - never recorded lectures.",
  },
  offerings: {
    eyebrow: "Our Offerings",
    title: "Pick your",
    titleHighlight: "track.",
    courses: [
      {
        variant: "consultant",
        title: "SAP FICO - Consultant Track",
        description:
          "End-to-end SAP S/4 HANA financial accounting and controlling configurations",
        duration: "40 Hrs",
        durationSuffix: "",
        modules: "S/4Hana",
        outcome: "Become SAP S/4HANA Consultant Private Cloud",
        price: 35000,
        originalPrice: 45000,
        highlights:
          "Full cycle configurations on S/4 HANA (Incl. ECC vs S/4Hana differences)\nTaxation structures - GST & TDS configurations + postings\nAsset accounting - entire life cycle, AUC & Transfer",
        ctaLabel: "View course details",
        ctaHref: "/courses/sap-fico-consultant-track",
      },
      {
        variant: "end-user",
        title: "SAP FICO - End User Track",
        description: "Day-to-day tasks on SAP S/4Hana Finance.",
        duration: "15 Hrs",
        durationSuffix: "",
        modules: "S/4Hana",
        outcome: "Become SAP S/4HANA End User Private Cloud",
        price: 15000,
        originalPrice: 20000,
        highlights:
          "Vendor, Customer, General Ledger master creations\nDay-to-day postings & reporting\nAsset Master, document posting & checking asset values",
        ctaLabel: "View course details",
        ctaHref: "/courses/sap-fico-end-user-track",
      },
    ],
  },
  learningApproach: {
    title: "Built for the way",
    titleHighlight: "Consultants Learn.",
    description:
      "Not 200-hour video libraries. A small live cohort, daily mentor reviews, and project tickets straight from real SAP S/4Hana rollouts, implementations & support projects.",
    ctaLabel: "Compare the Two Tracks",
    ctaHref: "#track-comparison",
    stats: {
      maxSeats: {
        value: "24",
        label: "Max seats per cohort",
        description:
          "Small batches so every learner gets airtime, weekly reviews, and a direct line to the mentor.",
      },
      mentorLed: {
        title: "Mentor-led",
        description:
          "Every session is live with a working SAP consultant. Questions answered in the moment.",
      },
      rating: {
        value: "4.8",
        suffix: "/5",
      },
    },
  },
  trackComparison: {
    eyebrow: "which track is for you",
    title: "Which SAP FICO career is",
    titleHighlight: "Right for you?",
    tracks: [
      {
        badge: "Consultant track",
        badgeVariant: "consultant",
        personaPrefix: "The",
        persona: "Builder",
        personaDescription:
          "Design, configure & implement end-to-end SAP S/4Hana Finance & Controlling solutions for businesses, from blueprint to go-live support.",
        workLabel: "you'll work on",
        workItems:
          "System Design & Configuration\nEnd-to-end Implementation\nUser Acceptance Testing\nPerformance Optimization\nPost-Deployment Support",
        toolsLabel: "TOOLS YOU'LL TOUCH",
        tools: "SAP GUI\nSAP Fiori",
        outcomeLabel: "OUTCOME",
        outcome: "Become SAP S/4HANA Consultant Private Cloud",
        tags: "High Growth\nHigh Respect\nHigh Earning",
      },
      {
        badge: "End-User Track",
        badgeVariant: "end-user",
        personaPrefix: "The",
        persona: "Operator",
        personaDescription:
          "Use Pre-configured ERP system to perform daily business transactions, maintain master data, & generate reports.",
        workLabel: "you'll work on",
        workItems:
          "Master creations & updates\nBusiness transaction posting\nRunning scheduled programs\nGenerating reports\nTalking with customers, vendors & cross module end-users",
        toolsLabel: "TOOLS YOU'LL TOUCH",
        tools: "SAP GUI\nSAP Fiori",
        outcomeLabel: "OUTCOME",
        outcome: "Become SAP S/4HANA End User Private Cloud",
        tags: "Job Security\nHigh Demand\nQuick Start",
      },
    ],
  },
  faq: {
    eyebrow: "FAQs",
    title: "Questions we hear,",
    highlight: "before the demo.",
    helperText:
      "Can't find the answer you're looking for? Drop us a note - a senior counsellor responds within a working day.",
    askLinkLabel: "Ask us anything →",
    askLinkHref: "#demo-class",
    items: [
      {
        question: "Do i need prior SAP experience to join?",
        answer:
          "No. We start from finance fundamentals and build up to consultant-ready SAP S/4 HANA FICO skills. A finance or accounting background helps, but many successful learners come from adjacent roles.",
      },
      {
        question: "What are the prerequisites for SAP training?",
        answer:
          "Basic understanding of accounting concepts (P&L, balance sheet, GL) is recommended. We'll assess your profile in the free demo and suggest the right learning path.",
      },
      {
        question: "How long does the SAP certification process take?",
        answer:
          "Most learners complete our intensive program in 3–6 months, depending on batch pace and practice time. Certification exam prep is integrated into the curriculum.",
      },
      {
        question: "Are there online resources available for SAP learning?",
        answer:
          "Yes — live sessions are recorded, and you get structured assignments, sandbox practice, and mentor support between classes.",
      },
      {
        question: "What is the average salary for SAP consultants?",
        answer:
          "Entry-level SAP FICO consultants in India typically start from competitive packages that grow quickly with project experience. We'll share current market ranges during your demo call.",
      },
      {
        question: "Can I specialize in a specific module of SAP?",
        answer:
          "Our core program focuses on S/4 HANA FICO with integration touchpoints (MM, SD). Advanced specialization paths can be discussed with your mentor after you complete the foundation.",
      },
    ],
  },
} as const;

export type CoursesPageDefaults = typeof coursesPageDefaults;
