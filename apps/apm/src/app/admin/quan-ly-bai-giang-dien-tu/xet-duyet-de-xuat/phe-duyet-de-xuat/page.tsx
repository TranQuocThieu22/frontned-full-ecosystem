'use client'

import E_LectureApproveProposalTable from "@/modules-features/admin/quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/ModuleE-LectureApproveProposal/E_LectureApproveProposalTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent title="Phê duyệt Đề xuất">
      <E_LectureApproveProposalTable />
    </MyPageContent>
  )
}