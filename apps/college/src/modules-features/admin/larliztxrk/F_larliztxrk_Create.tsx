'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    fieldCode?: string; // Mã lĩnh vực
    name?: string //Tên lĩnh vực
    ghiChu?: string
}

export default function F_larliztxrk_Create() {
    const form = useForm<I>({
        initialValues: {
            fieldCode: "",
            name: "",
            ghiChu: ""
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Lĩnh vực'>
            <MyTextInput label='Mã lĩnh vực' {...form.getInputProps("fieldCode")} />
            <MyTextInput label='Tên lĩnh vực' {...form.getInputProps("name")} />

            {/* <Select
                label="Khoa quản lý"
                data={[
                    { value: "1", label: "Khoa công nghệ thông tin" },
                    { value: "2", label: "Khoa ngoại ngữ" },
                    { value: "3", label: "Khoa kinh tế" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("khoaQuanLy", parseInt(value?.toString()!))}
            /> */}
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}