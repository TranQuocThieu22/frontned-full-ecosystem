"use client"

import { AccountManagementUserTable } from "@aq-fe/core-ui/features/core/accountManagement/AccountManagementUserTable"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function Page() {
    return (
        <CustomPageContent>
            <AccountManagementUserTable />
        </CustomPageContent>
    )
}
