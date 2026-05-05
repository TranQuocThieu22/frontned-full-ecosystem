'use client'

import { EmailTemplateTable } from "@aq-fe/core-ui/features/core/EmailTemplate/EmailTemplateTable"



export default function Page() {
    enum ENUM_EMAIL_TEMPLATE_TYPE {
        // "Kiểm tra sơ bộ đề xuất nhiệm vụ" = 101,
        // "Kiểm tra hồ sơ đăng ký tuyển chọn" = 102,
        // "Phê duyệt thuyết minh" = 103,
        // "Kiểm tra hoàn thiện thuyết minh" = 104,
        // "Kiểm tra tiến độ định kỳ" = 105,
        // "Kiểm tra và phê duyệt kê khai công bố" = 106,
    }

    return (
        <EmailTemplateTable emailTemplateEnum={ENUM_EMAIL_TEMPLATE_TYPE} />
    )
}
