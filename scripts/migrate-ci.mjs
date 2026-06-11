import { spawnSync } from "node:child_process";

const isCI =
  process.env.CI === "true" ||
  process.env.CI === "1" ||
  process.env.VERCEL === "1";

if (process.env.VERCEL === "1") {
  const missing = ["PAYLOAD_SECRET", "DATABASE_URL", "DATABASE_AUTH_TOKEN"].filter(
    (key) => !process.env[key],
  );

  if (missing.length > 0) {
    console.error(
      `[migrate-ci] Missing Vercel environment variables: ${missing.join(", ")}. ` +
        "Add them under Project Settings → Environment Variables (Production) and redeploy.",
    );
    process.exit(1);
  }
}

const result = spawnSync("npx", ["payload", "migrate"], {
  stdio: isCI ? ["pipe", "inherit", "inherit"] : "inherit",
  input: isCI ? "y\n" : undefined,
  env: process.env,
});

process.exit(result.status ?? 1);
