
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_4_1_3Summary } from "./F7_4_1_3ReadSummary"


export default function F7_4_1_3UpdateSummary(
    { values }: { values: I7_4_1_3Summary }
) {
    const form = useForm<I7_4_1_3Summary>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Số quyết định hội đồng xét duyệt đề tài"
                    {...form.getInputProps("decisionNumber")} // Field for 'decisionNumber'
                />
                <MyTextInput
                    label="Mã đề tài"
                    {...form.getInputProps("researchNumber")} // Field for 'researchNumber'
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("reseacrhName")} // Field for 'reseacrhName'
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Field for 'headOfDepartment'
                />
                <MyTextInput
                    label="Cố vấn"
                    {...form.getInputProps("advisor")} // Field for 'advisor'
                />
                <MyTextInput
                    label="Điểm trung bình"
                    {...form.getInputProps("averageMark")} // Field for 'averageMark'
                    type="number" // Ensures numeric input
                />
                <MyTextInput
                    label="Đánh giá"
                    {...form.getInputProps("comment")} // Field for 'comment'
                />
                <MyFileInput
                    label="File biên bản"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Field for 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

