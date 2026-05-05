'use client'

import FeeDeclarationTable from "@/modules-features/admin/MEFeeDeclaration/FeeDeclarationTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <FeeDeclarationTable />
        </MyPageContent>
    )
}