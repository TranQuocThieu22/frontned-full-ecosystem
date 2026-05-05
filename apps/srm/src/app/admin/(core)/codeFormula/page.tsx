'use client'

import { CodeFormulaRead } from "@aq-fe/core-ui/features/core/CodeFormula/CodeFormulaRead"


enum ENUM_BUSINESS_TYPE {
    //FIXME chưa setup lại giá trị của biến ở đây
    'Danh sách đề xuất nhiệm vụ' = 21,
    'Danh sách đăng ký nhiệm vụ' = 22,
}
export default function page() {
    return (
        <CodeFormulaRead businessTypeEnum={ENUM_BUSINESS_TYPE} />
    )
}
