import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', //  Không sử dụng được các tính năng SSR
  distDir: 'release',
  basePath: '/school',
  assetPrefix: '/school/',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
