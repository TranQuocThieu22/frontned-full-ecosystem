'use client';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function CustomSwitchTheme() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', {
        getInitialValueInEffect: true,
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // hoặc <Skeleton /> nếu bạn muốn placeholder

    return (
        <ActionIcon
            onClick={() =>
                setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
            }
            variant="default"
            size="lg"
            radius="md"
            aria-label="Toggle color scheme"
        >
            {computedColorScheme === 'dark' ? (
                <IconSun width="22px" height="22px" stroke={1.5} />
            ) : (
                <IconMoon width="22px" height="22px" stroke={1.5} />
            )}
        </ActionIcon>
    );
}
