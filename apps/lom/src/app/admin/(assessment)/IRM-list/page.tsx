'use client'
import IRMTable from "@/features/admin/UncategorizedModules/IRM-list/IRMTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Thang do IRM">
            <IRMTable />
        </CustomPageContent>
    )
}
