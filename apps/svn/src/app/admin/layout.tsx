"use client"
import { BasicAppShell } from "aq-fe-framework/components";
import { ReactNode } from "react";
import { menuData } from "../../data/menuData";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <BasicAppShell menu={menuData} title="SVN - Hệ thống Khảo sát Linh hoạt & Điều hướng Toàn diện">
            {children}
        </BasicAppShell>
    )
}


