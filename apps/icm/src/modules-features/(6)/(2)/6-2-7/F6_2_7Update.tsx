
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_2_7 } from "./F6_2_7Read"

export default function F6_1_7Update(
    { values }: { values: I6_2_7 }
) {
    const form = useForm<I6_2_7>({
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
                    label="Chủ tịch"
                    {...form.getInputProps("director")} // Field for 'director'
                />
                <MyTextInput
                    label="Tổng tiền"
                    {...form.getInputProps("total")} // Field for 'total'
                />
                <MyFileInput
                    label="File thanh toán"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Field for 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

