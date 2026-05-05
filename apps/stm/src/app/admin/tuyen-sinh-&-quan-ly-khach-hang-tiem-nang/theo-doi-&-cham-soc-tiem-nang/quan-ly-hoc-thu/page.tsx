'use client';
import TrialLearningManagementTable from "@/modules-features/admin/ModuleMETrialLearningManagement/TrialLearningManagementTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function page() {
    return (
        <MyPageContent>
            <TrialLearningManagementTable/>
        </MyPageContent>
    )
}
