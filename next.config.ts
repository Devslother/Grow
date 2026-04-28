import type { NextConfig } from "next";
import withSvgr from "next-svgr";
import createMDX from "@next/mdx";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const withMDX = createMDX({
  options: {
    providerImportSource: undefined,
  },
});

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {},
  images: {
    domains: [],
    deviceSizes: [320, 360, 375, 390, 414, 425, 480, 640, 750, 828, 1080, 1200],
  },
  // Optimization for production
  compress: true,
  poweredByHeader: false,
  // Include Prisma Query Engine in build for Netlify
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Copy Prisma Query Engine after build
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        // Copy engine after webpack builds everything
        if (process.env.NODE_ENV === "production") {
          const enginePath = join(
            process.cwd(),
            "src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
          );
          const outputPath = join(process.cwd(), ".next/server/chunks");

          if (existsSync(enginePath)) {
            if (!existsSync(outputPath)) {
              mkdirSync(outputPath, { recursive: true });
            }
            try {
              copyFileSync(
                enginePath,
                join(outputPath, "libquery_engine-rhel-openssl-3.0.x.so.node")
              );
            } catch (error) {
              console.error("Failed to copy Prisma engine in webpack:", error);
            }
          }
        }

        return entries;
      };
    }

    // Configure resolve to support @/ alias in dynamic imports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": join(process.cwd(), "src"),
    };

    // Improve dependency parsing for MDX loader
    if (config.cache && typeof config.cache === "object") {
      config.cache.buildDependencies = {
        ...config.cache.buildDependencies,
        // Keep a stable path for cache invalidation in App Router + TS config.
        // __filename may point to transient next.config.compiled.js.
        config: [join(process.cwd(), "next.config.ts")],
      };
    }

    return config;
  },
};

// Wrap MDX and SVGR configs together
export default withSvgr(withMDX(nextConfig));
