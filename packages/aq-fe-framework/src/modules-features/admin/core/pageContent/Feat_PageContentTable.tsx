"use client"
import { I_BasicAppShell_LinkItem } from "@/components";
import PageContentTable from "./PageContentTable";

export function Feat_PageContentTable({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    return (
        <PageContentTable menuData={menuData} />
    )
}
