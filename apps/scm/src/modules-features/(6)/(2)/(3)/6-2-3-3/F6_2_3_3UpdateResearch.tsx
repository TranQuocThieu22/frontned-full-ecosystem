
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_2_3_3Research } from "./F6_2_3_3Create"
import { Checkbox } from "@mantine/core"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"

export default function F6_2_3_3UpdateResearch(
    { values }: { values: I6_2_3_3Research }
) {
    const form = useForm<I6_2_3_3Research>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>

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


                <MyNumberInput
                    label="Điểm trung bình"
                    placeholder="Nhập điểm trung bình"
                    {...form.getInputProps("averageMark")} // Maps to 'averageMark'
                />
                <Checkbox
                    label="Thực hiện"
                    checked={form.values.completed}
                    onChange={(event) => form.setFieldValue("completed", event.currentTarget.checked)}
                />


            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

