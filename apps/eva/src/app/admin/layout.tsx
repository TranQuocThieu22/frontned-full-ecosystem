"use client"
import { adminMenuData } from "@/data/adminMenuData";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomBasicAppShell menu={adminMenuData}>
            <CustomPageContent>
                {children}
            </CustomPageContent>
        </CustomBasicAppShell>
    )
}


