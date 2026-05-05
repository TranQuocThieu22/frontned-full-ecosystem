'use client'
import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';
import { theme as baseTheme } from '../libs/mantine/theme';

export interface CustomMantineProviderProps extends Partial<MantineProviderProps> {
    /** Your application */
    children: ReactNode;
}

export default function CustomMantineProvider({
    children, theme = baseTheme, ...props
}: CustomMantineProviderProps) {
    return (
        <MantineProvider
            defaultColorScheme="light"
            theme={theme}
            {...props}
        >
            <Notifications />
            {children}
        </MantineProvider >
    )
}
