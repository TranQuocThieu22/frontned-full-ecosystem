
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_2_7ResearchDecision } from "./F7_2_7ReadResearchDecision"

export default function F7_2_7UpdateResearchDecision(
    { values }: { values: I7_2_7ResearchDecision }
) {
    const form = useForm<I7_2_7ResearchDecision>({
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
                    {...form.getInputProps("decisionNumber")} // Binds to 'decisionNumber' field
                />
                <MyDateInput
                    label="Ngày quyết định"
                    {...form.getInputProps("decisionDate")} // Binds to 'decisionDate' field
                    placeholder="Chọn ngày"
                />
                <MyTextInput
                    label="Tên quyết định"
                    {...form.getInputProps("decisionName")} // Binds to 'decisionName' field
                />
                <MyTextInput
                    label="Tổng kinh phí"
                    {...form.getInputProps("totalCost")} // Binds to 'totalCost' field
                    type="number" // Ensures input is a numerical value
                    placeholder="Nhập tổng kinh phí"
                />
                <MyFileInput
                    label="File quyết định"
                    {...form.getInputProps("decisionFile")} // Binds to 'decisionFile' field
                    placeholder="Chọn file"
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

