
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_1_1Member } from "./F6_1_1Create"

export default function I6_1_1UpdateMember(
    { values }: { values: I6_1_1Member }
) {
    const form = useForm<I6_1_1Member>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Mã giảng viên"
                    {...form.getInputProps("teacherNumber")} // Maps to 'teacherNumber'
                />
                <MyTextInput
                    label="Họ và tên"
                    {...form.getInputProps("name")} // Maps to 'name'
                />
                <MyTextInput
                    label="Học hàm"
                    {...form.getInputProps("level")} // Maps to 'level'
                />
                <MyTextInput
                    label="Học vị"
                    {...form.getInputProps("degree")} // Maps to 'degree'
                />
                <MyTextInput
                    label="Vai trò"
                    {...form.getInputProps("position")} // Maps to 'position'
                />
                <MyTextInput
                    label="Đơn vị công tác"
                    {...form.getInputProps("unit")} // Maps to 'unit'
                />
                <MyTextInput
                    label="Email"
                    {...form.getInputProps("email")} // Maps to 'email'
                />
                <MyTextInput
                    label="Số điện thoại"
                    {...form.getInputProps("phoneNumber")} // Maps to 'phoneNumber'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

