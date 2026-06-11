import type { IconName } from "@/components/ui/icon";

export const problemStatements: {
  icon: IconName;
  text: string;
}[] = [
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
];

export const instructorFeatures = {
  left: [
    {
      title: "Accounting Expertise",
      description: "Solid SAP FICO foundation.",
    },
    {
      title: "Finance Insights",
      description: "Practical finance exposure.",
    },
  ],
  right: [
    {
      title: "In-depth Knowledge",
      description: "Deep subject insights.",
    },
    {
      title: "Quality Training",
      description: "Commitment to top-notch training.",
    },
  ],
} as const;

export const curriculumModules = [
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
] as const;

export const testimonials = [
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
] as const;
