import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { migrations } from "./migrations";

import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { HomePage } from "./payload/globals/HomePage";
import { seedHomePage } from "./payload/seed/seed-home-page";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function getDatabaseUrl(): string {
  if (process.env.VERCEL && !process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set on Vercel. Add your Turso libsql:// URL under Project Settings → Environment Variables (Production).",
    );
  }

  const url = process.env.DATABASE_URL || "file:./payload.db";

  // Turso HTTP is more reliable than WebSockets on Vercel serverless.
  if (url.startsWith("libsql://") && process.env.VERCEL) {
    return url.replace("libsql://", "https://");
  }

  return url;
}

const databaseUrl = getDatabaseUrl();
const isRemoteDatabase =
  databaseUrl.startsWith("libsql://") || databaseUrl.startsWith("https://");

if (isRemoteDatabase && !process.env.DATABASE_AUTH_TOKEN) {
  throw new Error(
    "DATABASE_AUTH_TOKEN is required when DATABASE_URL uses libsql:// (Turso).",
  );
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET environment variable is required.");
}

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
    prodMigrations: migrations,
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
