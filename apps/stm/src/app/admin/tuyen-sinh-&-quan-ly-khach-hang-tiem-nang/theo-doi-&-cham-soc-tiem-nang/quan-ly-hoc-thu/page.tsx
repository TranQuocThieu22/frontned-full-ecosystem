'use client';
import TrialLearningManagementTable from "@/features/admin/ModuleMETrialLearningManagement/TrialLearningManagementTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function page() {
    return (
        <CustomPageContent>
            <TrialLearningManagementTable />
        </CustomPageContent>
    )
}
