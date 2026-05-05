'use client'
import ExamOrganizationDepartmentTable from "@/features/admin/examOrganizationDepartment/ExamOrganizationDepartmentTable";
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent';

export default function Page() {
  return (
    <CustomPageContent>
      <ExamOrganizationDepartmentTable />
    </CustomPageContent>
  );
}
