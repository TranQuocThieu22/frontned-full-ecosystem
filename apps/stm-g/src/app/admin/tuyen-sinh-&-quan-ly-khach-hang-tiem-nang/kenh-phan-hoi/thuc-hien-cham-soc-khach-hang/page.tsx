'use client'

import CustomerCareExecutionTable from "@/modules-features/admin/ModuleMECustomerCareExecution/CustomerCareExecutionTable"
import { MyPageContent } from "aq-fe-framework/components"

export default function page() {
  return (
    <MyPageContent>
        <CustomerCareExecutionTable/>
    </MyPageContent>
  )
}
