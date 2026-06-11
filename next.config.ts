import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@payloadcms/db-sqlite",
    "@payloadcms/drizzle",
    "@libsql/client",
  ],
  outputFileTracingIncludes: {
    "**/*": ["node_modules/@libsql/**/*"],
  },
  turbopack: {
    resolveAlias: {
      "@libsql/client": "@libsql/client/web",
    },
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve ??= {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      "@libsql/client$": "@libsql/client/web",
    };
    return webpackConfig;
  },
};

export default withPayload(nextConfig);
