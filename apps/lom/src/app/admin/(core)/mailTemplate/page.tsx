'use client'

import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"




export default function Page() {
    enum ENUM_EMAIL_TEMPLATE_TYPE {
        "Kiểm tra sơ bộ đề xuất nhiệm vụ" = 101,
        "Kiểm tra hồ sơ đăng ký tuyển chọn" = 102,
        "Phê duyệt thuyết minh" = 103,
        "Kiểm tra hoàn thiện thuyết minh" = 104,
        "Kiểm tra tiến độ định kỳ" = 105,
    }

    return (
        // <EmailTemplateTable emailTemplateEnum={ENUM_EMAIL_TEMPLATE_TYPE} />
        <CustomPageContent>
            Chưa được tích hợp
        </CustomPageContent>
    )
}
