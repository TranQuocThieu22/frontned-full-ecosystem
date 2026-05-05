'use client'

import ProposalEvaluationResultTable from "@/modules-features/admin/quan-ly-bai-giang-dien-tu/xet-duyet-de-xuat/ModuleProposalEvaluationResult/ProposalEvaluationResultTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent title="Kết quả đánh giá đề xuất">
      <ProposalEvaluationResultTable />
    </MyPageContent>
  )
}
