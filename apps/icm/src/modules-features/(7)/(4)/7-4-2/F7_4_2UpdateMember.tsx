
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_4_2Member } from "./F7_4_2CreateDecision"
import { Checkbox } from "@mantine/core"



export default function F7_4_2UpdateMember(
    { values }: { values: I7_4_2Member }
) {
    const form = useForm<I7_4_2Member>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Mã thành viên"
                    placeholder="Nhập mã thành viên" // Placeholder for better UX
                    required // Makes the field mandatory
                    {...form.getInputProps("memberCode")} // Field for 'memberCode'
                />

                <MyTextInput
                    label="Họ tên"
                    placeholder="Nhập họ tên thành viên" // Placeholder for better UX
                    required // Makes the field mandatory
                    {...form.getInputProps("memberName")} // Field for 'memberName'
                />

                <MyTextInput
                    label="Chức vụ"
                    placeholder="Nhập chức vụ" // Placeholder for better UX
                    required // Makes the field mandatory
                    {...form.getInputProps("position")} // Field for 'position'
                />

                <MyTextInput
                    label="Thù lao"
                    placeholder="Nhập số tiền thù lao" // Placeholder for better UX
                    required // Makes the field mandatory
                    {...form.getInputProps("money")} // Field for 'money'
                />

                <Checkbox
                    label="Đã nhận"
                    checked={form.values.received || false} // Reflects the 'received' value
                    onChange={(event) => form.setFieldValue("received", event.currentTarget.checked)} // Updates the 'received' value in the form
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

