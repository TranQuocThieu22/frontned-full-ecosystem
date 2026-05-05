'use client'
import { menuData } from "@/data/menuData";
import { BasicAppShell } from "aq-fe-framework/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return <BasicAppShell menu={menuData} title="ICM - Phần mềm Quản lý Hợp tác Quốc tế">{children}</BasicAppShell>;
}


