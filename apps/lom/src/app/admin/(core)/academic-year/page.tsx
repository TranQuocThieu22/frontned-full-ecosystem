'use client'

import { AcademicYearsRead } from "@aq-fe/core-ui/features/core/academicYears/AcademicYearsRead"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"


export default function Page() {
    return (
        <CustomPageContent title="Danh mục năm học">
            <AcademicYearsRead />
        </CustomPageContent>
    )
}
