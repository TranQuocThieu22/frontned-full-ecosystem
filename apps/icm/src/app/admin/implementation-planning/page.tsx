"use client"

import ImplementationPlanningTable from "@/modules-features/ModuleImplementationPlanning/ImplementationPlanningTable";
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