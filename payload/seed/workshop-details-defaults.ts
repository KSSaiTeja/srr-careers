/**
 * Default Workshop Detail documents. Seeds the workshop-details collection on
 * first run and acts as fallback when CMS has no matching slug.
 */

type SeedModule = { title: string; duration?: string };
type SeedSession = {
  label: string;
  time?: string;
  modules: SeedModule[];
};
type SeedFormat = {
  formatId: string;
  title: string;
  duration: string;
  note?: string;
  audience?: string;
  modules: SeedModule[];
};

export type WorkshopDetailSeed = {
  name: string;
  slug: string;
  sortOrder: number;
  published: boolean;
  navLabel: string;
  meta: {
    title?: string;
    description?: string;
  };
  card: {
    eyebrow: string;
    title: string;
    summary: string;
    durationBaseline?: string;
  };
  detail: {
    description: string;
    mode?: string;
    speaker?: string;
    audience?: string;
    highlights: { text: string }[];
    courseDetailSlug?: string;
  };
  agenda: {
    layout: "modules" | "sessions" | "formats" | "none";
    modules?: SeedModule[];
    sessions?: SeedSession[];
    formats?: SeedFormat[];
  };
};

export const workshopDetailsDefaults: WorkshopDetailSeed[] = [
  {
    name: "Career Pathways and Success Strategies",
    slug: "career-pathways-and-success-strategies",
    sortOrder: 10,
    published: true,
    navLabel: "Career Pathways and Success Strategies",
    meta: {},
    card: {
      eyebrow: "Careers",
      title:
        "Career Pathways and Success Strategies for Degree and Postgraduates in India (Accounts & Finance)",
      summary:
        "Career opportunities, roadmaps, and success strategies for Accounts & Finance graduates.",
      durationBaseline: "3 hours (including Q&A)",
    },
    detail: {
      description:
        "Map career opportunities in Accounts & Finance, build a clear roadmap from foundation to specialist and leadership tracks, and leave with practical success strategies — including a salary overview for the field.",
      audience:
        "Degree and postgraduate students in Accounts & Finance; students, job seekers, and professionals preparing for interviews",
      mode: "Classroom / Online interactive workshop",
      highlights: [
        { text: "Career roadmap in Accounts & Finance" },
        { text: "Foundation → skill-building → specialist → leadership" },
        { text: "Salary overview and a practical success formula" },
      ],
    },
    agenda: {
      layout: "modules",
      modules: [
        { title: "Introduction to Career Opportunities", duration: "20 mins" },
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
  },
  {
    name: "Skills Development Blueprint",
    slug: "skills-development-blueprint-for-accounts-finance-students",
    sortOrder: 20,
    published: true,
    navLabel: "Skills Development Blueprint",
    meta: {},
    card: {
      eyebrow: "Skills",
      title: "Skills Development Blueprint for Accounts & Finance Students",
      summary:
        "A skills blueprint bridging classroom theory and real-world Accounts & Finance practice.",
      durationBaseline: "5 hours",
    },
    detail: {
      description:
        "Bridge the gap between academic learning and workplace expectations. Cover technical, domain, digital, and professional skills — plus role-focused tracks for accountants, management accountants, and banking operations.",
      audience:
        "Commerce and Management Graduates (B.Com, BBA, MBA, M.Com, etc.)",
      mode: "Classroom / Online interactive workshop",
      highlights: [
        { text: "Technical, domain & digital skill drills" },
        { text: "Professional mindset for long-term success" },
        {
          text: "Role focus: Accountant, Management Accountant & Banking",
        },
      ],
    },
    agenda: {
      layout: "modules",
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
  },
  {
    name: "Ultimate Resume Writing Workshop",
    slug: "ultimate-resume-writing-workshop",
    sortOrder: 30,
    published: true,
    navLabel: "Ultimate Resume Writing Workshop",
    meta: {},
    card: {
      eyebrow: "Placements",
      title: "Ultimate Resume Writing Workshop",
      summary:
        "Craft a stronger resume, fix common errors, and strengthen your professional online presence.",
      durationBaseline: "3 hours (including Q&A)",
    },
    detail: {
      description:
        "A focused resume workshop covering formats, essential sections, compelling content, design tips, common errors, professional profiles, and AI tools for resume writing and interview preparation.",
      audience:
        "Students, job seekers, and professionals preparing for interviews",
      mode: "Classroom / Online interactive workshop",
      highlights: [
        { text: "Resume formats, sections, and compelling content" },
        { text: "Design tips and common error fixes" },
        { text: "AI tools for resume writing and interview prep" },
      ],
    },
    agenda: {
      layout: "modules",
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
  },
  {
    name: "Resume Writing and Interview Preparation",
    slug: "resume-writing-and-interview-preparation",
    sortOrder: 40,
    published: true,
    navLabel: "Resume Writing and Interview Preparation",
    meta: {},
    card: {
      eyebrow: "Placements",
      title: "Resume Writing and Interview Preparation Workshop",
      summary:
        "Full placement-ready programme — resume building, interview dynamics, mocks, and career branding.",
      durationBaseline: "5 hours (including mock sessions)",
    },
    detail: {
      description:
        "Hands-on sessions on resume structure, commerce and management role customisation, interview dynamics, FAQs, mock practice with feedback, professional etiquette, and AI-assisted preparation.",
      audience:
        "Commerce and Management Graduates (B.Com, BBA, MBA, M.Com, etc.)",
      mode: "Classroom / Online interactive workshop",
      highlights: [
        { text: "Powerful resumes tailored to commerce & management roles" },
        { text: "Interview dynamics with mock feedback" },
        { text: "AI tools for resume writing and interview prep" },
      ],
    },
    agenda: {
      layout: "modules",
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
  },
  {
    name: "Conceptual and Practical Aspects of GST",
    slug: "conceptual-and-practical-aspects-of-gst",
    sortOrder: 50,
    published: true,
    navLabel: "Conceptual and Practical Aspects of GST",
    meta: {},
    card: {
      eyebrow: "Taxation",
      title: "Conceptual and Practical Aspects of GST",
      summary:
        "GST concepts in the morning, live compliance practice on official portals in the afternoon.",
      durationBaseline: "One day (10:00 AM – 4:00 PM)",
    },
    detail: {
      description:
        "Build a clear conceptual base in GST, then practise registration, e-way bills, invoices, returns, and e-invoicing on the official portals. Designed as an intensive one-day programme for students and early-career finance professionals.",
      audience: "Commerce students and finance professionals",
      mode: "Classroom / Online interactive workshop",
      speaker: "CMA Ganesh Narwade",
      highlights: [
        { text: "Concept-first teaching with live portal demos" },
        {
          text: "Registration, e-way bill, returns & e-invoice walkthroughs",
        },
        { text: "Interactive “Think Fast or Be Last” drill" },
      ],
    },
    agenda: {
      layout: "sessions",
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
            {
              title: "Conceptual understanding of return filings & due dates",
            },
            { title: "Live GST return filing @ gst.gov.in" },
            { title: "Concept of E-Invoice @ einvoice1.gst.gov.in" },
          ],
        },
      ],
    },
  },
  {
    name: "Workshop on Personal Finance",
    slug: "build-wealth-beat-inflation-retire-smart",
    sortOrder: 60,
    published: true,
    navLabel: "Workshop on Personal Finance",
    meta: {},
    card: {
      eyebrow: "Finance",
      title:
        "“Build Wealth, Beat Inflation & Retire Smart” – A Workshop on Personal Finance",
      summary:
        "Practical money skills — compounding, inflation, investments, and life-goal protection planning.",
      durationBaseline: "3 hours (including Q&A)",
    },
    detail: {
      description:
        "A practical personal finance workshop covering time value of money, inflation, investment avenues, mutual funds, and life-goal protection planning — designed for anyone seeking financial independence.",
      audience:
        "Students, working professionals, self-employed, and homemakers seeking financial independence",
      mode: "Classroom / Online interactive workshop",
      highlights: [
        { text: "Time value of money & compounding" },
        { text: "Inflation-aware investment decisions" },
        { text: "Mutual funds, stocks & protection planning" },
      ],
    },
    agenda: {
      layout: "modules",
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
  },
];
