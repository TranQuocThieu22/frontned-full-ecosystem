
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_2_3_2Read } from "./F6_2_3_2Read"

export default function F6_2_3_2Update(
    { values }: { values: I6_2_3_2Read }
) {
    const form = useForm<I6_2_3_2Read>({
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
                    label="Lĩnh vực"
                    {...form.getInputProps("field")} // Field for 'field'
                />
                <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    {...form.getInputProps("groupName")} // Field for 'groupName'
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    {...form.getInputProps("leader")} // Field for 'leader'
                />
                <MyTextInput
                    label="Người đánh giá"
                    {...form.getInputProps("marker")} // Field for 'marker'
                />
                <MyTextInput
                    label="Ngày đánh giá"
                    {...form.getInputProps("markedDate")} // Field for 'markedDate'
                />
                <MyTextInput
                    label="Tổng điểm"
                    {...form.getInputProps("totalMark")} // Field for 'totalMark'
                />
                <MyTextInput
                    label="Nhận xét"
                    {...form.getInputProps("comment")} // Field for 'comment'
                />
                <MyFileInput
                    label="File đánh giá"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Field for 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

