'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    languageCode?: string; // Mã bậc
    name?: string //Tên bậc
}

export default function F_jhzaohpaoh_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã ngôn ngữ' {...form.getInputProps("languageCode")} />
            <MyTextInput label='Tên ngôn ngữ' {...form.getInputProps("name")} />

            {/* <Select
                label="Chi tiết bậc đào tạo"
                // data={[
                //     { value: "1", label: "Khoa công nghệ thông tin" },
                //     { value: "2", label: "Khoa ngoại ngữ" },
                //     { value: "3", label: "Khoa kinh tế" },
                // ]}
                defaultValue={form.values.khoaQuanLy?.toString()}
                onChange={(value) => form.setFieldValue("khoaQuanLy", parseInt(value?.toString()!))}
            /> */}

            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyActionIconUpdate>
    )
}