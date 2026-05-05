"use client"
import { ModuleConfigFeature } from "@aq-fe/core-ui/features/core/moduleConfig/ModuleConfigFeature";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <ModuleConfigFeature AQModuleId={3} />
        </CustomPageContent>
    )
}
