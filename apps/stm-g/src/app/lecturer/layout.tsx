'use client'
import { lecturerMenuData } from "@/data/lecturerMenuData";
import { useS_Sidebar } from "@/stores/useS_Sidebar";
import { BasicAppShell } from "aq-fe-framework/components";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    const pathName = usePathname()
    const SidebarStore = useS_Sidebar()
    return <BasicAppShell menu={lecturerMenuData}>{children}</BasicAppShell>;
}



