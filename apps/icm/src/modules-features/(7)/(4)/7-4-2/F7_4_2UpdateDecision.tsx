
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_4_2Decision } from "./F7_4_2ReadDecision"



export default function F7_4_2UpdateDecision(
    { values }: { values: I7_4_2Decision }
) {
    const form = useForm<I7_4_2Decision>({
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
                    {...form.getInputProps("decisionNumber")} // Field for 'decisionNumber'
                />
                <MyTextInput
                    label="Giám đốc"
                    {...form.getInputProps("director")} // Field for 'director'
                />
                <MyTextInput
                    label="Tổng tiền"
                    {...form.getInputProps("totalCost")} // Field for 'totalCost'
                    type="text" // Ensures textual input (you can change this if the input requires specific formatting)
                />
                <MyFileInput
                    label="File thanh toán"
                    placeholder="Chọn file"
                    {...form.getInputProps("paymentFile")} // Field for 'paymentFile'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

