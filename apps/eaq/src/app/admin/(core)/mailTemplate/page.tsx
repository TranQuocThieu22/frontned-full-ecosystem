'use client'

import { EmailTemplateTable } from "@aq-fe/core-ui/features/core/EmailTemplate/EmailTemplateTable"


export default function page() {
    enum ENUM_EMAIL_TEMPLATE_TYPE {
        "Kiểm tra phân tích tiêu chí" = 1,
        "Kiểm duyệt minh chứng thu thập" = 2,
        "Theo dõi tiến độ đánh giá" = 3,
        "Kiểm tra và nhận xét phiếu tự đánh giá" = 4,
    }
    return (
        <EmailTemplateTable emailTemplateEnum={ENUM_EMAIL_TEMPLATE_TYPE} />
    )
}
