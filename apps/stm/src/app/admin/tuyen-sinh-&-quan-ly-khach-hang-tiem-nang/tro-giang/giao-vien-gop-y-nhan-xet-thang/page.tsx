'use client'

import MonthlyTeacherFeedbackLayout from "@/features/admin/MEMonthlyTeacherFeedback/MonthlyTeacherFeedbackLayout";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <MonthlyTeacherFeedbackLayout />
        </CustomPageContent>
    );
}