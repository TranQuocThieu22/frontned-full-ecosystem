import { CustomSelect, CustomSelectProps } from '@aq-fe/core-ui/shared/components/input/CustomSelect'
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils'
import { genderEnum, genderLabel } from '../consts/enum/genderEnum'

interface Shared_GenderSelectProps extends CustomSelectProps {

}

export function GenderSelect({ ...rest }: Shared_GenderSelectProps) {
    return (
        <CustomSelect
            label="Giới tính"
            data={converterUtils.mapEnumToSelectData(genderEnum, genderLabel)}
            {...rest}
        />
    )
}
