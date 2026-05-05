'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I6_3_1_1ListOfMember {
    id?: number; // ID (nếu cần, không chỉnh sửa)
    code?: string; // Nhập mã thành viên
    name?: string; // Nhập họ tên
    position?: string; // Nhập chức vụ
}

export default function UpdateListOfMemberForm({ values }: { values: I6_3_1_1ListOfMember }) {
    const form = useForm<I6_3_1_1ListOfMember>({
        initialValues: {
            id: values.id || undefined, // ID chỉ hiển thị nếu cần
            code: values.code || "",
            name: values.name || "",
            position: values.position || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize={"50%"}>

            <MyTextInput
                label="Mã giảng viên"
                placeholder="Nhập mã giảng viên"
                {...form.getInputProps('code')}
            />
            <MyTextInput
                label="Họ tên"
                placeholder="Nhập họ tên"
                {...form.getInputProps('name')}
            />

            <MyTextInput
                label="Chức vụ"
                placeholder="Nhập chức vụ"
                {...form.getInputProps('position')}
            />

        </MyActionIconUpdate>
    );
}
