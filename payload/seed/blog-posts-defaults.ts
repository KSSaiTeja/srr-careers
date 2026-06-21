/**
 * Default Blog Post documents. Each entry mirrors the BlogPosts collection's
 * named-tab shape (meta / content / article). `body` is a blocks array — every
 * block carries its `blockType` discriminator. Cover images are left empty so
 * the frontend renders an on-brand gradient banner; editors can upload a real
 * image per post in the admin.
 */
export const blogPostsDefaults = [
  {
    name: "SAP FICO career roadmap 2026",
    slug: "sap-fico-career-roadmap-2026",
    meta: {
      title: "Your SAP S/4HANA FICO career roadmap for 2026 | SRR Careers",
      description:
        "A step-by-step roadmap to becoming a job-ready SAP S/4HANA FICO consultant in 2026 — skills, milestones, and how to land your first project.",
    },
    content: {
      title: "Your SAP S/4HANA FICO career roadmap for 2026",
      excerpt:
        "The fastest path from finance background to job-ready S/4HANA FICO consultant — the exact skills and milestones that matter this year.",
      author: "Suresh Kumar",
      authorRole: "Lead SAP FICO Trainer",
      publishedDate: "2026-02-12",
      readTime: "8 min read",
      category: "Careers",
      featured: true,
      tags: "SAP FICO\nS/4HANA\nCareers",
    },
    article: {
      tableOfContents:
        "Why FICO is still in demand\nThe core configuration skills\nGetting real project exposure\nLanding your first role",
      body: [
        {
          blockType: "paragraph",
          text: "SAP S/4HANA migrations are still accelerating across mid-market and enterprise finance teams, and that keeps demand for skilled FICO consultants high. But the bar has moved — clients now expect hands-on configuration confidence, not just textbook knowledge.",
        },
        {
          blockType: "heading",
          text: "Why FICO is still in demand",
        },
        {
          blockType: "paragraph",
          text: "Finance and Controlling sits at the heart of every SAP rollout. Every company code, every posting, every report flows through FI and CO, which means a well-trained consultant is involved from blueprint to go-live and beyond into support.",
        },
        {
          blockType: "heading",
          text: "The core configuration skills",
        },
        {
          blockType: "list",
          items:
            "Full-cycle FI configuration on S/4HANA (incl. ECC vs S/4HANA differences)\nTaxation structures — GST & TDS configuration and postings\nAsset accounting across the entire lifecycle, AUC & transfers\nIntegration of FI with MM & SD for end-to-end flows",
        },
        {
          blockType: "quote",
          text: "Consultants who can configure with confidence — not just describe a process — are the ones who clear interviews and stay on projects.",
        },
        {
          blockType: "heading",
          text: "Getting real project exposure",
        },
        {
          blockType: "paragraph",
          text: "The single biggest differentiator is practising on a live S/4HANA system with real client scenarios. Build muscle memory on master data, period-end activities, and the integration touchpoints that come up in every implementation.",
        },
        {
          blockType: "heading",
          text: "Landing your first role",
        },
        {
          blockType: "paragraph",
          text: "Package your hands-on work into a clear story: what you configured, the scenarios you solved, and the outcomes. Pair that with focused interview prep and you will be ready to step into a consultant track role.",
        },
      ],
    },
  },
  {
    name: "ECC vs S/4HANA FICO differences",
    slug: "ecc-vs-s4hana-fico-differences",
    meta: {
      title: "ECC vs S/4HANA: what FICO consultants must relearn | SRR Careers",
      description:
        "The key differences between SAP ECC and S/4HANA for Finance & Controlling — the Universal Journal, new asset accounting, and what changes for consultants.",
    },
    content: {
      title: "ECC vs S/4HANA: what FICO consultants must relearn",
      excerpt:
        "The Universal Journal changed the game. Here is what experienced ECC consultants need to unlearn and relearn for S/4HANA Finance.",
      author: "Suresh Kumar",
      authorRole: "Lead SAP FICO Trainer",
      publishedDate: "2026-01-28",
      readTime: "7 min read",
      category: "S/4HANA",
      featured: false,
      tags: "S/4HANA\nConfiguration\nSAP FICO",
    },
    article: {
      tableOfContents:
        "The Universal Journal\nNew Asset Accounting\nWhat stays the same",
      body: [
        {
          blockType: "paragraph",
          text: "If you trained on ECC, S/4HANA Finance will feel familiar in places and completely new in others. The data model simplification is the headline change, and it ripples through almost everything you configure.",
        },
        {
          blockType: "heading",
          text: "The Universal Journal (ACDOCA)",
        },
        {
          blockType: "paragraph",
          text: "FI and CO are merged into a single line-item table. Reconciliation between modules largely disappears, real-time reporting becomes the default, and the way you think about totals tables and indexes changes fundamentally.",
        },
        {
          blockType: "heading",
          text: "New Asset Accounting",
        },
        {
          blockType: "list",
          items:
            "Parallel valuation handled natively without delta postings\nDepreciation areas post in real time\nA cleaner, more transparent asset lifecycle",
        },
        {
          blockType: "quote",
          text: "You don't throw away your ECC knowledge — you upgrade the mental model around a single source of truth.",
        },
        {
          blockType: "heading",
          text: "What stays the same",
        },
        {
          blockType: "paragraph",
          text: "Core principles of double-entry accounting, organisational structures, and the business processes behind AP, AR, and GL remain. That foundation is exactly why experienced finance professionals transition so well.",
        },
      ],
    },
  },
  {
    name: "Cracking SAP FICO interviews",
    slug: "cracking-sap-fico-interviews",
    meta: {
      title: "How to crack your first SAP FICO consultant interview | SRR Careers",
      description:
        "A practical guide to clearing your first SAP S/4HANA FICO interview — the questions that come up, how to talk about configuration, and red flags to avoid.",
    },
    content: {
      title: "How to crack your first SAP FICO consultant interview",
      excerpt:
        "Interviews reward clarity, not jargon. Here is how to talk about your configuration work in a way that gets you hired.",
      author: "Suresh Kumar",
      authorRole: "Lead SAP FICO Trainer",
      publishedDate: "2026-01-10",
      readTime: "6 min read",
      category: "Interviews",
      featured: false,
      tags: "Interviews\nCareers\nSAP FICO",
    },
    article: {
      tableOfContents:
        "Know your own story\nCommon technical questions\nHow to discuss configuration",
      body: [
        {
          blockType: "paragraph",
          text: "The first interview is rarely about catching you out — it's about confirming you can do the work and communicate clearly with finance stakeholders. Preparation beats nerves every time.",
        },
        {
          blockType: "heading",
          text: "Know your own story",
        },
        {
          blockType: "paragraph",
          text: "Be ready to walk through the configurations you have done end to end. Pick two or three scenarios and rehearse explaining the business need, your solution, and the result.",
        },
        {
          blockType: "heading",
          text: "Common technical questions",
        },
        {
          blockType: "list",
          items:
            "Explain the organisational structure: company code, business area, chart of accounts\nWalk through the procure-to-pay and order-to-cash postings\nHow does asset accounting handle AUC and transfers?\nWhere does FI integrate with MM and SD?",
        },
        {
          blockType: "quote",
          text: "Confidence comes from reps. The more real scenarios you have configured, the calmer you'll be in the room.",
        },
        {
          blockType: "heading",
          text: "How to discuss configuration",
        },
        {
          blockType: "paragraph",
          text: "Speak in business outcomes first, then drop into the configuration detail. Interviewers want to see that you understand why a setting exists, not just where to click.",
        },
      ],
    },
  },
] as const;

export type BlogPostsDefaults = typeof blogPostsDefaults;
