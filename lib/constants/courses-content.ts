import { faqSection as ourStoryFaq } from "@/lib/constants/our-story-content";

/** Figma node 46:87 — Courses Page Design Draft */

export const coursesPageIntro = {
  pageTitle: "Our Programs",
  headline: "Two Tracks. One Obsession.",
  headlineHighlight: "FICO done right",
  subtext:
    "Whether you're stepping into SAP for the first time or sharpening end-user fluency, every cohort is mentored live by working consultants - never recorded lectures.",
} as const;

export const programsHighlights = {
  toolsConnected: {
    title: "Tools Connected",
    avatars: [
      "/images/courses/tool-avatar-1.png",
      "/images/courses/tool-avatar-2.png",
      "/images/courses/tool-avatar-3.png",
    ],
    rows: [
      { label: "Practice sandbox", status: "Live" },
      { label: "Development environment", status: "Staging" },
      { label: "Production server", status: "Active" },
    ],
  },
  cohortFocus: {
    value: "92",
    suffix: "%",
    label: "Daily Attendance",
  },
  careerAcceleration: {
    value: "10",
    valueAccent: "X",
    title: "Career Acceleration",
    description:
      "Boost your hiring speed with our mentor-led, project first curriculum.",
  },
} as const;

export type CourseOffering = {
  id: string;
  title: string;
  description: string;
  variant: "consultant" | "end-user";
  duration: string;
  durationSuffix: string;
  modules: string;
  outcome: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const offeringsSection = {
  eyebrow: "Our Offerings",
  title: "Pick your",
  titleHighlight: "track.",
  courses: [
    {
      id: "consultant-track",
      title: "SAP FICO - Consultant Track",
      description:
        "End-to-end SAP S/4 HANA Finance & Controlling configuration.",
      variant: "consultant",
      duration: "S/4 Hana",
      durationSuffix: "Live",
      modules: "S/4 Hana",
      outcome: "Job-ready FICO Consultant",
      highlights: [
        "Full configuration on S/4 HANA (Incl. ECC vs S/4 HANA differences)",
        "GST & TDS configuration + posting",
        "Asset According end-to-end with AUC capitalisation",
      ],
      ctaLabel: "View course details",
      ctaHref: "/courses/sap-fico-consultant-track",
    },
    {
      id: "end-user-track",
      title: "SAP FICO - End User Track",
      description:
        "End-to-end SAP S/4 HANA Finance & Controlling configuration.",
      variant: "end-user",
      duration: "S/4 Hana",
      durationSuffix: "Live",
      modules: "S/4 Hana",
      outcome: "Job-ready FICO Consultant",
      highlights: [
        "Full configuration on S/4 HANA (Incl. ECC vs S/4 HANA differences)",
        "GST & TDS configuration + posting",
        "Asset According end-to-end with AUC capitalisation",
      ],
      ctaLabel: "View course details",
      ctaHref: "/courses/sap-fico-end-user-track",
    },
  ] satisfies CourseOffering[],
} as const;

export const learningApproachSection = {
  title: "Built for the way",
  titleHighlight: "Consultants Learn.",
  description:
    "Not 200-hour video libraries. A small live cohort, daily mentor reviews, and project tickets straight from real S/4 HANA rollouts.",
  ctaLabel: "Explore Curriculum",
  ctaHref: "/#courses",
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
} as const;

export const trackComparisonSection = {
  eyebrow: "which track is for you",
  title: "Which SAP FICO career is",
  titleHighlight: "Right for you?",
  signpostImage: "/images/courses/track-signpost.png",
  tracks: [
    {
      id: "consultant-track",
      badge: "Consultant track",
      badgeVariant: "consultant" as const,
      personaPrefix: "The",
      persona: "Builder",
      personaDescription:
        "Design, configure & implement SAP solutions for businesses.",
      image: "/images/courses/track-builder.png",
      imageAlt: "SAP FICO consultant track illustration",
      workLabel: "you'll work on",
      workItems: [
        "System Design & Configuration",
        "End-to-end Implementation",
        "User Acceptance Testing",
        "Performance Optimization",
        "Post-Deployment Support",
      ],
      toolsLabel: "TOOLS YOU'LL TOUCH",
      tools: ["SAP S/4 HANA", "SAP GUI", "SAP Fiori", "SAP Business"],
      outcomeLabel: "OUTCOME",
      outcome: "Become a SAP FICO Consultant",
      tags: ["High Growth", "High Respect", "High Earning"],
    },
    {
      id: "end-user-track",
      badge: "End-User Track",
      badgeVariant: "end-user" as const,
      personaPrefix: "The",
      persona: "Operator",
      personaDescription:
        "Design, configure & implement SAP solutions for businesses.",
      image: "/images/courses/track-operator.png",
      imageAlt: "SAP FICO end-user track illustration",
      workLabel: "you'll work on",
      workItems: [
        "System Design & Configuration",
        "End-to-end Implementation",
        "User Acceptance Testing",
        "Performance Optimization",
        "Post-Deployment Support",
      ],
      toolsLabel: "TOOLS YOU'LL TOUCH",
      tools: ["SAP S/4 HANA", "SAP GUI", "SAP Fiori", "SAP Business"],
      outcomeLabel: "OUTCOME",
      outcome: "Become a SAP FICO Consultant",
      tags: ["High Growth", "High Respect", "High Earning"],
    },
  ],
} as const;

/** Figma 46:446 — same FAQ rows; question copy matches courses frame. */
export const coursesFaqSection = {
  eyebrow: ourStoryFaq.eyebrow,
  title: ourStoryFaq.title,
  highlight: ourStoryFaq.highlight,
  helperText: ourStoryFaq.helperText,
  askLinkLabel: ourStoryFaq.askLinkLabel,
  askLinkHref: ourStoryFaq.askLinkHref,
  items: [
    {
      question: "Do i need prior SAP experience to join?",
      answer: ourStoryFaq.items[0].answer,
    },
    {
      question: "What are the prerequisites for SAP training?",
      answer: ourStoryFaq.items[1].answer,
    },
    {
      question: "How long does the SAP certification process take?",
      answer: ourStoryFaq.items[2].answer,
    },
    {
      question: "Are there online resources available for SAP learning?",
      answer: ourStoryFaq.items[3].answer,
    },
    {
      question: "What is the average salary for SAP consultants?",
      answer: ourStoryFaq.items[4].answer,
    },
    {
      question: "Can I specialize in a specific module of SAP?",
      answer: ourStoryFaq.items[5].answer,
    },
  ],
} as const;
