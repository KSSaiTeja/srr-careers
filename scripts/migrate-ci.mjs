import { spawnSync } from "node:child_process";

const isCI =
  process.env.CI === "true" ||
  process.env.CI === "1" ||
  process.env.VERCEL === "1";

const result = spawnSync("npx", ["payload", "migrate"], {
  stdio: isCI ? ["pipe", "inherit", "inherit"] : "inherit",
  input: isCI ? "y\n" : undefined,
  env: process.env,
});

process.exit(result.status ?? 1);
