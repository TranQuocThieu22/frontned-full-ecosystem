"use client"
import F_branchCatalog_Read from "@/modules-features/admin/branchCatalog/F_branchCatalog_Read";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <F_branchCatalog_Read />
        </MyPageContent>
    )
}
