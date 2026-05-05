import AssignPreferredRoomTable from "@/features/admin/assignPreferredRoom/AssignPreferredRoomTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <AssignPreferredRoomTable />
        </CustomPageContent>
    );
}
