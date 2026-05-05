'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I6_3_5ListOfMember {
    id?: number; // ID (chỉ hiển thị nếu cần, không chỉnh sửa)
    code?: string; // Mã thành viên
    name?: string; // Họ tên thành viên
    position?: string; // Chức vụ
    renumeration?: number; // Thù lao
}

export default function UpdateMemberForm({ values }: { values: I6_3_5ListOfMember }) {
    const form = useForm<I6_3_5ListOfMember>({
        initialValues: {
            id: values.id || undefined, // Chỉ hiển thị nếu cần
            code: values.code || "",
            name: values.name || "",
            position: values.position || "",
            renumeration: values.renumeration || 0,
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize={"50%"}>

            <MyTextInput
                label="Mã thành viên"
                placeholder="Nhập mã thành viên"
                {...form.getInputProps('code')}
            />
            <MyTextInput
                label="Họ tên"
                placeholder="Nhập họ tên thành viên"
                {...form.getInputProps('name')}
            />

            <MyTextInput
                label="Chức vụ"
                placeholder="Nhập chức vụ"
                {...form.getInputProps('position')}
            />
            <MyNumberInput
                label="Thù lao"
                placeholder="Nhập thù lao"
                {...form.getInputProps('renumeration')}
            />

        </MyActionIconUpdate>
    );
}
