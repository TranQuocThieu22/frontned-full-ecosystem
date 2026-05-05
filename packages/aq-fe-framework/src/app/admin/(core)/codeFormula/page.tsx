'use client'

import { CodeFormulaRead } from "@/modules-features/admin/core/CodeFormula/CodeFormulaRead"

enum ENUM_BUSINESS_TYPE {
    // 1 -> 10 EVA
    'Mã câu hỏi' = 1,
    // 11->n SAE (Update sau)
    'Danh sách hoạt động ngoại khóa' = 11,
}
enum ENUM_OBJECT_TYPE {
    'Toàn đơn vị' = 1,
    'Toàn bộ phòng' = 2,
}
enum ENUM_REPEAT_CYCLE {
    'Không lặp lại' = 1,
    'Hàng ngày' = 2,
    'Hàng tuần' = 3,
    'Hàng tháng' = 4,
    'Hàng năm' = 5,
}


export default function Page() {
    return (
        <CodeFormulaRead businessTypeEnum={ENUM_BUSINESS_TYPE} objectTypeEnum={ENUM_OBJECT_TYPE} repeatCycleEnum={ENUM_REPEAT_CYCLE} />
    )
}
