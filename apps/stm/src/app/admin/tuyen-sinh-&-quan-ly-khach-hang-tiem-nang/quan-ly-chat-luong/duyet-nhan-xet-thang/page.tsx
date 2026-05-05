'use client'

import MonthlyReviewsApprovalTable from "@/features/admin/ModuleMonthlyReviewsApproval/MonthlyReviewsApprovalTable"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function page() {
  return (
    <CustomPageContent>
      <MonthlyReviewsApprovalTable />
    </CustomPageContent>
  )
}
