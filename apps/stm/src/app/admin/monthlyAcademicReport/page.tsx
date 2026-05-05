'use client'
import MonthlyAcademicReportTable from "@/features/monthlyAcademicReport/MonthlyAcademicReportTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <MonthlyAcademicReportTable />
        </CustomPageContent>
    )
}
