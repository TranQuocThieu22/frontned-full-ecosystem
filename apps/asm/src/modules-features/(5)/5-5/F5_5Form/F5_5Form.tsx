import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyTab from '@/components/Layouts/Tab/MyTab'
import { Group, SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import SF5_5Form_Tab_1 from './SF5_5Form_Tab_1'
import SF5_5Form_Tab_2 from './SF5_5Form_Tab_2'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'

interface I {
    ngayChungTu?: Date,
    soChungTu?: string,
    ghiChu?: string,
    giaTriThanhLy?: number
}

export default function F5_5Form({ values }: { values?: I }) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: values
    })
    if (values) return (
        <MyActionIconUpdate modalSize={"80%"} form={form} onSubmit={() => { }}>
            <SimpleGrid>
                <MyDateInput label='Ngày chứng từ' {...form.getInputProps("ngayChungTu")} />
                <MyTextInput label='Số chứng từ' {...form.getInputProps("soChungTu")} />
                <MyTextInput label='Giá trị thanh lý' {...form.getInputProps("giaTriThanhLy")} />
            </SimpleGrid>
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />
            <MyTab
                tabList={[
                    { label: "Danh sách tài sản thanh lý" },
                    { label: "Thành phần tham gia" },
                ]}
            >
                <SF5_5Form_Tab_1 />
                <SF5_5Form_Tab_2 />
            </MyTab>
        </MyActionIconUpdate>
    )
    return (
        <MyButtonCreate modalSize={"80%"} form={form} onSubmit={() => { }}>
            <SimpleGrid>
                <MyTextInput label='Ngày chứng từ' {...form.getInputProps("ngayChungTu")} />
                <MyTextInput label='Số chứng từ' {...form.getInputProps("soChungTu")} />
                <MyTextInput label='Giá trị thanh lý' {...form.getInputProps("giaTriThanhLy")} />
            </SimpleGrid>
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />
            <MyTab
                tabList={[
                    { label: "Danh sách tài sản thanh lý" },
                    { label: "Thành phần tham gia" },
                ]}
            >
                <SF5_5Form_Tab_1 />
                <SF5_5Form_Tab_2 />
            </MyTab>
        </MyButtonCreate>
    )
}
