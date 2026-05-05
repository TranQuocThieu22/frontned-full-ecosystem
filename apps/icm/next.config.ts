import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'release',
  basePath: '/icm',
  assetPrefix: '/icm/',
  trailingSlash: true,
  transpilePackages: ["@schedule-x/theme-default", "aq-fe-framework"],
  // experimental: {
  //   optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  // },
};

export default nextConfig;
