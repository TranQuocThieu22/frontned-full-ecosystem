'use client'

import { ModuleConfigFeature } from "@aq-fe/core-ui/features/core/moduleConfig/ModuleConfigFeature"
import { aqModuleIdEnum } from "@aq-fe/core-ui/shared/consts/enum/aqModuleIdEnum"

export default function Page() {
    return (
        <ModuleConfigFeature AQModuleId={aqModuleIdEnum.SRM} />
    )
}
