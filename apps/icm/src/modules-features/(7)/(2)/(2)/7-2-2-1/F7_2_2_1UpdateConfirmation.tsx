
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_2_2_1CreateConfirmation } from "./F7_2_2_1CreateConfirmation"

export default function F7_2_2_1UpdateConfirmation(
    { values }: { values: I7_2_2_1CreateConfirmation }
) {
    const form = useForm<I7_2_2_1CreateConfirmation>({
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
                    {...form.getInputProps("decisionNumber")}  // Field from the interface
                />
                <MyDateInput
                    label="Ngày quyết định"
                    {...form.getInputProps("decisionDate")}  // Field from the interface
                />
                <MyTextInput
                    label="Tên quyết định"
                    {...form.getInputProps("decisionName")}  // Field from the interface
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("reseacrhName")}  // Field from the interface
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")}  // Field from the interface
                />
                <MyTextInput
                    label="Cố vấn"
                    {...form.getInputProps("advisor")}  // Field from the interface
                />
                <MyFileInput
                    label="File quyết định"
                    placeholder="Chọn file"
                    {...form.getInputProps("decisionFile")}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

