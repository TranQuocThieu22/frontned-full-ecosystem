'use client';

import TickerRepositoryTable from "@/features/admin/ModuleMETickerRepository/TickerRepositoryTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function page() {
  return (
    <CustomPageContent>
      <TickerRepositoryTable />
    </CustomPageContent>
  )
}
