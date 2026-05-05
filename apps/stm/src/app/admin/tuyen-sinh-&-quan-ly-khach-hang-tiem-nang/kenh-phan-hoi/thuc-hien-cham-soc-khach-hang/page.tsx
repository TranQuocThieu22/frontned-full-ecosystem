'use client'

import CustomerCareExecutionTable from "@/features/admin/ModuleMECustomerCareExecution/CustomerCareExecutionTable"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function page() {
  return (
    <CustomPageContent>
      <CustomerCareExecutionTable />
    </CustomPageContent>
  )
}
