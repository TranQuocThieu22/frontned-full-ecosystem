
'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_1_3ResearchDecisionData } from "./F7_1_3CreateResearchDecision"
import { Checkbox } from "@mantine/core"

export default function F7_1_3ResearchDecisionInCreate(
    { values }: { values: I7_1_3ResearchDecisionData }
) {
    const form = useForm<I7_1_3ResearchDecisionData>({
        initialValues: values
    })


    return (
        <MyActionIconUpdate
             form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => {
            }}
        >
            <MyFlexColumn>
                <MyTextInput label="Lĩnh vực" {...form.getInputProps("field")} />
                <MyTextInput label="Sinh viên đăng ký" {...form.getInputProps("studentName")} />
                <MyTextInput label="Khoa" {...form.getInputProps("department")} />
                <MyTextInput label="Lớp" {...form.getInputProps("class")} />
                <MyTextInput label="Kinh phí dự kiến" {...form.getInputProps("estimateCost")} />
                <MyTextInput label="Thời gian dự kiến" {...form.getInputProps("estimateTime")} />
                <MyFileInput label="File đăng ký" placeholder="chọn file" {...form.getInputProps("addFile")} />
                <MyTextInput label="Ý kiến của hội đồng" {...form.getInputProps("councilOpinion")} />
                <Checkbox
                    label="Kết quả phê duyệt"
                    checked={form.values.resultOfApproval}
                    onChange={(event) => form.setFieldValue("resultOfApproval", event.currentTarget.checked)}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

