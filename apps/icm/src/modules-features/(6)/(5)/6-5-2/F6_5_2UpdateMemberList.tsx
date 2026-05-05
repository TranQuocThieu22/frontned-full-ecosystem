'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I6_5_2ListOfMember } from "./F6_5_2UpdatePaymentOfRemuneration";



export default function UpdateMemberListForm({ values }: { values: I6_5_2ListOfMember }) {
    const form = useForm<I6_5_2ListOfMember>({
        initialValues: {
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
                placeholder="Nhập họ tên"
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
                {...form.getInputProps('remuneration')}
            />

        </MyActionIconUpdate>
    );
}
