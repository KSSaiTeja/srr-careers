import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const CourseDetails: CollectionConfig = {
  slug: "course-details",
  labels: {
    singular: "Course Detail Page",
    plural: "Course Detail Pages",
  },
  admin: {
    group: "Website Pages",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
    description:
      "Individual course pages at /courses/<slug> (e.g. the Consultant Track and End User Track detail pages). Changes go live after you click Save.",
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Internal name",
          required: true,
          admin: {
            width: "50%",
            description: "Shown in the admin list only.",
          },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: {
            width: "50%",
            description:
              "URL path under /courses/ — e.g. sap-fico-consultant-track.",
          },
        },
      ],
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "SEO",
          name: "meta",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
        {
          label: "Intro",
          name: "intro",
          fields: [
            { name: "pageTitle", type: "text", required: true },
            { name: "headline", type: "text", required: true },
            { name: "headlineHighlight", type: "text", required: true },
            { name: "subtext", type: "textarea" },
          ],
        },
        {
          label: "Overview",
          name: "overview",
          fields: [
            { name: "description", type: "textarea", required: true },
            {
              type: "row",
              fields: [
                {
                  name: "price",
                  type: "number",
                  label: "Price (₹, whole rupees)",
                  admin: { width: "50%", description: "Course fee for checkout." },
                },
                {
                  name: "originalPrice",
                  type: "number",
                  label: "Original price (₹, optional)",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "primaryCta",
                  type: "text",
                  defaultValue: "Enroll Now",
                  admin: { width: "50%" },
                },
                {
                  name: "secondaryCta",
                  type: "text",
                  defaultValue: "Explore Curriculum",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "secondaryCtaHref",
              type: "text",
              defaultValue: "#syllabus",
            },
            {
              type: "row",
              fields: [
                {
                  name: "moduleCount",
                  type: "text",
                  admin: { width: "30%" },
                },
                {
                  name: "moduleLabel",
                  type: "text",
                  defaultValue: "Modules",
                  admin: { width: "70%" },
                },
              ],
            },
            { name: "moduleBlurb", type: "textarea" },
            {
              name: "metaCards",
              type: "array",
              label: "Meta cards",
              maxRows: 4,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: "icon",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Duration", value: "duration" },
                    { label: "Modules", value: "modules" },
                    { label: "Format", value: "format" },
                    { label: "Outcome", value: "outcome" },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "value",
                      type: "text",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "valueSuffix",
                      type: "text",
                      admin: { width: "20%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Who is it for",
          name: "whoIsItFor",
          fields: [
            { name: "eyebrow", type: "text", defaultValue: "who is it for" },
            { name: "title", type: "text", required: true },
            { name: "titleHighlight", type: "text", required: true },
            {
              name: "audience",
              type: "textarea",
              label: "Audience (one per line)",
              required: true,
            },
            {
              name: "handsOnTitle",
              type: "text",
              defaultValue: "Hands-on with real systems.",
            },
            { name: "handsOnDescription", type: "textarea" },
            {
              name: "handsOnFeatures",
              type: "textarea",
              label: "Hands-on features (one per line)",
              required: true,
            },
          ],
        },
        {
          label: "Syllabus",
          name: "syllabus",
          fields: [
            { name: "eyebrow", type: "text", defaultValue: "Curriculum" },
            { name: "title", type: "text", defaultValue: "Full Syllabus" },
            {
              name: "items",
              type: "array",
              label: "Modules",
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "number",
                      type: "text",
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
                { name: "description", type: "textarea" },
                {
                  name: "topics",
                  type: "textarea",
                  label: "Topics (one per line)",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Also offered + CTA",
          name: "footerBlocks",
          fields: [
            {
              name: "alsoOffered",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  defaultValue: "Also offered",
                },
                { name: "title", type: "text", required: true },
                { name: "href", type: "text", required: true },
                {
                  name: "ctaLabel",
                  type: "text",
                  defaultValue: "Explore Course Details",
                },
              ],
            },
            {
              name: "limitedSeatsCta",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  defaultValue: "NEXT BATCH STARTS SOON",
                },
                {
                  name: "titleLine1",
                  type: "text",
                  defaultValue: "Limited Seats.",
                },
                {
                  name: "titleLine2",
                  type: "text",
                  defaultValue: "Reserve yours.",
                },
                { name: "description", type: "textarea" },
                {
                  type: "row",
                  fields: [
                    {
                      name: "ctaLabel",
                      type: "text",
                      defaultValue: "Book a Free Demo",
                      admin: { width: "50%" },
                    },
                    {
                      name: "ctaHref",
                      type: "text",
                      defaultValue: "#pre-footer",
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "FAQ",
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
                  defaultValue: "#pre-footer",
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
