"use client";
import { ReactNode } from "react";
import i18nextConfig from "../libs/i18next/i18nextConfig";

export default function ConfigWrapper({ children }: { children: ReactNode }) {
    i18nextConfig;
    return (
        <>
            {children}
        </>
    );
}