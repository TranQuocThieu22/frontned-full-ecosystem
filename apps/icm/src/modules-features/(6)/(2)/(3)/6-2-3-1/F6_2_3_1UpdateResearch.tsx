
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_2_3_1Research } from "./F6_2_3_1Create"

export default function F6_2_3_1UpdateResearch(
    { values }: { values: I6_2_3_1Research }
) {
    const form = useForm<I6_2_3_1Research>({
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
                    placeholder="Nhập mã đề tài"
                    {...form.getInputProps("researchNumber")} // Maps to 'researchNumber'
                />
                <MyTextInput
                    label="Tên đề tài"
                    placeholder="Nhập tên đề tài"
                    {...form.getInputProps("researchName")} // Maps to 'researchName'
                />
                <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    placeholder="Nhập tên nhóm nghiên cứu"
                    {...form.getInputProps("groupName")} // Maps to 'groupName'
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    placeholder="Nhập tên trưởng nhóm"
                    {...form.getInputProps("leader")} // Maps to 'leader'
                />
                <MyTextInput
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    {...form.getInputProps("phoneNumber")} // Maps to 'phoneNumber'
                />
                <MyTextInput
                    label="Email"
                    placeholder="Nhập email"
                    {...form.getInputProps("email")} // Maps to 'email'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

