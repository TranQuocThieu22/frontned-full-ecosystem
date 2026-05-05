import { MySelect, MySelectProps } from '@/core'
import { utils_converter } from '@/utils-v2'
import { genderEnum, genderLabel } from '../consts/genderEnum'

interface Shared_GenderSelectProps extends MySelectProps {

}

export function GenderSelect({ ...rest }: Shared_GenderSelectProps) {
    return (
        <MySelect
            label="Giới tính"
            data={utils_converter.mapEnumToSelectData(genderEnum, genderLabel)}
            {...rest}
        />
    )
}
