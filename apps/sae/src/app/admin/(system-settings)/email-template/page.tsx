'use client';

import { EmailTemplateTable } from "@aq-fe/core-ui/features/core/EmailTemplate/EmailTemplateTable";

enum ENUM_EMAIL_TEMPLATE_TYPE {
    "Duyệt tổ chức hoạt động" = 201,
}
export default function Page() {
    return (
        <EmailTemplateTable emailTemplateEnum={ENUM_EMAIL_TEMPLATE_TYPE} />
    );
}
