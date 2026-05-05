"use client"
import baseAxios from "@/api/config/baseAxios";
import { useLoadAxiosConfig } from "aq-fe-framework/hooks";
import { ReactNode } from 'react';
import MyMantineProvider from './MyMantineProvider';
import MyReactQueryProvider from './MyReactQueryProvider';
export default function Provider({ children }: { children?: ReactNode }) {
    useLoadAxiosConfig({ axiosInstance: baseAxios, aqModule: 'svn' })
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
