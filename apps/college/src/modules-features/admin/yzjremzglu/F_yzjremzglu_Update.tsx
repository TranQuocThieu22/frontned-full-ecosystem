'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { I_yzjremzglu } from './F_yzjremzglu_Read';




export default function F_yzjremzglu_Update({ data }: { data: I_yzjremzglu }) {
    const form = useForm<I_yzjremzglu>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput
                disabled
                label="Mã chương trình"
                placeholder="Nhập mã chương trình"
                {...form.getInputProps("programCode")}
            />

            <MyTextInput
                label="Tên chương trình"
                placeholder="Nhập tên chương trình"
                {...form.getInputProps("programName")}
            />

            <MyTextInput
                label="Tên chương trình Eg"
                placeholder="Nhập tên chương trình Eg"
                {...form.getInputProps("programNameEg")}
            />

            <Select
                label="Đơn vị quản lý"
                placeholder="Chọn đơn vị quản lý"
                data={[
                    { value: "Khoa Công nghệ thông tin", label: "Khoa Công nghệ thông tin" },
                    { value: "Khoa Kinh tế", label: "Khoa Kinh tế" },
                ]}
                {...form.getInputProps("managingUnit")}
            />

            <Select
                label="Lĩnh vực"
                placeholder="Chọn lĩnh vực"
                data={[
                    { value: "Kỹ thuật và Công nghệ", label: "Kỹ thuật và Công nghệ" },
                    { value: "Kinh tế và Quản trị", label: "Kinh tế và Quản trị" },
                ]}
                {...form.getInputProps("field")}
            />

            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyActionIconUpdate>
    )
}


