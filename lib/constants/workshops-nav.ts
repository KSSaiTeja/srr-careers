import type { NavChildLink } from "@/lib/types/site-settings-content";

/**
 * Canonical Workshops dropdown. Injected for the `/workshops` nav item so the
 * IA stays correct even if CMS nav is still flat / outdated.
 */
export const workshopsNavChildren: NavChildLink[] = [
  {
    label: "Career Pathways and Success Strategies",
    href: "/workshops/career-pathways-and-success-strategies",
  },
  {
    label: "Skills Development Blueprint",
    href: "/workshops/skills-development-blueprint-for-accounts-finance-students",
  },
  {
    label: "Ultimate Resume Writing Workshop",
    href: "/workshops/ultimate-resume-writing-workshop",
  },
  {
    label: "Resume Writing and Interview Preparation",
    href: "/workshops/resume-writing-and-interview-preparation",
  },
  {
    label: "Conceptual and Practical Aspects of GST",
    href: "/workshops/conceptual-and-practical-aspects-of-gst",
  },
  {
    label: "Workshop on Personal Finance",
    href: "/workshops/build-wealth-beat-inflation-retire-smart",
  },
];
