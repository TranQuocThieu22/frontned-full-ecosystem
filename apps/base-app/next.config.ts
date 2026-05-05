import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'release',
  // assetPrefix: '/base-app/',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  transpilePackages: ["@aq-fe/core-ui"],
};

export default nextConfig;