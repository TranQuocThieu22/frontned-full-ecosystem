'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    levelCode?: string; // Mã bậc
    name?: string //Tên bậc
    nameEg?: string //Tên bậc Eg
}

export default function F_xcivliulbu_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã bậc' {...form.getInputProps("levelCode")} />
            <MyTextInput label='Tên bậc' {...form.getInputProps("name")} />
            <MyTextInput label='Tên bậc Eg' {...form.getInputProps("nameEg")} />
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