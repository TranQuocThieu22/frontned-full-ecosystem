
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I6_1_4Decision } from "./F6_1_4Read"

export default function F6_1_4(
    { values }: { values: I6_1_4Decision }
) {
    const form = useForm<I6_1_4Decision>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Số quyết định"
                    {...form.getInputProps("decisionNumber")} // Field for 'decisionNumber'
                />
                <MyTextInput
                    label="Ngày họp"
                    {...form.getInputProps("date")} // Field for 'date'
                />
                <MyTextInput
                    label="Địa điểm"
                    {...form.getInputProps("location")} // Field for 'location'
                />
                <MyTextInput
                    label="Tổng số thành viên"
                    {...form.getInputProps("totalNumber")} // Field for 'totalNumber'
                />
                <MyTextInput
                    label="Số thành viên có mặt"
                    {...form.getInputProps("attended")} // Field for 'attended'
                />
                <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    {...form.getInputProps("groupName")} // Field for 'groupName'
                />
                <MyTextInput
                    label="Đánh giá"
                    {...form.getInputProps("qualify")} // Field for 'qualify'
                />
                <MyTextInput
                    label="Kết luận"
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

