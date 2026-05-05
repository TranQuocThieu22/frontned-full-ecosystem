"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { F_mailConfig_Read } from "aq-fe-framework/modules-features";
import { utils_converter_enumToSelectOptions } from "aq-fe-framework/utils";

export default function Page() {
    return (
        <MyPageContent>
            <F_mailConfig_Read emailModule={utils_converter_enumToSelectOptions(ENUM_EMAILCONFIG_MODULE)} />
        </MyPageContent>
    )
}



enum ENUM_EMAILCONFIG_MODULE {
    "EduSTM" = 1,
}
