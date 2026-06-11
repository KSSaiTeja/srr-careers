import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    description: "Admin accounts that can log in and edit website content.",
  },
  auth: true,
  fields: [],
};
