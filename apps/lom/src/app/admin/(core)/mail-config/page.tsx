"use client"

import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"



enum enum_emailConfigModule {
    "SRM" = 20,
}

export default function Page() {
    return (
        // <F_mailConfig_Read emailModule={utils_converter_enumToSelectOptions(enum_emailConfigModule)} />
        <CustomPageContent title="Danh mục cấu hình mail server">
            Chức năng đang được phát triển
        </CustomPageContent>
    )
}
