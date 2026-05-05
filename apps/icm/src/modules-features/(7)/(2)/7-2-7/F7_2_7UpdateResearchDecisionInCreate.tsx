
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_2_7Propose } from "./F7_2_7CreateResearchDecision"

export default function F7_2_7UpdateResearchDecisionInCreate(
    { values }: { values: I7_2_7Propose }
) {
    const form = useForm<I7_2_7Propose>({
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
                    {...form.getInputProps("researchNumber")} // Binds to 'researchNumber' field
                    placeholder="Nhập mã đề tài"
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")} // Binds to 'researchName' field
                    placeholder="Nhập tên đề tài"
                />
                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("headOfDepartment")} // Binds to 'headOfDepartment' field
                    placeholder="Nhập tên chủ nhiệm"
                />
                <MyTextInput
                    label="Lớp"
                    {...form.getInputProps("class")} // Binds to 'class' field
                    placeholder="Nhập lớp"
                />
                <MyTextInput
                    label="Khoa"
                    {...form.getInputProps("department")} // Binds to 'department' field
                    placeholder="Nhập khoa"
                    type="number" // Ensures numeric input
                />
                <MyTextInput
                    label="Cố vấn"
                    {...form.getInputProps("advisor")} // Binds to 'advisor' field
                    placeholder="Nhập tên cố vấn"
                />
                <MyTextInput
                    label="Kinh phí"
                    {...form.getInputProps("cost")} // Binds to 'cost' field
                    placeholder="Nhập kinh phí"
                    type="text" // Ensures input accepts formatted currency strings
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

