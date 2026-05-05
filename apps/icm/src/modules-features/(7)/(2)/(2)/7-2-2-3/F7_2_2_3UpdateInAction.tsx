
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_2_2_3table } from "./F7_2_2_3CreateGradingConfirmation"
import { Checkbox } from "@mantine/core"

export default function F7_2_2_3UpdateInAction(
    { values }: { values: I7_2_2_3table }
) {
    const form = useForm<I7_2_2_3table>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")} // Matches 'researchName' field in the interface
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Matches 'headOfDepartment' field in the interface
                />
                <MyTextInput
                    label="Điểm trung bình"
                    {...form.getInputProps("averageMark")} // Matches 'averageMark' field in the interface
                />
                <Checkbox
                    label="Thực hiện"
                    checked={form.values.doing}
                    onChange={(event) => form.setFieldValue("doing", event.currentTarget.checked)}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

