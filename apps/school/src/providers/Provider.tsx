"use client"
import baseAxios from "@/api/baseAxios";
import { useLoadAxiosConfig } from "aq-fe-framework/hooks";
import { DotWave } from "ldrs/react";
import { ReactNode } from 'react';
import MyMantineProvider from './MyMantineProvider';
import MyReactQueryProvider from './MyReactQueryProvider';

export default function Provider({ children }: { children?: ReactNode }) {
    const { flag: isReady } = useLoadAxiosConfig({ axiosInstance: baseAxios, aqModule: "school", prefix: "/school" });
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
