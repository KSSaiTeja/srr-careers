/**
 * Default content for the Courses listing global (/courses).
 * Seeds on first run and acts as fallback when CMS values are empty.
 */
export const coursesListingDefaults = {
  meta: {
    title: "Courses | SRR Careers",
    description:
      "Explore SRR Careers programmes — SAP FICO S/4HANA tracks and Advanced Excel. Live mentor-led cohorts for finance and accounts professionals.",
  },
  intro: {
    pageTitle: "Courses",
    headline: "Programmes built for finance careers",
    subtext:
      "From SAP FICO certification tracks to Advanced Excel — pick a programme and start with a live mentor-led cohort.",
  },
  cards: {
    durationPrefix: "Duration:",
    pricePrefix: "Price:",
  },
  programs: [
    {
      slug: "sap-fico",
      sortOrder: 0,
      published: true,
      eyebrow: "SAP Programme",
      title: "SAP FICO S/4HANA",
      summary:
        "Two live tracks — Consultant and End User — mentored by working SAP consultants. Compare fees, duration, and outcomes.",
      href: "/courses/sap-fico",
      durationLabel: "15–40 Hours",
      priceLabel: "From ₹15,000",
      navLabel: "SAP FICO S/4HANA",
      isNavGroup: true,
      navChildren: [
        {
          label: "Consultant Track",
          href: "/courses/sap-fico-consultant-track",
        },
        {
          label: "End User Track",
          href: "/courses/sap-fico-end-user-track",
        },
      ],
    },
    {
      slug: "advanced-excel",
      sortOrder: 1,
      published: true,
      eyebrow: "Skills Programme",
      title: "Advanced Excel",
      summary:
        "Practical Excel for accounts and finance — formulas, pivots, dashboards, and workflows you use on the job.",
      href: "/courses/advanced-excel",
      durationLabel: "12–16 Hours",
      priceLabel: "₹15,000",
      navLabel: "Advanced Excel",
      isNavGroup: false,
      navChildren: [],
    },
  ],
};

export type CoursesListingDefaults = typeof coursesListingDefaults;
