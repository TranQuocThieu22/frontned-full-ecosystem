
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I6_1_3ResearchGroup } from "./F6_1_3Create"

export default function F6_1_3UpdateResearchGroup(
    { values }: { values: I6_1_3ResearchGroup }
) {
    const form = useForm<I6_1_3ResearchGroup>({
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
                    {...form.getInputProps("groupName")} // Maps to 'groupName'
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    {...form.getInputProps("leader")} // Maps to 'leader'
                />
                <MyTextInput
                    label="Học hàm - học vị"
                    {...form.getInputProps("level")} // Maps to 'level'
                />
                <MyTextInput
                    label="Lĩnh vực hoạt động"
                    {...form.getInputProps("department")} // Maps to 'department'
                />
                <MyFileInput
                    label="Đơn đăng ký"
                    placeholder="Chọn file"
                    {...form.getInputProps("signUpFile")} // Maps to 'signUpFile'
                />
                <MyFileInput
                    label="Thuyết minh nhóm"
                    placeholder="Chọn file"
                    {...form.getInputProps("explanationFile")} // Maps to 'explanationFile'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

