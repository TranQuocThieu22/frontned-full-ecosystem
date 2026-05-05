'use client'

import LevelManagementTable from "@/modules-features/admin/MELevelManagement/LevelManagementTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <LevelManagementTable />
        </MyPageContent>
    )
}