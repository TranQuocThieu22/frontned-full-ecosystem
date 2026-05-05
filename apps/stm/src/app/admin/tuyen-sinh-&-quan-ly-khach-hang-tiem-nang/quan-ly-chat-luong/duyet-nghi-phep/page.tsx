'use client'

import ApproveLeaveRead from "@/features/admin/ModuleApproveLeave/ApproveLeaveRead";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent>
      <ApproveLeaveRead />
    </CustomPageContent>
  )
}