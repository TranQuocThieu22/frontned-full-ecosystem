import CountersTable from "@/features/admin/counters/CountersTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <CountersTable />
        </CustomPageContent>
    );
}