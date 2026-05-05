"use client";

import GiftInventoryTable from "@/features/admin/ModuleMEGiftInventory/GiftInventoryTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
  return (
    <CustomPageContent
      title="Kho quà tặng"
    >
      <GiftInventoryTable />
    </CustomPageContent>
  );
}