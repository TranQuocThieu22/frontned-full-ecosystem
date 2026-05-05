"use client";
import { MyPageContent } from "aq-fe-framework/components";
import StandardCampaignListTable from "@/modules-features/admin/ModuleStandardCampaign/StandardCampaignListTable";

export default function Page() {
  return (
    <MyPageContent>
      <StandardCampaignListTable />
    </MyPageContent>
  );
}
