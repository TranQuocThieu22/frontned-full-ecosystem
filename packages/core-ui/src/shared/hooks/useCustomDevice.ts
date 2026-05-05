import { useMediaQuery } from '@mantine/hooks';

export function useCustomDevice() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const isPc = !isTablet; // lớn hơn 1024px

    return {
        isMobile,
        isTablet: isTablet && !isMobile, // từ 769px đến 1024px
        isPc,
    };
}
