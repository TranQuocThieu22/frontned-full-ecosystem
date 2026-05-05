"use client"

import { F_mailConfig_Read } from "@aq-fe/core-ui/features/core/mailConfig/F_mailConfig_Read"
import { utils_converter_enumToSelectOptions } from "aq-fe-framework/utils"

enum enum_emailConfigModule {
    // "SRM" = 20,
}

export default function Page() {
    return (
        <F_mailConfig_Read emailModule={utils_converter_enumToSelectOptions(enum_emailConfigModule)} />
    )
}
