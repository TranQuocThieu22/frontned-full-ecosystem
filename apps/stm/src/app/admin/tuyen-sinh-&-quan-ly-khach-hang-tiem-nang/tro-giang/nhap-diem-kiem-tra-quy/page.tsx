'use client'

import EnterQuarterTestScoresTable from "@/features/admin/MEEnterQuarterTestScores/EnterQuarterTestScoresTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <EnterQuarterTestScoresTable />
        </CustomPageContent>
    )
}