import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'release',
  basePath: '/scm',
  assetPrefix: '/scm/',
  trailingSlash: true,
  transpilePackages: ["@schedule-x/theme-default", "aq-fe-framework"],
  // experimental: {
  //   optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  // },
};

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);

export default nextConfig;