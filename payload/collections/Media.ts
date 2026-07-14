import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description:
      "Upload images here (hero photo, instructor photo, etc.), then pick them on the Home Page.",
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    // Used only for local/dev when BLOB_READ_WRITE_TOKEN is unset.
    // On Vercel, @payloadcms/storage-vercel-blob takes over (disableLocalStorage).
    staticDir: "public/media",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Image description (for accessibility)",
      admin: {
        description:
          "Short text describing the image — e.g. “Students learning SAP on laptops”.",
      },
    },
  ],
};
