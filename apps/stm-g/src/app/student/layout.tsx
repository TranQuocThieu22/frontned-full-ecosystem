'use client'
import { studentMenuData } from "@/data/studentMenuData";
import F_zr8z26fbqn_SendNotification from "@/modules-features/student/zr8z26fbqn/F_zr8z26fbqn_SendNotification";
import { BasicAppShell } from "aq-fe-framework/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return <BasicAppShell menu={studentMenuData}>
        {children}
        <F_zr8z26fbqn_SendNotification />
    </BasicAppShell>;
}



