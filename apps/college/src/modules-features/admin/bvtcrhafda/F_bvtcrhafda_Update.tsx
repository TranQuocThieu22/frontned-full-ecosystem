'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { I_bvtcrhafda_Create } from './F_bvtcrhafda_Create';



export default function F_bvtcrhafda_Update({ value }: { value: I_bvtcrhafda_Create }) {
    const form = useForm<I_bvtcrhafda_Create>({
        initialValues: value,
        validate: {
            tenDanToc: (value) => (value ? null : 'Tên dân tộc bắt buộc nhập'),
            thuTu: (value) => (value ? null : 'Thứ tự bắt buộc nhập'),
        },
    })

    return (
        <MyActionIconUpdate modalSize={"40%"} form={form} onSubmit={() => { }} >
            <MyTextInput
                label="Mã dân tộc"
                disabled
                placeholder="Nhập mã dân tộc"
                {...form.getInputProps('maDanToc')}
            />
            <MyTextInput
                label="Tên dân tộc"
                placeholder="Nhập tên dân tộc"
                {...form.getInputProps('tenDanToc')}
            />
            <NumberInput
                label="Thứ tự"
                min={1}
                placeholder="Nhập thứ tự"
                {...form.getInputProps('thuTu')}
            />
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('ghiChu')}
            />
        </MyActionIconUpdate>
    )
}
