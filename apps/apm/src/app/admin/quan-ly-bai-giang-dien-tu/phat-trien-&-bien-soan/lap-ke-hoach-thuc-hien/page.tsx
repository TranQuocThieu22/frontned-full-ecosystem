"use client"

import ImplementationPlanningTable from "@/modules-features/admin/quan-ly-bai-giang-dien-tu/phat-trien-&-bien-soan/ModuleImplementationPlanning/ImplementationPlanningTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Lập Kế hoạch Thực hiện"
    >
      <ImplementationPlanningTable />
    </MyPageContent>
  );
}