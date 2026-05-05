'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { U0MyValidateEmpty } from "@/utils/validateForm"
import { Switch } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"

export default function F11_4CreateDocumentTypeCategory() {

    const form = useForm<any>({
        initialValues: {
            code: "",
            name: "",
            isEnabled: false,
            administrativeYearStart: undefined,
            administrativeYearEnd: undefined,
            academicYearStart: undefined,
            academicYearEnd: undefined,
            isCurrent: false
        },
        validate: {
            code: U0MyValidateEmpty(),
            name: U0MyValidateEmpty(),
        }
    })
    return (
        <MyButtonCreate
            objectName="Danh mục năm học"
            form={form} onSubmit={() => {
                return baseAxios.post("/SystemCatalogDomainCategory/Create", form.values)
            }}
        >
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <DateInput
                label="Ngày bắt đầu hành chính"
                placeholder="Nhập thông tin"
                {...form.getInputProps("administrativeYearStart")}
            />
            <DateInput
                label="Ngày kết thúc hành chính"
                placeholder="Nhập thông tin"
                {...form.getInputProps("administrativeYearEnd")}
            />
            <DateInput
                label="Ngày bắt đầu năm học"
                placeholder="Nhập thông tin"
                {...form.getInputProps("academicYearStart")}
            />
            <DateInput
                label="Ngày kết thúc năm học"
                placeholder="Nhập thông tin"
                {...form.getInputProps("academicYearEnd")}
            />
            <Switch
                defaultChecked={false}
                label="Năm hiện hành"
                {...form.getInputProps("isCurrent")}
            />
        </MyButtonCreate>
    )
}
