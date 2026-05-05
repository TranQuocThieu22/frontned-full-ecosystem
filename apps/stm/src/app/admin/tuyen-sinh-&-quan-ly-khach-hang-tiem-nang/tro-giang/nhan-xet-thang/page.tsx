'use client'

import MonthlyReviewTable from "@/modules-features/admin/MEMonthlyReview/MonthlyReviewTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <MonthlyReviewTable />
        </MyPageContent>
    )
}