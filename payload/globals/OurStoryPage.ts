import type { Field, GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

const iconField: Field = {
  name: "icon",
  type: "select",
  required: true,
  defaultValue: "target",
  options: [
    { label: "Users", value: "users" },
    { label: "Certificate / Badge", value: "file-badge" },
    { label: "Building", value: "building-2" },
    { label: "Medal", value: "medal" },
    { label: "Heart", value: "heart" },
    { label: "Target", value: "target" },
    { label: "Award", value: "award" },
    { label: "Graduation cap", value: "graduation-cap" },
  ],
};

export const OurStoryPage: GlobalConfig = {
  slug: "our-story-page",
  label: "Our Story Page",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The Our Story page (/our-story) — intro + metrics, values, the “We've orchestrated Excellence” pillars, and FAQ. The Mission and Testimonials blocks come from the Home Page global. Changes go live after you click Save.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 · Page intro",
          name: "intro",
          fields: [
            { name: "pageTitle", type: "text", defaultValue: "Our Story" },
            {
              name: "headline",
              type: "text",
              defaultValue: "A finishing school for the next gen",
            },
            {
              type: "row",
              fields: [
                {
                  name: "headlineHighlight",
                  type: "text",
                  label: "Headline highlight (underlined)",
                  defaultValue: "SAP FICO",
                  admin: { width: "50%" },
                },
                {
                  name: "headlineSuffix",
                  type: "text",
                  label: "Headline suffix",
                  defaultValue: " Consultants",
                  admin: { width: "50%" },
                },
              ],
            },
            { name: "subtext", type: "textarea" },
            {
              name: "metrics",
              type: "array",
              label: "Metrics row",
              minRows: 1,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      type: "text",
                      required: true,
                      admin: { width: "40%", description: 'e.g. "15,000+"' },
                    },
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: { width: "60%" },
                    },
                  ],
                },
                iconField,
              ],
            },
          ],
        },
        {
          label: "2 · Values",
          name: "values",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Title line 1",
                  defaultValue: "Our",
                  admin: { width: "50%" },
                },
                {
                  name: "titleLine2",
                  type: "text",
                  label: "Title line 2",
                  defaultValue: "Values.",
                  admin: { width: "50%" },
                },
              ],
            },
            { name: "intro", type: "textarea" },
            {
              name: "principles",
              type: "array",
              label: "Principle cards",
              admin: {
                initCollapsed: true,
                description:
                  "The first card with “Featured” enabled gets the dark style.",
              },
              fields: [
                { name: "description", type: "textarea", required: true },
                {
                  type: "row",
                  fields: [
                    { ...iconField, admin: { width: "60%" } },
                    {
                      name: "featured",
                      type: "checkbox",
                      label: "Featured (dark card)",
                      defaultValue: false,
                      admin: { width: "40%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "3 · Excellence",
          name: "excellence",
          description: "“We've orchestrated Excellence” pillars.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  defaultValue: "We've orchestrated",
                  admin: { width: "50%" },
                },
                {
                  name: "highlight",
                  type: "text",
                  defaultValue: "Excellence.",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "pillars",
              type: "array",
              label: "Pillars",
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "num",
                      type: "text",
                      label: "Number",
                      required: true,
                      admin: { width: "25%", description: 'e.g. "01"' },
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      admin: { width: "75%" },
                    },
                  ],
                },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "4 · FAQ",
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
            { name: "helperText", type: "textarea" },
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
