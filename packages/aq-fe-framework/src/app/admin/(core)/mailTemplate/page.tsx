'use client'
import { EmailTemplateTable } from "@/modules-features/admin/core/EmailTemplate/EmailTemplateTable";
enum ENUM_EMAIL_TEMPLATE_TYPE {
    "Kiểm tra phân tích tiêu chí" = 1,
    "Kiểm duyệt minh chứng thu thập" = 2,
    "Theo dõi tiến độ đánh giá" = 3,
}
export default function page() {
    return (
        <EmailTemplateTable emailTemplateEnum={ENUM_EMAIL_TEMPLATE_TYPE} />
    )
}
