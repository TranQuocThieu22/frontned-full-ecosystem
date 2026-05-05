'use client'

import EnterMonthlyTestScoresTable from "@/modules-features/admin/MEEnterMonthlyTestScores/EnterMonthlyTestScoresTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <EnterMonthlyTestScoresTable/>
        </MyPageContent>
    )
}