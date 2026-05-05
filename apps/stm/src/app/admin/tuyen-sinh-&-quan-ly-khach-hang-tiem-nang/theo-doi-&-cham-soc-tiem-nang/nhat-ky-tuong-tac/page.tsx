'use client';

import InteractionLogbookTable from "@/features/admin/ModuleMEInteractionLogbook/InteractionLogbookTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function page() {
  return (
    <CustomPageContent>
      <InteractionLogbookTable />
    </CustomPageContent>
  )
}
