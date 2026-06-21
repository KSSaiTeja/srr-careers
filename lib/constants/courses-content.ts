import { coursesPageDefaults } from "@/payload/seed/courses-page-defaults";

export type {
  CourseOffering,
  CourseOfferingVariant,
} from "@/lib/types/courses-page-content";

/**
 * FAQ content reused by the course detail pages. Sourced from the Courses Page
 * defaults so copy stays consistent; course detail pages will move to the CMS
 * in a later step.
 */
export const coursesFaqSection = coursesPageDefaults.faq;

/**
 * Static highlight cards used by the (currently unrendered)
 * ProgramsHighlightsSection. All editable page copy now lives in the
 * "Courses Page" Payload global.
 */
export const programsHighlights = {
  toolsConnected: {
    title: "Tools Connected",
    avatars: [
      "/images/courses/tool-avatar-1.png",
      "/images/courses/tool-avatar-2.png",
      "/images/courses/tool-avatar-3.png",
    ],
    rows: [
      { label: "Practice sandbox", status: "Live" },
      { label: "Development environment", status: "Staging" },
      { label: "Production server", status: "Active" },
    ],
  },
  cohortFocus: {
    value: "92",
    suffix: "%",
    label: "Daily Attendance",
  },
  careerAcceleration: {
    value: "10",
    valueAccent: "X",
    title: "Career Acceleration",
    description:
      "Boost your hiring speed with our mentor-led, project first curriculum.",
  },
} as const;
