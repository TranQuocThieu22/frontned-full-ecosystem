'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
import { I5_6_5ListOfMember } from "./F5_6_5CreateCompensationPayment"


export default function F5_6_5UpdateListOfMember({ values }: { values: I5_6_5ListOfMember }) {
    const form = useForm<I5_6_5ListOfMember>({
        initialValues: {
            ...values,
        }
    })
    return (
        <MyActionIconUpdate onSubmit={() => { }} modalSize={"100%"} form={form} >
            <MyTextInput label="Mã thành viên" {...form.getInputProps("code")} />
            <MyTextInput label="Họ và tên" {...form.getInputProps("name")} />
        </MyActionIconUpdate>
    )
}