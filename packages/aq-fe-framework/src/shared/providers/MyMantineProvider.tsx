'use client'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';
import { theme } from "./theme";
export default function MyMantineProvider({ children }: { children?: ReactNode }) {
    return (
        <MantineProvider defaultColorScheme="light" theme={theme}>
            <ModalsProvider labels={{
                confirm: 'Thêm', cancel: 'Huỷ'
            }}>
                <Notifications />
                {children}
            </ModalsProvider>
        </MantineProvider >
    )
}
