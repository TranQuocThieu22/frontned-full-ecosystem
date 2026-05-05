import { appConfig } from "@/shared/configs/appConfig";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'release',
  basePath: appConfig.alias,
  assetPrefix: appConfig.alias,
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);

export default nextConfig;