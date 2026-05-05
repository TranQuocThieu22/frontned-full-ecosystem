
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_4_1_1Decision } from "./F7_4_1_1ReadAllDecision"

export default function F7_4_1_1UpdateDecision(
    { values }: { values: I7_4_1_1Decision }
) {
    const form = useForm<I7_4_1_1Decision>({
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
                <MyDateInput
                    label="Ngày quyết định"
                    {...form.getInputProps("decisionDate")} // Field for 'decisionDate'
                />
                <MyTextInput
                    label="Tên quyết định"
                    {...form.getInputProps("decisionName")} // Field for 'decisionName'
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("reseacrhName")} // Field for 'reseacrhName'
                />
                <MyFileInput
                    label="File quyết định"
                    placeholder="Chọn file"
                    {...form.getInputProps("decisionFile")} // Field for 'decisionFile'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

