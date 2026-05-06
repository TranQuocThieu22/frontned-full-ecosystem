import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils'
import { F_mailConfig_Read } from './F_mailConfig_Read'

enum enum_emailConfigModule {
    "Đào tạo" = 1,
    "Tuyển sinh" = 2,
    "Sinh viên" = 3,
    "Khảo thí" = 4
}

export default function F_mailConfig() {
    return (
        <F_mailConfig_Read emailModule={converterUtils.enumToSelectOptions(enum_emailConfigModule)} />
    )
}


