'use client'

import MonthlyReviewsApprovalTable from "@/modules-features/admin/ModuleMonthlyReviewsApproval/MonthlyReviewsApprovalTable"
import { MyPageContent } from "aq-fe-framework/components"

export default function page() {
  return (
    <MyPageContent>
        <MonthlyReviewsApprovalTable/>
    </MyPageContent>
  )
}
