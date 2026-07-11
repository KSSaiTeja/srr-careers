import type { NavChildLink } from "@/lib/types/site-settings-content";

/**
 * Canonical Courses dropdown structure.
 * Injected for the `/courses` nav item so the IA stays correct even if CMS
 * still has the older flat Consultant / End User list.
 *
 * SAP FICO S/4 HANA is a non-clickable group — hover (desktop) or expand
 * (mobile) reveals its tracks.
 *
 * Workshops (including Campus Recruitment Training) live under `/workshops`.
 */
export const coursesNavChildren: NavChildLink[] = [
  {
    label: "SAP FICO S/4 HANA",
    href: "#",
    isGroup: true,
    children: [
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
    label: "Advanced Excel",
    href: "/courses/advanced-excel",
  },
];
