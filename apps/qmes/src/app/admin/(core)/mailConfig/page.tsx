"use client"

import { MyPageContent } from "aq-fe-framework/components"
import { F_mailConfig_Read } from "aq-fe-framework/modules-features"
import { utils_converter_enumToSelectOptions } from "aq-fe-framework/utils"
enum enum_emailConfigModule {
    "EAQ" = 10,
}

export default function Page() {
    return (

        <F_mailConfig_Read emailModule={utils_converter_enumToSelectOptions(enum_emailConfigModule)} />

    )
}
