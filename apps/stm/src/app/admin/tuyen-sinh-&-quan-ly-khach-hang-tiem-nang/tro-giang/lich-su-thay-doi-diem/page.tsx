'use client'

import PointChangeHistoryRead from "@/modules-features/admin/ModulePointChangeHistory/PointChangeHistoryRead";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <PointChangeHistoryRead />
        </MyPageContent>
    )
}