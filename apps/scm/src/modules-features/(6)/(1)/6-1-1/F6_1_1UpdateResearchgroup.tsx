
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I6_1_1ResearchGroup } from "./F6_1_1Read"

export default function F6_1_1UpdateResearchgroup(
    { values }: { values: I6_1_1ResearchGroup }
) {
    const form = useForm<I6_1_1ResearchGroup>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    {...form.getInputProps("name")} // Field for 'name'
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    {...form.getInputProps("leader")} // Field for 'leader'
                />
                <MyTextInput
                    label="Học hàm - Học vị"
                    {...form.getInputProps("level")} // Field for 'level'
                />
                <MyTextInput
                    label="Lĩnh vực hoạt động"
                    {...form.getInputProps("department")} // Field for 'department'
                />
                <MyFileInput
                    label="Đơn đăng ký"
                    placeholder="Chọn file"
                    {...form.getInputProps("signUpFile")} // Field for 'signUpFile'
                />
                <MyFileInput
                    label="Thuyết minh nhóm"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Field for 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

