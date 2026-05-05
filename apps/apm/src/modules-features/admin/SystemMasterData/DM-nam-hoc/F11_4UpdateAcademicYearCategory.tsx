'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogAcademicYear } from "@/interfaces/global-interface/ISystemCatalogAcademicYear"
import { Switch } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"

export default function F11_4UpdateAcademicYearCategory(
    { values }: { values: ISystemCatalogAcademicYear }
) {
    const form = useForm<ISystemCatalogAcademicYear>({
        initialValues: {
            ...values,
            academicYearEnd: new Date(values.academicYearEnd!),
            academicYearStart: new Date(values.academicYearStart!),
            administrativeYearEnd: new Date(values.administrativeYearEnd!),
            administrativeYearStart: new Date(values.administrativeYearStart!),
        },
    })


    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
                baseAxios.post("/AcademicYear/update", {
                    id: values.id,
                    code: form.values.code,
                    name: form.values.name,
                    isEnabled: true,
                    administrativeYearStart: form.values.administrativeYearStart,
                    administrativeYearEnd: form.values.administrativeYearEnd,
                    academicYearStart: form.values.academicYearStart,
                    academicYearEnd: form.values.academicYearEnd,
                    isCurrent: form.values.isCurrent
                })
            }}
        >
            <MyFlexColumn>
                <MyTextInput label="Mã" {...form.getInputProps("code")} />
                <MyTextInput label="Tên" {...form.getInputProps("name")} />
                <DateInput
                    label="Ngày bắt đầu hành chính"
                    {...form.getInputProps("administrativeYearStart")}
                />
                <DateInput
                    label="Ngày kết thúc hành chính"
                    {...form.getInputProps("administrativeYearEnd")}
                />
                <DateInput
                    label="Ngày bắt đầu năm học"
                    {...form.getInputProps("academicYearStart")}
                />
                <DateInput
                    label="Ngày kết thúc năm học"
                    {...form.getInputProps("academicYearEnd")}
                />
                <Switch
                    label="Năm hiện hành"
                    checked={form.values.isCurrent}
                    {...form.getInputProps("isCurrent")}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}
