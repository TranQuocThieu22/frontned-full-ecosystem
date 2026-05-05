'use client'

import LessonReviewsTable from "@/modules-features/admin/MELessonReviews/LessonReviewsTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <LessonReviewsTable />
        </MyPageContent>
    )
}