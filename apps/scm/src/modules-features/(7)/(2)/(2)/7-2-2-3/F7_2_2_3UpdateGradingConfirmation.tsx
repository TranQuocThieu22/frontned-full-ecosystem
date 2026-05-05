
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor"
import { F7_2_2_3GradingConfirmation } from "./F7_2_2_3ReadAllGradingConfirmation"

export default function F7_2_2_3UpdateGradingConfirmation(
    { values }: { values: F7_2_2_3GradingConfirmation }
) {
    const form = useForm<F7_2_2_3GradingConfirmation>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Số quyết định hội đồng xét duyệt đề cương"
                    {...form.getInputProps("decisionNumber")} // Matches 'decisionNumber' field in the interface
                />
                <MyTextInput
                    label="Mã đề tài"
                    {...form.getInputProps("reseacrhNumber")} // Matches 'reseacrhNumber' field in the interface
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("reseacrhName")} // Matches 'reseacrhName' field in the interface
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Matches 'headOfDepartment' field in the interface
                />
                <MyTextInput
                    label="Điểm trung bình"
                    {...form.getInputProps("averageMark")} // Matches 'averageMark' field in the interface
                />
                <MyTextInput
                    label="Trưởng ban kiểm phiếu"
                    {...form.getInputProps("headOfConfirmation")} // Matches 'headOfConfirmation' field in the interface
                />
                <MyTextInput
                    label="Số lượng thành viên"
                    {...form.getInputProps("numberOfMember")} // Matches 'numberOfMember' field in the interface
                />
                <MyFileInput
                    label="File biên bản"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Matches 'file' field in the interface
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

