"use client"
import { F_mailConfig_Read } from "@aq-fe/core-ui/features/core/mailConfig/F_mailConfig_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { utils_converter_enumToSelectOptions } from "aq-fe-framework/utils";

export default function Page() {
    return (
        <CustomPageContent>
            <F_mailConfig_Read emailModule={utils_converter_enumToSelectOptions(ENUM_EMAILCONFIG_MODULE)} />
        </CustomPageContent>
    )
}



enum ENUM_EMAILCONFIG_MODULE {
    "EduSTM" = 1,
}
