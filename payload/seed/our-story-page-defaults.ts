/**
 * Default content for the Our Story page. Seeds the OurStoryPage global on first
 * run and acts as the fallback when the CMS has no value. Shapes mirror the
 * global's named tabs. Icons are stored as names and resolved to Lucide icons in
 * the UI. The Mission and Testimonials blocks on this page reuse the Home Page
 * global, so they are managed there.
 */
export const ourStoryPageDefaults = {
  intro: {
    pageTitle: "Our Story",
    headline: "A finishing school for the next gen",
    headlineHighlight: "SAP FICO",
    headlineSuffix: " Consultants",
    subtext:
      "We are not a marketplace of 200 courses. We do one thing, and we do it better than anyone — turn ambitious finance professionals into world-class SAP S/4HANA FICO consultants through live mentorship and real implementation work.",
    metrics: [
      { value: "15,000+", label: "Students Trained", icon: "users" },
      { value: "10+", label: "Years of Excellence", icon: "file-badge" },
      { value: "800+", label: "Hiring Partners", icon: "building-2" },
      { value: "100%", label: "Placement Assistance", icon: "medal" },
    ],
  },
  values: {
    title: "Our",
    titleLine2: "Values.",
    intro:
      "At SRR Careers, four principles guide everything we do — how we mentor, what we teach, and who we trust to lead the next batch.",
    principles: [
      {
        description:
          "Learners first, always. Every late-night doubt session and rescheduled class exists because your progress matters more than our calendar.",
        icon: "heart",
        featured: true,
      },
      {
        description:
          "We teach what the job demands. Our curriculum is rebuilt from live S/4HANA projects, never recycled slides — so nothing you learn goes to waste.",
        icon: "target",
        featured: false,
      },
      {
        description:
          "Mentors who still consult. You learn from practitioners shipping real implementations, who bring the field straight back into the classroom.",
        icon: "graduation-cap",
        featured: false,
      },
      {
        description:
          "We measure ourselves by placements. Our work isn't done at the last lecture — it's done the day you sign your offer letter.",
        icon: "award",
        featured: false,
      },
    ],
  },
  excellence: {
    title: "We've orchestrated",
    highlight: "Excellence.",
    pillars: [
      {
        num: "01",
        title: "Real-world curriculum",
        description:
          "Every module is reverse-engineered from live S/4HANA rollouts at Fortune 500 enterprises, so you practise the exact scenarios consultants are paid to solve.",
      },
      {
        num: "02",
        title: "1:1 mentorship",
        description:
          "Small cohorts and direct mentor access mean your questions get answered in the moment — never lost in a room of hundreds.",
      },
      {
        num: "03",
        title: "Hands-on SAP sandbox",
        description:
          "You configure, post and troubleshoot in a real SAP environment from day one, building the muscle memory that interviews and projects demand.",
      },
      {
        num: "04",
        title: "Career support to placement",
        description:
          "Resume reviews, mock interviews and 800+ hiring partners turn your new skills into real offers — and a faster route to your first project.",
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
  },
} as const;

export type OurStoryPageDefaults = typeof ourStoryPageDefaults;
