'use client'
import IRMApplyByGradeTable from "@/features/admin/UncategorizedModules/IRM-applied-by-course/IRMApplyByGradeTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent title="Thang đo IRM áp dụng theo Khoá">
      <IRMApplyByGradeTable />
    </CustomPageContent>
  );
}