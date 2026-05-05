"use client";

import GiftInventoryTable from "@/modules-features/admin/ModuleMEGiftInventory/GiftInventoryTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent
      title="Kho quà tặng"
    >
      <GiftInventoryTable />
    </MyPageContent>
  );
}