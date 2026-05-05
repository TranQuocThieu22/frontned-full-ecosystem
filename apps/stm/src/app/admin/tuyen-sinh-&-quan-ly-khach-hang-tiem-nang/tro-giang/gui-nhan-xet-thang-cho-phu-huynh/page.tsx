'use client';

import MonthlyParentFeedbackTable from "@/features/admin/ModuleMEMonthlyParentFeedback/MonthlyParentFeedbackTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function page() {
    return (
        <CustomPageContent>
            <MonthlyParentFeedbackTable />
        </CustomPageContent>
    )
}
