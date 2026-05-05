import { MyButton } from '@/components/Buttons/Button/MyButton'
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal'
import MyCheckbox from '@/components/Checkbox/MyCheckbox'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import { Switch } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

interface I {
    trangThai?: boolean,
    noiDung?: string,
    guiMailThongbao?: boolean
}

export default function F6_3Validate() {
    const disc = useDisclosure()
    const form = useForm<I>()
    return (
        <MyButtonModal modalSize={'lg'} title='Kiểm tra yêu cầu' disclosure={disc} label='Cập nhật'>
            <form>
                <MyFlexColumn>
                    <Switch label="Trạng thái" {...form.getInputProps("trangThai")} />
                    <MyTextArea label='Nội dung' {...form.getInputProps("noiDung")} />
                    <MyCheckbox label="Gửi mail thông báo" {...form.getInputProps("guiMailThongbao")} />
                    <MyButton crudType='save' />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
