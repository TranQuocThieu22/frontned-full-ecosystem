import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  trailingSlash: true, //
  /* config options here */
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};
// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
export default nextConfig;
