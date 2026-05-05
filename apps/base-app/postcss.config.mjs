import { default as sharedPostcssConfig } from "@aq-fe/core-ui/shared/configs/postcss.config.mjs";

export default {
    ...sharedPostcssConfig,
    // Add app-specific plugins if needed
    // plugins: {
    //   ...sharedPostcssConfig.plugins,
    //   'your-extra-plugin': { /* options */ }
    // }
};