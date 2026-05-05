import CourseSectionListTable from "@/features/admin/courseSectionList/CourseSectionListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <CourseSectionListTable />
    </CustomPageContent>
  );
}

