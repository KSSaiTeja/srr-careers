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
