"use client";

import { useLoadAxiosConfig } from "@/hooks/custom-hooks/useLoadAxiosConfig";
import baseAxios from "@/shared/config/baseAxios";
import { ReactNode } from "react";
import MyMantineProvider from "./MyMantineProvider";
import MyReactQueryProvider from "./MyReactQueryProvider";
//
export default function Provider({ children }: { children?: ReactNode }) {
    const { flag: isReady } = useLoadAxiosConfig({ axiosInstance: baseAxios, aqModule: "srm" });
    if (!isReady) return <div>Loading config...</div>;
    return (
        <MyReactQueryProvider>
            <MyMantineProvider>
                {children}
            </MyMantineProvider>
        </MyReactQueryProvider>
    );
}
