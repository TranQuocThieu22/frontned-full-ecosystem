"use client"
import PlatformDataSynchronizationTable from "@/features/admin/UncategorizedModules/PlatformDataSynchronization/PlatformDataSynchronizationTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <PlatformDataSynchronizationTable />
        </CustomPageContent>
    )
}
