import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const connectPath = fileURLToPath(
  new URL(
    "../node_modules/@payloadcms/db-sqlite/dist/connect.js",
    import.meta.url,
  ),
);

const PATCH_MARKER = "srr-careers-libsql-patch";

let source = readFileSync(connectPath, "utf8");

if (source.includes(PATCH_MARKER)) {
  console.log("[patch-libsql-client] already patched");
  process.exit(0);
}

// Remove whichever import the package (or a prior patch) left in place.
source = source.replace(
  /^import \{ createClient \} from '@libsql\/client(?:\/web)?';\n/m,
  "",
);

const helper = `// ${PATCH_MARKER}
async function createSqliteClient(config) {
    const url = config.url ?? '';
    if (url.startsWith('file:')) {
        const { createClient } = await import('@libsql/client');
        return createClient(config);
    }
    const { createClient } = await import('@libsql/client/web');
    return createClient(config);
}
`;

if (!source.includes("export const connect = async function connect")) {
  console.warn("[patch-libsql-client] connect.js format changed — skip patch");
  process.exit(0);
}

source = source.replace(
  "export const connect = async function connect",
  `${helper}\nexport const connect = async function connect`,
);

source = source.replace(
  "this.client = createClient(this.clientConfig);",
  "this.client = await createSqliteClient(this.clientConfig);",
);

writeFileSync(connectPath, source);
console.log(
  "[patch-libsql-client] patched connect.js (file: → native, remote → web)",
);
