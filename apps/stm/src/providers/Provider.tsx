"use client"
import { APP_CONFIG } from '@/shared/configs/appConfig';
import { useLoadAxiosConfig } from '@aq-fe/core-ui/shared/hooks/useLoadAxiosConfig';
import { DotWave } from 'ldrs/react';
import { ReactNode } from 'react';
import MyMantineProvider from './MyMantineProvider';
import MyReactQueryProvider from './MyReactQueryProvider';
export default function Provider({ children }: { children?: ReactNode }) {
    const { flag: isReady } = useLoadAxiosConfig({ prefix: APP_CONFIG.alias, aqModule: APP_CONFIG.aqModule });


    if (!isReady) return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <DotWave
                size="70"
                speed="1"
                color="gray"
            />
        </div>
    )


    return (
        <MyReactQueryProvider>
            {/* <MyDateProvider> */}
            <MyMantineProvider>
                {children}
            </MyMantineProvider>
            {/* </MyDateProvider> */}
        </MyReactQueryProvider>
    )
}
