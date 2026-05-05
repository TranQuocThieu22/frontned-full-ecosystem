'use client'

import ReceiveLeaveRead from "@/modules-features/admin/ModuleReceiveLeave/ReceiveLeaveRead";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <ReceiveLeaveRead />
        </MyPageContent>
    )
}