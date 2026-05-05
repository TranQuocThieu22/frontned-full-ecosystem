'use client'

import ViewClassRewardDetailTable from "@/features/admin/MEViewClassRewardDetail/ViewClassRewardDetailTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <ViewClassRewardDetailTable />
        </CustomPageContent>
    )
}