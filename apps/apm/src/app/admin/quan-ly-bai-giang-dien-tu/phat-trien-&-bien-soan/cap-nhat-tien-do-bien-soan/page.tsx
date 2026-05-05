"use client"

import UpdateCompilationProgressTable from "@/modules-features/admin/quan-ly-bai-giang-dien-tu/phat-trien-&-bien-soan/ModuleUpdateCompilationProgress/UpdateCompilationProgressTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Cập nhật Tiến độ Biên soạn"
    >
      <UpdateCompilationProgressTable />
    </MyPageContent>
  );
}