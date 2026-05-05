import { utils_converter_enumToSelectOptions } from '@/utils'
import { F_mailConfig_Read } from './F_mailConfig_Read'

enum enum_emailConfigModule {
    "Đào tạo" = 1,
    "Tuyển sinh" = 2,
    "Sinh viên" = 3,
    "Khảo thí" = 4
}

export default function F_mailConfig() {
    return (
        <F_mailConfig_Read emailModule={utils_converter_enumToSelectOptions(enum_emailConfigModule)} />
    )
}


