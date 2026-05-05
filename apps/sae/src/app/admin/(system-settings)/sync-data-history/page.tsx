import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import SyncDataHistoryTable from "@/modules-features/admin/ModuleSystemSettings/SyncDataHistory/SyncDataHistoryTable";

export default function Page() {
    return (
        <CustomPageContent>
            <SyncDataHistoryTable />
        </CustomPageContent>
    )
}
