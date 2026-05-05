
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_4_1_3Research } from "./F7_4_1_3CreateSummary"


export default function F7_4_1_3Research(
    { values }: { values: I7_4_1_3Research }
) {
    const form = useForm<I7_4_1_3Research>({
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
                    {...form.getInputProps("researchNumber")} // Field for 'researchNumber'
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")} // Field for 'researchName'
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Field for 'headOfDepartment'
                />
                <MyTextInput
                    label="Điểm trung bình"
                    {...form.getInputProps("averageMark")} // Field for 'averageMark'
                />
                <MyTextInput
                    label="Đánh giá"
                    {...form.getInputProps("comment")} // Field for 'comment'
                />
                
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

