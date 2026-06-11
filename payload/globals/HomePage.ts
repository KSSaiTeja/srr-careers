import type { GlobalConfig } from "payload";
import { iconSelectField } from "../fields/icon-select";

const ctaFields = [
  {
    name: "label",
    type: "text" as const,
    required: true,
    label: "Button text",
  },
  {
    name: "href",
    type: "text" as const,
    required: true,
    label: "Button link",
    admin: {
      description: 'Page path or URL — e.g. "#courses" or "/courses".',
    },
  },
];

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  admin: {
    group: "Website Pages",
    description:
      "Everything visitors see on the homepage (srrcareers.com). Open each tab below — changes go live after you click Save.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 · Hero",
          name: "hero",
          description: "Top banner with headline, buttons, and large photo.",
          fields: [
            {
              name: "badge",
              type: "text",
              label: "Small label above headline",
              defaultValue: "#1 SAP FICO TRAINING INSTITUTE",
            },
            {
              name: "titleLine1",
              type: "text",
              label: "Main headline (first line)",
              defaultValue: "Master SAP FICO with",
            },
            {
              name: "titleAccent",
              type: "text",
              label: "Highlighted headline (second line)",
              defaultValue: "S4 HANA",
            },
            {
              name: "primaryCta",
              type: "group",
              label: "Primary button (gold)",
              fields: ctaFields,
            },
            {
              name: "secondaryCta",
              type: "group",
              label: "Secondary button (outline)",
              fields: ctaFields,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Hero photo",
              admin: {
                description:
                  "Wide image under the headline. Leave empty to use the default site image.",
              },
            },
            {
              name: "imageAlt",
              type: "text",
              label: "Hero photo description",
              defaultValue:
                "Students learning SAP FICO — two students working on laptops",
            },
          ],
        },
        {
          label: "2 · Problem",
          name: "problem",
          description: "“Does this relate to your SAP FICO journey?” section.",
          fields: [
            {
              name: "headingGray",
              type: "text",
              label: "Heading — gray line",
              defaultValue: "Does this relatable to your",
            },
            {
              name: "headingNavy",
              type: "text",
              label: "Heading — navy line",
              defaultValue: "SAP FICO Journey?",
            },
            {
              name: "items",
              type: "array",
              label: "Pain points (6 boxes)",
              minRows: 1,
              maxRows: 12,
              admin: {
                description:
                  "Each row is one concern your visitors might have. Drag to reorder.",
              },
              fields: [
                iconSelectField,
                {
                  name: "text",
                  type: "text",
                  required: true,
                  label: "Text",
                },
              ],
            },
          ],
        },
        {
          label: "3 · Mission",
          name: "mission",
          description: "“Our Mission” stats and alumni highlight.",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              label: "Small section label",
              defaultValue: "Our Mission",
            },
            {
              name: "headingGray",
              type: "text",
              label: "Heading — gray line",
              defaultValue: "Our focus is simple",
            },
            {
              name: "headingNavy",
              type: "text",
              label: "Heading — navy line",
              defaultValue: "Train to deliver.",
            },
            {
              name: "roiCard",
              type: "group",
              label: "Card — Return on investment (top left)",
              fields: [
                {
                  name: "label",
                  type: "text",
                  defaultValue: "RETURN ON INVESTMENT",
                },
                { name: "value", type: "text", defaultValue: "2.4" },
                { name: "suffix", type: "text", defaultValue: "x" },
                {
                  name: "description",
                  type: "textarea",
                  defaultValue:
                    "Average salary jump within 90 days of placement.",
                },
                {
                  name: "partnersLabel",
                  type: "text",
                  label: "Partners row text",
                  defaultValue: "800+ Partners",
                },
              ],
            },
            {
              name: "placementCardTop",
              type: "group",
              label: "Card — Cohort placement (top middle)",
              fields: [
                {
                  name: "label",
                  type: "text",
                  defaultValue: "COHORT PLACEMENT RATE",
                },
                { name: "value", type: "text", defaultValue: "94" },
                { name: "suffix", type: "text", defaultValue: "%" },
                {
                  name: "description",
                  type: "textarea",
                  defaultValue:
                    "Average salary jump within 90 days of placement.",
                },
              ],
            },
            {
              name: "alumniCard",
              type: "group",
              label: "Card — Alumni highlight (tall dark card)",
              fields: [
                {
                  name: "body",
                  type: "textarea",
                  label: "Main paragraph",
                  defaultValue:
                    "We've placed 15,000+ consultants worldwide, helping them break into top SAP practices in the industry",
                },
                { name: "rating", type: "text", defaultValue: "4.8" },
                {
                  name: "ratingSuffix",
                  type: "text",
                  defaultValue: "/5",
                },
                {
                  name: "trustedBy",
                  type: "textarea",
                  label: "Bottom-right text",
                  defaultValue: "TRUSTED BY\n15K+ ALUMNI",
                },
              ],
            },
            {
              name: "placementCardBottom",
              type: "group",
              label: "Card — Cohort placement detail (bottom left)",
              fields: [
                {
                  name: "label",
                  type: "text",
                  defaultValue: "COHORT PLACEMENT RATE",
                },
                { name: "value", type: "text", defaultValue: "94" },
                { name: "suffix", type: "text", defaultValue: "%" },
                {
                  name: "description",
                  type: "textarea",
                  defaultValue:
                    "Average across the last 4 cohorts — most students receive their first offer within 45 days of graduation.",
                },
              ],
            },
            {
              name: "practiceCard",
              type: "group",
              label: "Card — Focused practice (bottom middle)",
              fields: [
                {
                  name: "label",
                  type: "text",
                  defaultValue: "FOCUSED PRACTICE",
                },
                { name: "value", type: "text", defaultValue: "12" },
                {
                  name: "description",
                  type: "text",
                  defaultValue: "Years on SAP FICO",
                },
              ],
            },
          ],
        },
        {
          label: "4 · Instructor",
          name: "instructor",
          description: "About your instructor — photo, bio, and feature bullets.",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              defaultValue: "ABOUT YOUR INSTRUCTOR",
            },
            {
              name: "title",
              type: "text",
              label: "Title — first line",
              defaultValue: "Your personal guide to",
            },
            {
              name: "titleHighlight",
              type: "text",
              label: "Title — highlighted line",
              defaultValue: "SAP FICO Success",
            },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: "Instructor photo",
            },
            {
              name: "journeyHeading",
              type: "text",
              defaultValue: "My Journey:",
            },
            {
              name: "journeyBody",
              type: "textarea",
              defaultValue:
                "Meet Mr. Kumar, a highly experienced and passionate SAP FICO S/4HANA trainer associated with SRR Careers as a Full-Time Trainer, trained 250+ professionals across India, UAE, Qatar & Saudi.",
            },
            {
              name: "skillsHeading",
              type: "text",
              defaultValue: "Hands-on SAP Skills",
            },
            {
              name: "skillsBody",
              type: "text",
              defaultValue:
                "Master SAP FICO with accounting and finance skills.",
            },
            {
              name: "featuresLeft",
              type: "array",
              label: "Feature bullets — left column",
              maxRows: 4,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "text", required: true },
              ],
            },
            {
              name: "featuresRight",
              type: "array",
              label: "Feature bullets — right column",
              maxRows: 4,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "5 · Curriculum",
          name: "curriculum",
          description: "Nine-module syllabus list and syllabus CTA.",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              defaultValue: "CURRICULUM",
            },
            {
              name: "titleLine1",
              type: "text",
              defaultValue: "A nine-module journey",
            },
            {
              name: "titleLine2",
              type: "text",
              label: "Title — second line (before highlight)",
              defaultValue: "to becoming a",
            },
            {
              name: "titleHighlight",
              type: "text",
              defaultValue: "S/4 HANA",
            },
            {
              name: "titleLine2Suffix",
              type: "text",
              label: "Title — text after highlight",
              defaultValue: "consultant",
            },
            {
              name: "modules",
              type: "array",
              label: "Course modules",
              admin: {
                description: "Number, title, and short description for each row.",
              },
              fields: [
                { name: "num", type: "text", required: true, label: "Number" },
                { name: "title", type: "text", required: true },
                { name: "desc", type: "text", required: true, label: "Description" },
              ],
            },
            {
              name: "ctaEyebrow",
              type: "text",
              label: "Bottom box — small label",
              defaultValue: "FULL SYLLABUS",
            },
            {
              name: "ctaTitle",
              type: "text",
              label: "Bottom box — heading",
              defaultValue: "See every topic, every project, every outcome.",
            },
            {
              name: "cta",
              type: "group",
              label: "Bottom box — button",
              fields: ctaFields,
            },
          ],
        },
        {
          label: "6 · Testimonials",
          name: "testimonials",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              defaultValue: "TESTIMONIALS",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Stories from our",
            },
            {
              name: "titleHighlight",
              type: "text",
              defaultValue: "satisfied students",
            },
            {
              name: "items",
              type: "array",
              label: "Student quotes",
              maxRows: 6,
              fields: [
                { name: "name", type: "text", required: true },
                { name: "role", type: "text", required: true, label: "Job title" },
                {
                  name: "initials",
                  type: "text",
                  required: true,
                  admin: {
                    description: "2 letters shown in the avatar circle — e.g. RS",
                  },
                },
                { name: "quote", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "7 · Book a demo",
          name: "preFooter",
          description: "Dark blue enrollment / live demo section at the bottom.",
          fields: [
            {
              name: "badge",
              type: "text",
              label: "Small label",
              defaultValue: "LIMITED SEATS — NEXT BATCH",
            },
            {
              name: "headingLine1",
              type: "text",
              defaultValue: "Book your free SAP",
            },
            {
              name: "headingLine2",
              type: "text",
              defaultValue: "S/4 HANA FICO Live Demo",
            },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "Interact live with SAP industry experts. Get the complete roadmap and syllabus. 100% free — no credit card.",
            },
            {
              name: "phoneButtonLabel",
              type: "text",
              label: "Phone button text",
              admin: {
                description:
                  "Display only — phone number itself is in Site Settings (coming soon).",
              },
              defaultValue: "98485 40123",
            },
            {
              name: "emailButtonLabel",
              type: "text",
              defaultValue: "Email us",
            },
          ],
        },
      ],
    },
  ],
};
