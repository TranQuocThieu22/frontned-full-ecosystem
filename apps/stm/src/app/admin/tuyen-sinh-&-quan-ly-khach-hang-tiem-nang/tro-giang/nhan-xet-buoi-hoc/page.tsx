'use client'

import LessonReviewsTable from "@/features/admin/MELessonReviews/LessonReviewsTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <LessonReviewsTable />
        </CustomPageContent>
    )
}