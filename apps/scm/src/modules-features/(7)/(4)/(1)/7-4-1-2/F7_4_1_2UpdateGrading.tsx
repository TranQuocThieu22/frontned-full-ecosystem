
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_4_1_2Grading } from "./F7_4_1_2CreateGrading"


export default function F7_4_1_2UpdateDecision(
    { values }: { values: I7_4_1_2Grading }
) {
    const form = useForm<I7_4_1_2Grading>({
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
                    {...form.getInputProps("reseacrhName")} // Field for 'reseacrhName'
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Field for 'headOfDepartment'
                />
                <MyTextInput
                    label="Người đánh giá"
                    {...form.getInputProps("marker")} // Field for 'marker'
                />
                <MyDateInput
                    label="Ngày đánh giá"
                    {...form.getInputProps("markDate")} // Field for 'markDate'
                />
                <MyTextInput
                    label="Tổng điểm"
                    {...form.getInputProps("totalMark")} // Field for 'totalMark'
                    type="number" // Ensures numeric input
                />
                <MyTextInput
                    label="Nhận xét"
                    {...form.getInputProps("comment")} // Field for 'comment'
                />
                <MyFileInput
                    label="File đánh giá"
                    placeholder="Chọn file"
                    {...form.getInputProps("markFile")} // Field for 'markFile'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

