
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_1_1OutMember } from "./F6_1_1Create"

export default function F6_1_1UpdateOuterMember(
    { values }: { values: I6_1_1OutMember }
) {
    const form = useForm<I6_1_1OutMember>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Mã giảng viên ngoài"
                    {...form.getInputProps("teacherNumberO")} // Maps to 'teacherNumberO'
                />
                <MyTextInput
                    label="Họ và tên"
                    {...form.getInputProps("nameO")} // Maps to 'nameO'
                />
                <MyTextInput
                    label="Học hàm - học vị"
                    {...form.getInputProps("levelO")} // Maps to 'levelO'
                />
                <MyTextInput
                    label="Vai trò"
                    {...form.getInputProps("positionO")} // Maps to 'positionO'
                />
                <MyTextInput
                    label="Đơn vị công tác"
                    {...form.getInputProps("unitO")} // Maps to 'unitO'
                />
                <MyTextInput
                    label="Email"
                    {...form.getInputProps("emailO")} // Maps to 'emailO'
                />
                <MyTextInput
                    label="Số điện thoại"
                    {...form.getInputProps("phoneNumberO")} // Maps to 'phoneNumberO'
                />
                <MyTextInput
                    label="Đính kèm thư cam kết"
                    {...form.getInputProps("addLetter")} // Maps to 'addLetter'
                />
                <MyTextInput
                    label="Thư cam kết"
                    {...form.getInputProps("agreeLetter")} // Maps to 'agreeLetter'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

