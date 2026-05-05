import { APP_CONFIG } from '@/shared/configs/appConfig';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', //  Không sử dụng được các tính năng SSR
  distDir: 'release',
  // output: 'standalone', // Build dynamic
  trailingSlash: true, //
  basePath: APP_CONFIG.alias,
  assetPrefix: APP_CONFIG.alias,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
