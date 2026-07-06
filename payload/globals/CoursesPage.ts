import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const CoursesPage: GlobalConfig = {
  slug: "courses-page",
  label: "Courses Page",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The Courses page (/courses) — intro, the two track cards (Pick your track), learning approach, track comparison, and FAQ. Changes go live after you click Save.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 · Page intro",
          name: "intro",
          fields: [
            {
              name: "pageTitle",
              type: "text",
              defaultValue: "Our Programs",
            },
            {
              name: "headline",
              type: "text",
              defaultValue: "Two Tracks. One Obsession.",
            },
            {
              name: "headlineHighlight",
              type: "text",
              defaultValue: "FICO done right",
            },
            {
              name: "subtext",
              type: "textarea",
              defaultValue:
                "Whether you're stepping into SAP for the first time or sharpening end-user fluency, every cohort is mentored live by working consultants - never recorded lectures.",
            },
          ],
        },
        {
          label: "2 · Pick your track",
          name: "offerings",
          description: "The two course cards.",
          fields: [
            { name: "eyebrow", type: "text", defaultValue: "Our Offerings" },
            { name: "title", type: "text", defaultValue: "Pick your" },
            {
              name: "titleHighlight",
              type: "text",
              defaultValue: "track.",
            },
            {
              name: "courses",
              type: "array",
              label: "Course cards",
              labels: { singular: "Course card", plural: "Course cards" },
              admin: { initCollapsed: true },
              fields: [
                {
                  name: "variant",
                  type: "select",
                  required: true,
                  defaultValue: "consultant",
                  options: [
                    { label: "Consultant (dark card)", value: "consultant" },
                    { label: "End User (light card)", value: "end-user" },
                  ],
                },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  type: "row",
                  fields: [
                    {
                      name: "duration",
                      type: "text",
                      label: "Duration value",
                      admin: { width: "33%", description: 'e.g. "40 Hrs"' },
                    },
                    {
                      name: "durationSuffix",
                      type: "text",
                      label: "Duration suffix",
                      admin: { width: "33%", description: "Optional, e.g. Live" },
                    },
                    {
                      name: "modules",
                      type: "text",
                      label: "Software value",
                      admin: { width: "34%", description: 'e.g. "S/4Hana"' },
                    },
                  ],
                },
                { name: "outcome", type: "text", required: true },
                {
                  type: "row",
                  fields: [
                    {
                      name: "price",
                      type: "number",
                      label: "Price (₹, whole rupees)",
                      admin: {
                        // Price is managed centrally in Course Details → Overview
                        // → Price (the single source of truth for the card, the
                        // course page, and the Razorpay charge). Hidden here to
                        // avoid a duplicate, conflicting input.
                        hidden: true,
                        width: "50%",
                      },
                    },
                    {
                      name: "originalPrice",
                      type: "number",
                      label: "Original price (₹, optional)",
                      admin: {
                        hidden: true,
                        width: "50%",
                      },
                    },
                  ],
                },
                {
                  name: "highlights",
                  type: "textarea",
                  label: "Highlights (one per line)",
                  required: true,
                  admin: {
                    description:
                      "Each line becomes a checklist item on the card.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "ctaLabel",
                      type: "text",
                      label: "Button text",
                      admin: { width: "40%" },
                    },
                    {
                      name: "ctaHref",
                      type: "text",
                      label: "Button link",
                      admin: { width: "60%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "3 · Learning approach",
          name: "learningApproach",
          description: "“Built for the way Consultants Learn” section.",
          fields: [
            {
              name: "title",
              type: "text",
              defaultValue: "Built for the way",
            },
            {
              name: "titleHighlight",
              type: "text",
              defaultValue: "Consultants Learn.",
            },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "Not 200-hour video libraries. A small live cohort, daily mentor reviews, and project tickets straight from real SAP S/4Hana rollouts, implementations & support projects.",
            },
            {
              type: "row",
              fields: [
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Button text",
                  defaultValue: "Explore Curriculum",
                  admin: { width: "40%" },
                },
                {
                  name: "ctaHref",
                  type: "text",
                  label: "Button link",
                  defaultValue: "/#courses",
                  admin: { width: "60%" },
                },
              ],
            },
            {
              name: "stats",
              type: "group",
              label: "Stat cards",
              fields: [
                {
                  name: "maxSeats",
                  type: "group",
                  label: "Card — Max seats",
                  fields: [
                    { name: "value", type: "text", defaultValue: "24" },
                    {
                      name: "label",
                      type: "text",
                      defaultValue: "Max seats per cohort",
                    },
                    {
                      name: "description",
                      type: "textarea",
                      defaultValue:
                        "Small batches so every learner gets airtime, weekly reviews, and a direct line to the mentor.",
                    },
                  ],
                },
                {
                  name: "mentorLed",
                  type: "group",
                  label: "Card — Mentor-led",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      defaultValue: "Mentor-led",
                    },
                    {
                      name: "description",
                      type: "textarea",
                      defaultValue:
                        "Every session is live with a working SAP consultant. Questions answered in the moment.",
                    },
                  ],
                },
                {
                  name: "rating",
                  type: "group",
                  label: "Card — Rating",
                  fields: [
                    { name: "value", type: "text", defaultValue: "4.8" },
                    { name: "suffix", type: "text", defaultValue: "/5" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "4 · Track comparison",
          name: "trackComparison",
          description: "“Which SAP FICO career is right for you?” cards.",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              defaultValue: "which track is for you",
            },
            {
              name: "title",
              type: "text",
              defaultValue: "Which SAP FICO career is",
            },
            {
              name: "titleHighlight",
              type: "text",
              defaultValue: "Right for you?",
            },
            {
              name: "tracks",
              type: "array",
              label: "Track cards",
              labels: { singular: "Track card", plural: "Track cards" },
              admin: { initCollapsed: true },
              fields: [
                {
                  name: "badgeVariant",
                  type: "select",
                  label: "Card style",
                  required: true,
                  defaultValue: "consultant",
                  options: [
                    { label: "Consultant (navy)", value: "consultant" },
                    { label: "End User (gold)", value: "end-user" },
                  ],
                },
                { name: "badge", type: "text", label: "Badge text", required: true },
                {
                  type: "row",
                  fields: [
                    {
                      name: "personaPrefix",
                      type: "text",
                      label: "Persona prefix",
                      defaultValue: "The",
                      admin: { width: "30%" },
                    },
                    {
                      name: "persona",
                      type: "text",
                      label: "Persona name",
                      required: true,
                      admin: { width: "70%", description: 'e.g. "Builder"' },
                    },
                  ],
                },
                {
                  name: "personaDescription",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "workLabel",
                  type: "text",
                  defaultValue: "you'll work on",
                },
                {
                  name: "workItems",
                  type: "textarea",
                  label: "Work items (one per line)",
                  required: true,
                },
                {
                  name: "toolsLabel",
                  type: "text",
                  defaultValue: "TOOLS YOU'LL TOUCH",
                },
                {
                  name: "tools",
                  type: "textarea",
                  label: "Tools (one per line)",
                  required: true,
                },
                {
                  name: "outcomeLabel",
                  type: "text",
                  defaultValue: "OUTCOME",
                },
                { name: "outcome", type: "text", required: true },
                {
                  name: "tags",
                  type: "textarea",
                  label: "Tags (one per line)",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "5 · FAQ",
          name: "faq",
          fields: [
            { name: "eyebrow", type: "text", defaultValue: "FAQs" },
            {
              name: "title",
              type: "text",
              defaultValue: "Questions we hear,",
            },
            {
              name: "highlight",
              type: "text",
              defaultValue: "before the  demo.",
            },
            {
              name: "helperText",
              type: "textarea",
              defaultValue:
                "Can't find the answer you're looking for? Drop us a note - a senior counsellor responds within a working day.",
            },
            {
              type: "row",
              fields: [
                {
                  name: "askLinkLabel",
                  type: "text",
                  defaultValue: "Ask us anything →",
                  admin: { width: "50%" },
                },
                {
                  name: "askLinkHref",
                  type: "text",
                  defaultValue: "#demo-class",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "items",
              type: "array",
              label: "Questions",
              admin: { initCollapsed: true },
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
