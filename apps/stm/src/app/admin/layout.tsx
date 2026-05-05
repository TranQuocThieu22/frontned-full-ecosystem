"use client"
import { adminMenuData } from "@/data/adminMenuData";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomBasicAppShell menu={adminMenuData}>
            {children}
        </CustomBasicAppShell>
    )
}


