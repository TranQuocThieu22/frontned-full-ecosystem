'use client'

import LessonReviewsApprovalTable from "@/features/admin/MELessonReviewsApproval/LessonReviewsApprovalTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <LessonReviewsApprovalTable />
        </CustomPageContent>
    )
}