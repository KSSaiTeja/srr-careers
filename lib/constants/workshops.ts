/**
 * Workshop programmes listed under `/workshops`.
 * Source: client workshop docs only (6 programmes). Duration and price are
 * customisable — doc lengths are sample agendas / baselines.
 */
export const WORKSHOP_PRICING_LABEL = "Customisable";

export const WORKSHOP_PRICING_NOTE =
  "Fees tailored to campus or corporate batch size.";

export const WORKSHOP_DURATION_LABEL = "Customisable";

export const WORKSHOP_DURATION_NOTE =
  "Sample agenda below — length can be tailored to your institution or batch.";

export type WorkshopModule = {
  title: string;
  duration?: string;
};

export type WorkshopSession = {
  label: string;
  time?: string;
  modules: WorkshopModule[];
};

export type WorkshopFormat = {
  id: string;
  title: string;
  duration: string;
  note?: string;
  audience?: string;
  modules: WorkshopModule[];
};

export type WorkshopDefinition = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  /** When set, render the existing course-detail experience for this slug. */
  courseDetailSlug?: string;
  highlights: string[];
  /** Sample / baseline length from the source agenda — not a fixed quote. */
  durationBaseline?: string;
  audience?: string;
  mode?: string;
  speaker?: string;
  /** Single agenda (used when there is one format / one day flow). */
  modules?: WorkshopModule[];
  /** Split agenda blocks, e.g. morning / afternoon. */
  sessions?: WorkshopSession[];
  /** Alternate lengths of the same programme (e.g. 3hr vs 5hr). */
  formats?: WorkshopFormat[];
};

