'use client'

import EnterScoresInSchoolTable from "@/features/admin/MEEnterScoresInSchool/EnterScoresInSchoolTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <EnterScoresInSchoolTable />
        </CustomPageContent>
    )
}