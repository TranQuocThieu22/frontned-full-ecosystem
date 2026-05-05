'use client'

import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum"
import { CodeFormulaRead } from "@aq-fe/core-ui/features/core/CodeFormula/CodeFormulaRead"
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService"


enum ENUM_OBJECT_TYPE {
    'Toàn trường' = 1,
}
enum ENUM_REPEAT_CYCLE {
    'Không lặp lại' = 1,
}

codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách công việc cần thực hiện"] })
export default function Page() {
    return (
        <CodeFormulaRead businessTypeEnum={ENUM_BUSINESS_TYPE} objectTypeEnum={ENUM_OBJECT_TYPE} repeatCycleEnum={ENUM_REPEAT_CYCLE} />
    )
}

// export default function Page() {
//     return (
//         <div>

//         </div>
//     )
// }
