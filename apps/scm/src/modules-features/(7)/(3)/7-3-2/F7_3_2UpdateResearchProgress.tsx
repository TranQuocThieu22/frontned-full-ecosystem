
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_3_2ResearchProgress } from "./F7_3_2ReadResearchProgress"

export default function F7_3_2UpdateResearchProgress(
    { values }: { values: I7_3_2ResearchProgress }
) {
    const form = useForm<I7_3_2ResearchProgress>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
        form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Mã đề tài"
                    {...form.getInputProps("researchNumber")} // Binds to 'researchNumber' field
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")} // Binds to 'researchName' field
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    {...form.getInputProps("leader")} // Binds to 'leader' field
                />
                <MyTextInput
                    label="Cố vấn"
                    {...form.getInputProps("advisor")} // Binds to 'advisor' field
                />
                <MyTextInput
                    label="Thời gian thực hiện"
                    {...form.getInputProps("estimateTime")} // Binds to 'estimateTime' field
                />
                <MyTextInput
                    label="% Hoàn thành"
                    {...form.getInputProps("completion")} // Binds to 'completion' field
                />
                <MyTextInput
                    label="Điều chỉnh nội dung"
                    {...form.getInputProps("editContent")} // Binds to 'editContent' field
                />
                <MyTextInput
                    label="Điều chỉnh chủ nhiệm"
                    {...form.getInputProps("editHead")} // Binds to 'editHead' field
                />
                <MyTextInput
                    label="Điều chỉnh thời gian"
                    {...form.getInputProps("editTime")} // Binds to 'editTime' field
                />
                <MyTextInput
                    label="Điều chỉnh tiến độ"
                    {...form.getInputProps("editProgress")} // Binds to 'editProgress' field
                />
                <MyFileInput
                    label="File điều chỉnh"
                    {...form.getInputProps("editFile")} // Binds to 'editFile' field
                    placeholder="Chọn file"
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

