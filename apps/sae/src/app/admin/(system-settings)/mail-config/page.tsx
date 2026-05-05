"use client"

import { F_mailConfig_Read } from "@aq-fe/core-ui/features/core/mailConfig/F_mailConfig_Read"
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils"

export default function Page() {
    return (
        <F_mailConfig_Read emailModule={converterUtils.enumToSelectOptions(ENUM_EMAILCONFIG_MODULE)} />
    )
}



enum ENUM_EMAILCONFIG_MODULE {
    "AQ EduSAE" = 1,
}
