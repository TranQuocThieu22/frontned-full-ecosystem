
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_2_6PaymentsDetails } from "./F7_2_6ReadAllPayment"
import { I7_2_6PaymentMember } from "./F7_2_6CreatePayment"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"

export default function F7_2_6UpdatePaymentMember(
    { values }: { values: I7_2_6PaymentMember }
) {
    const form = useForm<I7_2_6PaymentMember>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Số quyết định"
                    placeholder="Nhập số quyết định"
                    {...form.getInputProps("decidedNumber")} // Binds to 'decidedNumber' field
                />
                <MyTextInput
                    label="Chủ tịch"
                    placeholder="Nhập tên chủ tịch"
                    {...form.getInputProps("director")} // Binds to 'director' field
                />
                <MyTextInput
                    label="Tổng tiền"
                    placeholder="Nhập tổng tiền"
                    type="number" // Ensures numerical input
                    {...form.getInputProps("totalMoney")} // Binds to 'totalMoney' field
                />
                <MyFileInput
                    label="File thanh toán"
                    placeholder="Chọn file"
                    {...form.getInputProps("paymentFile")} // Binds to 'paymentFile' field
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

