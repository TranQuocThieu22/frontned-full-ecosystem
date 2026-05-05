import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        "./src/components/index.ts",
        "./src/utils/index.ts",
        "./src/shared/index.ts",
        "./src/utils-v2/index.ts",
        "./src/stores/index.ts",
        "./src/modules-features/index.ts",
        "./src/hooks/index.ts",
        "./src/interfaces/index.ts",
        "./src/core/index.ts",
        "./src/types/index.ts"
    ],

    // splitting: false,
    // treeshake: true,
    format: ['esm'],
    dts: true, // ✅ xuất file .d.ts
    outDir: 'dist',
    external: ['react', 'react-dom', 'next', '@mantine/core', 'react/jsx-runtime', "@storybook/*"],
    clean: true,
    loader: {
        '.css': 'copy', // 👈 giữ lại css module
    },
})