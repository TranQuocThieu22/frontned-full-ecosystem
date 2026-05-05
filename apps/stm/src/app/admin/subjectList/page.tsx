import SubjectListTable from "@/features/admin/subjectList/SubjectListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <SubjectListTable />
    </CustomPageContent>
  );
}

