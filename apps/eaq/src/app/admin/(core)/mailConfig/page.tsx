"use client"

import { F_mailConfig_Read } from "@aq-fe/core-ui/features/core/mailConfig/F_mailConfig_Read"
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils"


enum enum_emailConfigModule {
    "EAQ" = 10,
}
export default function Page() {
    return (
        <F_mailConfig_Read emailModule={converterUtils.enumToSelectOptions(enum_emailConfigModule)} />
    )
}
