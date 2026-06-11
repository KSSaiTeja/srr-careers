export type NavItem = {
  label: string;
  href: string;
  badge?: boolean;
};

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "#blog" },
  { label: "What's New?", href: "/whats-new", badge: true },
];

export const footerExploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/our-story" },
  { label: "Course", href: "/courses" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#pre-footer" },
] as const;

export const footerCourseLinks = [
  { label: "S/4 HANA FICO", href: "/courses" },
  { label: "Certification Prep", href: "/courses#certification" },
  { label: "Book Live Demo", href: "#pre-footer" },
] as const;
