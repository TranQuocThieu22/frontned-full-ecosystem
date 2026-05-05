'use client'
import { menuData } from "@/data/menuData";
import { BasicAppShell } from "aq-fe-framework/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return <BasicAppShell isDev={true} menu={menuData}>{children}</BasicAppShell>;
}


