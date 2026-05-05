'use client'

import PlacementTestEvaluationTable from "@/features/admin/METestEvaluation/PlacementTestEvaluationTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <PlacementTestEvaluationTable />
        </CustomPageContent>
    )
}