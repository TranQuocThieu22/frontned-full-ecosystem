"use client"
import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import PageContentTable from "./PageContentTable";

export function Feat_PageContentTable({ menuData }: { menuData: I_BasicAppShell_LinkItem[] }) {
    return (
        <PageContentTable menuData={menuData} />
    )
}
