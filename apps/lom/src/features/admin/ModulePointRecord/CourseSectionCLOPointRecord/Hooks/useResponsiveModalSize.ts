import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useResponsiveModalSize(): string {
    const theme = useMantineTheme();

    const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
    const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    const isLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
    const isXl = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
    const isXxl = useMediaQuery(`(max-width: ${theme.breakpoints.xxl})`);

    // if (isXs) return '100%'; // Full width for extra small screens
    // if (isSm) return '90%';
    // if (isMd) return '80%';
    // if (isLg) return '50%';
    // if (isXl) return '50%';
    // if (isXxl) return '50%';

    // // Default size for larger screens
    // return '32%';

    if (isXs) return '100%'; // Full width for extra small screens
    if (isSm) return '500px';
    if (isMd) return '500px';
    if (isLg) return '500px';
    if (isXl) return '500px';
    if (isXxl) return '500px';

    // Default size for larger screens
    return '500px';
}