'use client'
import LeaveCompensationTable from "@/features/admin/MELeaveCompensation/LeaveCompensationTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <LeaveCompensationTable />
        </CustomPageContent>
    )
}