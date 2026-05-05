import { BasicAppShell } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { menuData } from "@/data/menuData";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return <BasicAppShell menu={menuData}>{children}</BasicAppShell>;
}



