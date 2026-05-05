import ExamListTable from "@/features/admin/examList/ExamListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <ExamListTable />
    </CustomPageContent>
  );
}

