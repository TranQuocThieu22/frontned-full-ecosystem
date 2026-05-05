'use client'

import EnterClassScoreTable from "@/features/admin/MEEnterClassScore/EnterClassScoreTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <EnterClassScoreTable />
        </CustomPageContent>
    )
}