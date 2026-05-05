'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    name?: string //họ tên
    birthDate?: Date | null

    sex?: string //Giới tính

    semYearStart?: string //năm học kỳ bắt đầu
    semYearEnd?: string //năm học kỳ kết thúc
    policyName?: string //diện chính sách

    ghiChu?: string
}

export default function F_faofhttxaq_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong

    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã sinh viên' {...form.getInputProps("studentCode")} />
            <MyTextInput label='Họ tên' {...form.getInputProps("name")} />
            <MyDateInput label='Ngày sinh' clearable {...form.getInputProps("birthDate")} />
            <Select
                label="Giới tính"
                data={[
                    { value: "1", label: "Nam" },
                    { value: "2", label: "Nữ" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("sex", value?.toString())}
            />
            <Select
                searchable
                label="Năm học kỳ bắt đầu"
                data={[
                    { value: "1", label: "2024 - 1" },
                    { value: "2", label: "2028 - 1" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("semYearStart", value?.toString())}
            />
            <Select
                searchable
                label="Năm học kỳ kết thúc"
                data={[
                    { value: "1", label: "2024 - 1" },
                    { value: "2", label: "2028 - 1" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("semYearEnd", value?.toString())}
            />
            {/* <MyDateInput label='Năm học kỳ bắt đầu' {...form.getInputProps("semYearStart")} />
            <MyDateInput label='Năm học kỳ kết thúc' {...form.getInputProps("semYearEnd")} /> */}
            <Select
                label="Diện chính sách"
                data={[
                    { value: "1", label: "Hộ cận nghèo" },
                    { value: "2", label: "Diện 2" },
                    { value: "3", label: "Diện 3" },
                    { value: "4", label: "Diện 4" },
                    { value: "5", label: "Diện 5" },
                    { value: "6", label: "Diện 6" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("policyName", value?.toString())}
            />

            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    )
}