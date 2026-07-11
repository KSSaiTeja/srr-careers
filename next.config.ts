import path from "path";
import { fileURLToPath } from "url";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/courses/campus-free-training",
        destination: "/courses/campus-recruitment-training",
        permanent: true,
      },
      {
        source: "/workshops/campus-recruitment-training",
        destination: "/courses/campus-recruitment-training",
        permanent: true,
      },
      {
        source: "/workshops/commerce-connect-mentoring-programme",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/workshops/skill-development-for-accounts-finance-students",
        destination:
          "/workshops/skills-development-blueprint-for-accounts-finance-students",
        permanent: true,
      },
      {
        source: "/workshops/workshop-on-personal-finance",
        destination: "/workshops/build-wealth-beat-inflation-retire-smart",
        permanent: true,
      },
    ];
  },
  serverExternalPackages: [
    "@payloadcms/db-sqlite",
    "@payloadcms/drizzle",
    "@libsql/client",
  ],
  outputFileTracingIncludes: {
    "**/*": ["node_modules/@libsql/**/*"],
  },
  turbopack: {
    root: projectRoot,
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
