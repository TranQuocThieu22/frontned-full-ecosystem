import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'release',
  basePath: '/asm',
  assetPrefix: '/asm/',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);

export default nextConfig;