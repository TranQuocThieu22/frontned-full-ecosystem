'use client'

import MonthlyReviewTable from "@/features/admin/MEMonthlyReview/MonthlyReviewTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <MonthlyReviewTable />
        </CustomPageContent>
    )
}