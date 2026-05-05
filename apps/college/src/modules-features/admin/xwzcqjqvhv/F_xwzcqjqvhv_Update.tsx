'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    reasonsCode?: string; // Mã ngành / Chuyên ngành
    name?: string //Tên ngành / Chuyên ngành
    type?: string // Loại vào/ra
}

export default function F_xwzcqjqvhv_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã lý do' {...form.getInputProps("reasonsCode")} readOnly />
            <MyTextInput label='Tên lý do' {...form.getInputProps("name")} />

            <Select
                label="Loại vào / ra"
                data={[
                    { value: "1", label: "Quyết định vào mới" },
                    { value: "2", label: "Quyết định bảo lưu" },
                    { value: "3", label: "Quyết định học lại" },
                    { value: "4", label: "Quyết định đổi lớp" },
                    { value: "5", label: "Quyết định nghỉ học" },
                    { value: "6", label: "Quyết định tốt nghiệp" },
                ]}

                // defaultValue={form.values.type?.toString()}
                // onChange={(value) => form.setFieldValue("type", value?.toString())}
                defaultValue={1?.toString()}
                // defaultValue={form.values.type?.toString()}
                onChange={(value) => form.setFieldValue("type", value?.toString())}
            />




            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyActionIconUpdate>
    )
}