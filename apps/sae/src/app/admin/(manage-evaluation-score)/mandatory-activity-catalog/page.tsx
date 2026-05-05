'use client'

import { schoolCode } from "@/constants/object/schoolCode";
import { MandatoryActivityCatalogTable as FTUMandatoryActivityCatalogTable } from "@/modules-features/admin/ModuleEvaluation/EvaluationFramework/MandatoryActivityCatalog/FTU/MandatoryActivityCatalogTable";
import MandatoryActivityCatalogTable from "@/modules-features/admin/ModuleEvaluation/EvaluationFramework/MandatoryActivityCatalog/MandatoryActivityCatalogTable";
import { APP_CONFIG } from "@/shared/configs/appConfig";

export default function Page() {
  if (APP_CONFIG.schoolCode == schoolCode.FTU) {
    return <FTUMandatoryActivityCatalogTable />
  }
  return <MandatoryActivityCatalogTable />
}
