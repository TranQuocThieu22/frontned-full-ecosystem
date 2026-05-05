'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { I_vzyvakcrbp } from './F_vzyvakcrbp_Read';




export default function F_vzyvakcrbp_Update({ data }: { data: I_vzyvakcrbp }) {
    const form = useForm<I_vzyvakcrbp>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput
                disabled
                label="Mã quy chế"
                placeholder="Nhập mã quy chế"
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Tên quy chế"
                placeholder="Nhập tên quy chế"
                {...form.getInputProps("name")}
            />
            <Select
                label="Trực thuộc"
                placeholder="Chọn trực thuộc"
                data={[
                    { value: 'Thông tư 08', label: 'Thông tư 08' },
                    { value: 'Thông tư 16', label: 'Thông tư 16' },
                ]}
                {...form.getInputProps("parent")}
            />
            <MyTextInput
                label="Tên quy chế Eg"
                placeholder="Nhập tên quy chế Eg"
                {...form.getInputProps("nameEg")}
            />

            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyActionIconUpdate>
    )
}


