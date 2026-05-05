"use client"
import { adminMenuData } from "@/data/adminMenuData";
import { BasicAppShell } from "aq-fe-framework/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <BasicAppShell menu={adminMenuData}>
            {children}
        </BasicAppShell>
    )
}


