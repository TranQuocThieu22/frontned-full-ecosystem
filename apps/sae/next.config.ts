import { APP_CONFIG } from "@/shared/configs/appConfig";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'release',
  basePath: APP_CONFIG.alias,
  assetPrefix: APP_CONFIG.alias,
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
