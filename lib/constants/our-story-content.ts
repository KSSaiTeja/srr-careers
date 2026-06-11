import type { LucideIcon } from "lucide-react";
import {
  Building2,
  FileBadge,
  Heart,
  Medal,
  Target,
  Users,
} from "lucide-react";

/** Figma node 31:1093 — page intro (Our Story label + finishing school + metrics). */
export const pageIntro = {
  pageTitle: "Our Story",
  headline: "A finishing school for the next gen",
  headlineHighlight: "SAP FICO",
  headlineSuffix: " Consultants",
  subtext:
    "We are not a marketplace of 200 courses.  Turning ambitious finance professionals into world-class SAP S/4 HANA FICO consultants.",
  metrics: [
    { value: "15,000+", label: "Students Trained", icon: Users },
    { value: "10+Years", label: "of Excellence", icon: FileBadge },
    { value: "800+", label: "Hiring Partners", icon: Building2 },
    { value: "100%", label: "Placement Assistance", icon: Medal },
  ],
} as const;

export type PrincipleCard = {
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const ourValues = {
  title: "Our",
  titleLine2: "Values.",
  intro:
    "At SRR Careers, four principles guide everything we do — how we mentor, what we teach, and who we hire to lead the next batch.",
  /** Exactly 4 cards — first is featured (dark) in Figma Frame42. */
  principles: [
    {
      description:
        "Every decision, every late-night doubt session - the learner comes before the calendar",
      icon: Heart,
    },
    {
      description:
        "Every decision, every late-night doubt session - the learner comes before the calendar",
      icon: Target,
    },
    {
      description:
        "Every decision, every late-night doubt session - the learner comes before the calendar",
      icon: Target,
    },
    {
      description:
        "Every decision, every late-night doubt session - the learner comes before the calendar",
      icon: Target,
    },
  ] satisfies PrincipleCard[],
} as const;

export const excellencePillars = [
  {
    num: "01",
    title: "Real curriculum",
    description:
      "Modules sourced from live S/4 HANA implementation logs at Forture 500 rollouts",
  },
  {
    num: "02",
    title: "1:1 mentorships",
    description:
      "Modules sourced from live S/4 HANA implementation logs at Forture 500 rollouts",
  },
  {
    num: "03",
    title: "1:1 mentorships",
    description:
      "Modules sourced from live S/4 HANA implementation logs at Forture 500 rollouts",
  },
  {
    num: "04",
    title: "1:1 mentorships",
    description:
      "Modules sourced from live S/4 HANA implementation logs at Forture 500 rollouts",
  },
] as const;

export const faqSection = {
  eyebrow: "FAQs",
  title: "Questions we hear,",
  highlight: "before the  demo.",
  helperText:
    "Can't find the answer you're looking for? Drop us a note - a senior counsellor responds within a working day.",
  askLinkLabel: "Ask us anything →",
  askLinkHref: "#pre-footer",
  items: [
    {
      question: "Do I need prior SAP experience to join?",
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
} as const;