export const workshops: WorkshopDefinition[] = [
  {
    slug: "career-pathways-and-success-strategies",
    title:
      "Career Pathways and Success Strategies for Degree and Postgraduates in India (Accounts & Finance)",
    eyebrow: "Careers",
    summary:
      "Career opportunities, roadmaps, and success strategies for Accounts & Finance graduates.",
    description:
      "Map career opportunities in Accounts & Finance, build a clear roadmap from foundation to specialist and leadership tracks, and leave with practical success strategies — including a salary overview for the field.",
    durationBaseline: "3 hours (including Q&A)",
    audience:
      "Degree and postgraduate students in Accounts & Finance; students, job seekers, and professionals preparing for interviews",
    mode: "Classroom / Online interactive workshop",
    highlights: [
      "Career roadmap in Accounts & Finance",
      "Foundation → skill-building → specialist → leadership",
      "Salary overview and a practical success formula",
    ],
    modules: [
      {
        title: "Introduction to Career Opportunities",
        duration: "20 mins",
      },
      {
        title: "Career Roadmap in Accounts & Finance",
        duration: "25 mins",
      },
      { title: "Foundation", duration: "30 mins" },
      { title: "Skill Building", duration: "25 mins" },
      { title: "Expert / Specialist Track", duration: "20 mins" },
      {
        title: "Leadership & Strategy (Real-time Examples)",
        duration: "15 mins",
      },
      { title: "Formula for Success", duration: "15 mins" },
      {
        title: "Salary Overview for Accounts & Finance Careers",
        duration: "30 mins",
      },
      { title: "Q&A and Wrap-Up", duration: "10 mins" },
    ],
  },
  {
    slug: "skills-development-blueprint-for-accounts-finance-students",
    title: "Skills Development Blueprint for Accounts & Finance Students",
    eyebrow: "Skills",
    summary:
      "A skills blueprint bridging classroom theory and real-world Accounts & Finance practice.",
    description:
      "Bridge the gap between academic learning and workplace expectations. Cover technical, domain, digital, and professional skills — plus role-focused tracks for accountants, management accountants, and banking operations.",
    durationBaseline: "5 hours",
    audience:
      "Commerce and Management Graduates (B.Com, BBA, MBA, M.Com, etc.)",
    mode: "Classroom / Online interactive workshop",
    highlights: [
      "Technical, domain & digital skill drills",
      "Professional mindset for long-term success",
      "Role focus: Accountant, Management Accountant & Banking",
    ],
    modules: [
      { title: "Technical Skills", duration: "60 mins" },
      { title: "Domain Knowledge", duration: "60 mins" },
      { title: "Digital Skills", duration: "30 mins" },
      { title: "Professional Skills", duration: "25 mins" },
      { title: "Mindset", duration: "25 mins" },
      {
        title: "Long-term Success — with Real-time Examples",
        duration: "30 mins",
      },
      {
        title: "Skill Set Required for an Accountant — What the Role Is About",
        duration: "20 mins",
      },
      {
        title: "Role Focus for Management Accountant",
        duration: "10 mins",
      },
      { title: "Banking Operations Specialist", duration: "40 mins" },
      { title: "Wrap-Up and Q&A", duration: "10 mins" },
    ],
  },
  {
    slug: "ultimate-resume-writing-workshop",
    title: "Ultimate Resume Writing Workshop",
    eyebrow: "Placements",
    summary:
      "Craft a stronger resume, fix common errors, and strengthen your professional online presence.",
    description:
      "A focused resume workshop covering formats, essential sections, compelling content, design tips, common errors, professional profiles, and AI tools for resume writing and interview preparation.",
    durationBaseline: "3 hours (including Q&A)",
    audience:
      "Students, job seekers, and professionals preparing for interviews",
    mode: "Classroom / Online interactive workshop",
    highlights: [
      "Resume formats, sections, and compelling content",
      "Design tips and common error fixes",
      "AI tools for resume writing and interview prep",
    ],
    modules: [
      { title: "Introduction to Resume Writing", duration: "20 mins" },
      { title: "Types and Formats of Resumes", duration: "25 mins" },
      { title: "Essential Resume Sections", duration: "30 mins" },
      { title: "Writing Compelling Resume Content", duration: "25 mins" },
      { title: "Design and Formatting Tips", duration: "20 mins" },
      { title: "Common Errors and How to Fix Them", duration: "15 mins" },
      {
        title: "Professional Profiles and Online Presence",
        duration: "15 mins",
      },
      {
        title: "Using AI Tools for Resume Writing and Interview Preparation",
        duration: "30 mins",
      },
      { title: "Q&A and Wrap-Up", duration: "10 mins" },
    ],
  },
  {
    slug: "resume-writing-and-interview-preparation",
    title: "Resume Writing and Interview Preparation Workshop",
    eyebrow: "Placements",
    summary:
      "Full placement-ready programme — resume building, interview dynamics, mocks, and career branding.",
    description:
      "Hands-on sessions on resume structure, commerce and management role customisation, interview dynamics, FAQs, mock practice with feedback, professional etiquette, and AI-assisted preparation.",
    durationBaseline: "5 hours (including mock sessions)",
    audience:
      "Commerce and Management Graduates (B.Com, BBA, MBA, M.Com, etc.)",
    mode: "Classroom / Online interactive workshop",
    highlights: [
      "Powerful resumes tailored to commerce & management roles",
      "Interview dynamics with mock feedback",
      "AI tools for resume writing and interview prep",
    ],
    modules: [
      {
        title: "Career Overview and Industry Expectations",
        duration: "30 mins",
      },
      { title: "Fundamentals of Resume Writing", duration: "30 mins" },
      { title: "Building a Powerful Resume", duration: "40 mins" },
      {
        title: "Customizing Resumes for Commerce and Management Roles",
        duration: "20 mins",
      },
      { title: "Design and Visual Presentation", duration: "30 mins" },
      {
        title: "Introduction to Interview Dynamics",
        duration: "25 mins",
      },
      {
        title: "Skills Needed to Crack Interviews",
        duration: "25 mins",
      },
      {
        title:
          "Frequently Asked Questions in Commerce & Management Interviews",
        duration: "30 mins",
      },
      { title: "Mock Interview and Feedback", duration: "20 mins" },
      {
        title: "Professional Etiquette and Career Branding",
        duration: "10 mins",
      },
      {
        title: "Using AI Tools for Resume Writing and Interview Preparation",
        duration: "40 mins",
      },
      { title: "Wrap-Up and Q&A", duration: "10 mins" },
    ],
  },
  {
    slug: "conceptual-and-practical-aspects-of-gst",
    title: "Conceptual and Practical Aspects of GST",
    eyebrow: "Taxation",
    summary:
      "GST concepts in the morning, live compliance practice on official portals in the afternoon.",
    description:
      "Build a clear conceptual base in GST, then practise registration, e-way bills, invoices, returns, and e-invoicing on the official portals. Designed as an intensive one-day programme for students and early-career finance professionals.",
    durationBaseline: "One day (10:00 AM – 4:00 PM)",
    audience: "Commerce students and finance professionals",
    mode: "Classroom / Online interactive workshop",
    speaker: "CMA Ganesh Narwade",
    highlights: [
      "Concept-first teaching with live portal demos",
      "Registration, e-way bill, returns & e-invoice walkthroughs",
      "Interactive “Think Fast or Be Last” drill",
    ],
    sessions: [
      {
        label: "Morning session",
        time: "10:00 AM – 1:00 PM",
        modules: [
          { title: "Introduction to GST" },
          { title: "Taxes subsumed under GST" },
          { title: "Goods & Services Tax Act(s)" },
          { title: "Definition of Goods, Services, HSN & SAC" },
          { title: "Meaning of Supply" },
          { title: "Interstate & Intrastate Supply" },
          { title: "Accounting entries under GST" },
          { title: "Conceptual framework on Registration" },
          { title: "Registration live @ gst.gov.in" },
          { title: "E-way Bill under GST — live @ ewaybillgst.gov.in" },
        ],
      },
      {
        label: "Afternoon session",
        time: "2:00 PM – 4:00 PM",
        modules: [
          { title: "Tax Invoice" },
          { title: "Credit Note & Debit Note" },
          { title: "Value of Supply" },
          { title: "Time of Supply" },
          { title: "Place of Supply" },
          { title: "Input Tax Credit mechanism" },
          { title: "Show time: “Think Fast or Be Last”" },
          { title: "Conceptual understanding of return filings & due dates" },
          { title: "Live GST return filing @ gst.gov.in" },
          { title: "Concept of E-Invoice @ einvoice1.gst.gov.in" },
        ],
      },
    ],
  },
  {
    slug: "build-wealth-beat-inflation-retire-smart",
    title:
      "“Build Wealth, Beat Inflation & Retire Smart” – A Workshop on Personal Finance",
    eyebrow: "Finance",
    summary:
      "Practical money skills — compounding, inflation, investments, and life-goal protection planning.",
    description:
      "A practical personal finance workshop covering time value of money, inflation, investment avenues, mutual funds, and life-goal protection planning — designed for anyone seeking financial independence.",
    durationBaseline: "3 hours (including Q&A)",
    audience:
      "Students, working professionals, self-employed, and homemakers seeking financial independence",
    mode: "Classroom / Online interactive workshop",
    highlights: [
      "Time value of money & compounding",
      "Inflation-aware investment decisions",
      "Mutual funds, stocks & protection planning",
    ],
    modules: [
      { title: "Foundation of Personal Finance", duration: "10 mins" },
      { title: "Time Value of Money & Compounding", duration: "30 mins" },
      { title: "Inflation & Investment Decisions", duration: "10 mins" },
      { title: "Investment Decision Framework", duration: "20 mins" },
      { title: "Investment Avenues", duration: "20 mins" },
      { title: "Mutual Funds & Stock Basics", duration: "30 mins" },
      { title: "Life Goals & Protection Planning", duration: "40 mins" },
      { title: "Q&A", duration: "20 mins" },
    ],
  },
];

export function getWorkshopBySlug(
  slug: string,
): WorkshopDefinition | undefined {
  return workshops.find((workshop) => workshop.slug === slug);
}

export function getWorkshopSlugs(): string[] {
  return workshops.map((workshop) => workshop.slug);
}
