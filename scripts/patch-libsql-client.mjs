import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const connectPath = fileURLToPath(
  new URL(
    "../node_modules/@payloadcms/db-sqlite/dist/connect.js",
    import.meta.url,
  ),
);

const from = "import { createClient } from '@libsql/client';";
const to = "import { createClient } from '@libsql/client/web';";

let source = readFileSync(connectPath, "utf8");

if (source.includes(to)) {
  console.log("[patch-libsql-client] already patched");
  process.exit(0);
}

if (!source.includes(from)) {
  console.warn("[patch-libsql-client] connect.js format changed — skip patch");
  process.exit(0);
}

source = source.replace(from, to);
writeFileSync(connectPath, source);
console.log("[patch-libsql-client] patched @payloadcms/db-sqlite to use @libsql/client/web");
