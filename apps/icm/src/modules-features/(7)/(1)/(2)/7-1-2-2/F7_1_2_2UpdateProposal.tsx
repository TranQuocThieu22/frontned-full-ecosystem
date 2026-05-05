'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm } from "@mantine/form"


export default function F7_1_2_2UpdateProposal(
    { values }: { values: ISystemCatalogRoleActivity }
) {
    const form = useForm<ISystemCatalogRoleActivity>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
            }}
        >
            <MyFlexColumn>
            <MyTextInput label="Tên đề tài" {...form.getInputProps("researchName")} />
                <MyTextInput label="Lĩnh vực" {...form.getInputProps("field")} />
                <MyTextInput label="Sinh viên đăng ký" {...form.getInputProps("studentName")} />
                <MyTextInput label="Khoa" {...form.getInputProps("department")} />
                <MyTextInput label="Lớp" {...form.getInputProps("class")} />
                <MyTextInput label="Kinh phí dự kiến" {...form.getInputProps("estimateCost")} />
                <MyTextInput label="Thời gian dự kiến" {...form.getInputProps("estimateTime")} />
                <MyFileInput label="File đăng ký" placeholder="chọn file" {...form.getInputProps("addFile")}/>
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}
