'use client'

import PointChangeHistoryRead from "@/features/admin/ModulePointChangeHistory/PointChangeHistoryRead";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <PointChangeHistoryRead />
        </CustomPageContent>
    )
}