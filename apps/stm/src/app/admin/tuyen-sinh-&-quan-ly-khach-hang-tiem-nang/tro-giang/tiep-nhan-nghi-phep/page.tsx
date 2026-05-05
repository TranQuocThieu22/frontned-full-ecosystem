'use client'

import ReceiveLeaveRead from "@/features/admin/ModuleReceiveLeave/ReceiveLeaveRead";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <ReceiveLeaveRead />
        </CustomPageContent>
    )
}