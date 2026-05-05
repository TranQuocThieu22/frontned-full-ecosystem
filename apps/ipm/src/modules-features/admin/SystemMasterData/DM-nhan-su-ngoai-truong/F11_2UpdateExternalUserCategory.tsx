'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { I11_2ExternalUser } from "./F11_2ReadExternalUserCategory"

export default function F11_2UpdateExternalUserCategory(
    { values }: { values: I11_2ExternalUser }
) {
    const form = useForm<I11_2ExternalUser>({
        initialValues: {
            ...values,
            birthDate: new Date(values.birthDate!),
        }
    })

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
                return baseAxios.put("/userNCKHs/" + form.values.id, form.values)
            }}
        >
            <MyFlexColumn>
                <MyTextInput label="Mã nhân sự" {...form.getInputProps("code")} />
                <MyTextInput label="Email" {...form.getInputProps("email")} />
                <MyTextInput label="Họ và tên" {...form.getInputProps("fullName")} />
                <DateInput
                    label="Ngày sinh"
                    placeholder="Nhập thông tin"
                    {...form.getInputProps("birthDate")}
                />
                <MyTextInput label="Học hàm" {...form.getInputProps("highestDegree")} />
                <MyTextInput label="Học vị" {...form.getInputProps("highestScientificTitle")} />
                <MyTextInput label="Đơn vị công tác" {...form.getInputProps("woringPlace")} />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}
