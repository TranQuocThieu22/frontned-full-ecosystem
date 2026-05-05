
'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import { Checkbox } from "@mantine/core"
import { I7_2_1MemberData } from "./F7_2_1ReadResearch"

export default function F7_2_1ResearchInAction(
    { values }: { values: I7_2_1MemberData }
) {
    const form = useForm<I7_2_1MemberData>({
        initialValues: values
    })


    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => {
            }}
        >
            <MyFlexColumn>
                <MyTextInput label="Mã sinh viên" {...form.getInputProps("studentId")} />
                <MyTextInput label="Họ tên" {...form.getInputProps("studentName")} />
                <MyTextInput label="Lớp" {...form.getInputProps("class")} />
                <MyTextInput label="Khoa" {...form.getInputProps("department")} />
                <MyTextInput label="Chức vụ" {...form.getInputProps("position")} />
                <MyFileInput label="File lí lịch" placeholder="Chọn file" {...form.getInputProps("file")} />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

