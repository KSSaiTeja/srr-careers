import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: {
    singular: "Blog Post",
    plural: "Blog Posts",
  },
  admin: {
    group: "Website Pages",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
    description:
      "Articles shown on /blog and /blog/<slug>. Changes go live after you click Save.",
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
          admin: { width: "50%", description: "Shown in the admin list only." },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: {
            width: "50%",
            description: "URL path under /blog/ — e.g. sap-fico-career-roadmap.",
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
          label: "Content",
          name: "content",
          fields: [
            { name: "title", type: "text", required: true },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              admin: { description: "Shown on cards and at the top of the post." },
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Optional. Leave empty to use an on-brand gradient banner.",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "author",
                  type: "text",
                  required: true,
                  defaultValue: "Suresh Kumar",
                  admin: { width: "50%" },
                },
                {
                  name: "authorRole",
                  type: "text",
                  defaultValue: "Lead SAP FICO Trainer",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "publishedDate",
                  type: "date",
                  required: true,
                  admin: {
                    width: "50%",
                    date: { pickerAppearance: "dayOnly" },
                  },
                },
                {
                  name: "readTime",
                  type: "text",
                  defaultValue: "6 min read",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "category",
                  type: "text",
                  required: true,
                  defaultValue: "SAP FICO",
                  admin: { width: "50%" },
                },
                {
                  name: "featured",
                  type: "checkbox",
                  label: "Featured post",
                  defaultValue: false,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "tags",
              type: "textarea",
              label: "Tags (one per line)",
            },
          ],
        },
        {
          label: "Article",
          name: "article",
          fields: [
            {
              name: "tableOfContents",
              type: "textarea",
              label: "Table of contents (one per line, optional)",
            },
            {
              name: "body",
              type: "blocks",
              label: "Body",
              blocks: [
                {
                  slug: "paragraph",
                  labels: { singular: "Paragraph", plural: "Paragraphs" },
                  fields: [{ name: "text", type: "textarea", required: true }],
                },
                {
                  slug: "heading",
                  labels: { singular: "Heading", plural: "Headings" },
                  fields: [{ name: "text", type: "text", required: true }],
                },
                {
                  slug: "quote",
                  labels: { singular: "Quote", plural: "Quotes" },
                  fields: [{ name: "text", type: "textarea", required: true }],
                },
                {
                  slug: "list",
                  labels: { singular: "List", plural: "Lists" },
                  fields: [
                    {
                      name: "items",
                      type: "textarea",
                      label: "Items (one per line)",
                      required: true,
                    },
                  ],
                },
                {
                  slug: "image",
                  labels: { singular: "Image", plural: "Images" },
                  fields: [
                    { name: "image", type: "upload", relationTo: "media" },
                    { name: "caption", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
