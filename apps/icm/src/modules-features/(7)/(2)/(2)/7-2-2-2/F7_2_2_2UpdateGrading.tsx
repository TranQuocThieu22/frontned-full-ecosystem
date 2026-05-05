
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { F7_2_2_2Grading } from "./F7_2_2_2ReadAllGrading"
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor"

export default function F7_2_2_2UpdateGrading(
    { values }: { values: F7_2_2_2Grading }
) {
    const form = useForm<F7_2_2_2Grading>({
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
                    {...form.getInputProps("researchName")} // Matches 'researchName' field in the interface
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Matches 'headOfDepartment' field in the interface
                />
                <MyTextInput
                    label="Người đánh giá"
                    {...form.getInputProps("markerName")} // Matches 'markerName' field in the interface
                />
                <MyDateInput
                    label="Ngày đánh giá"
                    {...form.getInputProps("markingDate")} // Matches 'markingDate' field in the interface
                />
                <MyTextInput
                    label="Tổng điểm"
                    {...form.getInputProps("totalMark")} // Matches 'totalMark' field in the interface
                />
                <MyTextEditor
                    label="Nhận xét"
                    {...form.getInputProps("comment")} // Matches 'comment' field in the interface
                />
                <MyFileInput
                    label="File đánh giá"
                    placeholder="Chọn file"
                    {...form.getInputProps("markingFile")} // Matches 'markingFile' field in the interface
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

