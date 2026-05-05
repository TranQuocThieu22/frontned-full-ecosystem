'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I6_5_1_1ListOfMember {
    id?: number;
    code?: string;
    name?: string;
    position?: string;
}

export default function UpdateMemberForm({ values }: { values: I6_5_1_1ListOfMember }) {
    const form = useForm<I6_5_1_1ListOfMember>({
        initialValues: {
            id: values.id,
            code: values.code || "",
            name: values.name || "",
            position: values.position || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize="50%">
            <MyTextInput label="Mã thành viên" placeholder="Nhập mã thành viên" {...form.getInputProps('code')} />
            <MyTextInput label="Họ tên" placeholder="Nhập họ tên thành viên" {...form.getInputProps('name')} />
            <MyTextInput label="Chức vụ" placeholder="Nhập chức vụ" {...form.getInputProps('position')} />
        </MyActionIconUpdate>
    );
}
