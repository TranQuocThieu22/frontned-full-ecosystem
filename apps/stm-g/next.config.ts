import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'release',
    basePath: '/stm-g',
    assetPrefix: '/stm-g/',
    trailingSlash: true,
    transpilePackages: ['aq-fe-framework'],
    // experimental: {
    //     optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    // },
}

export default nextConfig
