import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { I1_1User } from "./F1_1ReadUser";

export default function F1_1UpdateUser({ user }: { user: I1_1User }) {
    const form = useForm({
        initialValues: user
    })

    useEffect(() => {
        console.log(form.values);
    }, [form.values])


    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyFlexColumn>
                <MyTextInput label='Tên tài khoản' {...form.getInputProps("userName")} />
                <MyTextInput label='Họ và tên' {...form.getInputProps("fullName")} />
                <MyTextInput label='Email' {...form.getInputProps("email")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
