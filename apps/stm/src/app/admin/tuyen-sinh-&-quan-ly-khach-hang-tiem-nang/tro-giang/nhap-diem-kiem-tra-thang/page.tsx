'use client'

import EnterMonthlyTestScoresTable from "@/features/admin/MEEnterMonthlyTestScores/EnterMonthlyTestScoresTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <EnterMonthlyTestScoresTable />
        </CustomPageContent>
    )
}