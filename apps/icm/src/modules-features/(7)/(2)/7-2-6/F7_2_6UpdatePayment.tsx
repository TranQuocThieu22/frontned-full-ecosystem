
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_2_6PaymentsDetails } from "./F7_2_6ReadAllPayment"
import { I7_2_6PaymentMember } from "./F7_2_6CreatePayment"

export default function F7_2_6UpdatePayment(
    { values }: { values: I7_2_6PaymentsDetails }
) {
    const form = useForm<I7_2_6PaymentsDetails>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
        form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput label='Họ và tên' {...form.getInputProps("fullName")} />
                <MyTextInput label='Chức vụ' {...form.getInputProps("position")} />
                <MyTextInput label='Thù lao' {...form.getInputProps("remuneration")} />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

