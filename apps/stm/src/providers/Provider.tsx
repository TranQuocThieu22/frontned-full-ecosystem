"use client"
import baseAxios from '@/api/config/baseAxios';
import { useLoadAxiosConfig } from "aq-fe-framework/hooks";
import { ReactNode } from 'react';
import MyMantineProvider from './MyMantineProvider';
import MyReactQueryProvider from './MyReactQueryProvider';
export default function Provider({ children }: { children?: ReactNode }) {
    const { flag: isReady } = useLoadAxiosConfig({ axiosInstance: baseAxios, aqModule: "lom", prefix: "/lom" });
    if (!isReady) return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
         ...
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
