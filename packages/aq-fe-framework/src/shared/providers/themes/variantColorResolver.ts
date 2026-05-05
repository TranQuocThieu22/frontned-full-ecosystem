// theme/variantColorResolver.ts
import {
    darken,
    defaultVariantColorsResolver,
    parseThemeColor,
    rgba,
    VariantColorsResolver,
} from '@mantine/core';

export const variantColorResolver: VariantColorsResolver = (input) => {
    const parsedColor = parseThemeColor({
        color: input.color || input.theme.primaryColor,
        theme: input.theme,
    });

    const defaultColors = defaultVariantColorsResolver(input);

    // Custom "soft" variant
    if (input.variant === 'soft') {
        return {
            background: rgba(parsedColor.value, 0.1),
            hover: rgba(parsedColor.value, 0.15),
            border: `1px solid ${rgba(parsedColor.value, 0.2)}`,
            color: parsedColor.value,
        };
    }

    // Optional: override "light" to be even softer
    if (input.variant === 'light') {
        return {
            background: rgba(parsedColor.value, 0.08),
            hover: rgba(parsedColor.value, 0.12),
            border: `2px solid ${rgba(parsedColor.value, 0.2)}`,
            color: darken(parsedColor.value, 0.2),
        };
    }

    return defaultColors;
};
