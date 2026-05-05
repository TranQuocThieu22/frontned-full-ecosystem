import CheckAttendanceTable from "@/features/admin/checkAttendance/CheckAttendanceTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <CheckAttendanceTable />
    </CustomPageContent>
  );
}

