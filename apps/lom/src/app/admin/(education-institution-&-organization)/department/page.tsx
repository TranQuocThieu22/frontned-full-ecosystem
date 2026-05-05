
'use client'
import DepartmentTable from "@/features/admin/Institution&Organization/Department/department-table";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Danh mục đơn vị">
            <DepartmentTable />
        </CustomPageContent>
    )
}