'use client';

import TickerRepositoryTable from "@/modules-features/admin/ModuleMETickerRepository/TickerRepositoryTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function page() {
  return (
    <MyPageContent>
        <TickerRepositoryTable/>
    </MyPageContent>
  )
}
