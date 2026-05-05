'use client';

import MonthlyParentFeedbackTable from "@/modules-features/admin/ModuleMEMonthlyParentFeedback/MonthlyParentFeedbackTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function page() {
    return (
        <MyPageContent>
            <MonthlyParentFeedbackTable/>
        </MyPageContent>
    )
}
