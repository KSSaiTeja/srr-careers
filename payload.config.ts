import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { HomePage } from "./payload/globals/HomePage";
import { seedHomePage } from "./payload/seed/seed-home-page";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUrl = process.env.DATABASE_URL || "file:./payload.db";
const isRemoteDatabase = databaseUrl.startsWith("libsql://");

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "");
}

function getServerURL(): string | undefined {
  // Local dev must use localhost — if serverURL is the Vercel URL, Payload's CSRF
  // allowlist rejects cookies from http://localhost:3000 and every save returns 403.
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return normalizeUrl(process.env.NEXT_PUBLIC_SERVER_URL);
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return undefined;
}

function getCsrfOrigins(): string[] {
  const origins = new Set<string>(["http://localhost:3000"]);

  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    origins.add(normalizeUrl(process.env.NEXT_PUBLIC_SERVER_URL));
  }

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  return [...origins];
}

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— SRR Careers CMS",
      description: "Manage SRR Careers website content",
    },
  },
  collections: [Users, Media],
  globals: [HomePage],
  editor: lexicalEditor(),
  serverURL: getServerURL(),
  csrf: getCsrfOrigins(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    // Remote Turso DBs should use migrations only — dev push causes duplicate index errors.
    push: !isRemoteDatabase,
    client: {
      url: databaseUrl,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    await seedHomePage(payload);
  },
});
