import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal'
import MySelect from '@/components/Combobox/Select/MySelect'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Box, Fieldset, Group, Select, SimpleGrid, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import SF6_2Table from './SF6_2Table'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'

interface I {
    maYeuCau?: string
    ngayYeuCau?: Date,
    donViYeuCau?: string,
    nguoiGui?: string
    chonKeHoach?: string
    ghiChu?: String
    dinhKemFileYeuCau?: string
}

export default function F6_2Form({ values }: { values?: I }) {
    const form = useForm({
        initialValues: values
    })
    if (values) return (
        <MyActionIconUpdate modalSize={'80%'} form={form} onSubmit={() => { }}>
            <SimpleGrid>
                <MyTextInput disabled label="Mã yêu cầu" {...form.getInputProps("maYeuCau")} />
                <MyDateInput disabled readOnly label="Ngày yêu cầu" {...form.getInputProps("ngayYeuCau")} />
                <MySelect label="Đơn vị yêu cầu" data={['Phòng kế toán', 'Phòng hành chính']} {...form.getInputProps("donViYeuCau")} />
                <Group align='center'>
                    <Text>Người gửi: Tô Ngọc Lâm</Text>
                </Group>
            </SimpleGrid>
            <MySelect label='Chọn kế hoạch' data={['Bảo dưỡng thiết bị trong đợt 1 2024', 'Bảo dưỡng thiết bị trong đợt 2 2024']} />
            <MyTextArea label='Ghi chú' />
            <MyFileInput label='File yêu cầu' />
            <SF6_2Table />
        </MyActionIconUpdate>
    )
    return (
        <MyButtonCreate modalSize={'80%'} form={form} onSubmit={() => { }}>
            <SimpleGrid>
                <MyTextInput label="Mã yêu cầu" />
                <MyDateInput label="Ngày yêu cầu" />
                <MySelect label="Đơn vị yêu cầu" data={['Phòng kế toán', 'Phòng kinh doanh']} />
                <Group align='center'>
                    <Text>Người gửi: Tô Ngọc Lâm</Text>
                </Group>
            </SimpleGrid>
            <MySelect label='Chọn kế hoạch' data={['Bảo dưỡng thiết bị trong đợt 1 2024', 'Bảo dưỡng thiết bị trong đợt 2 2024']} />
            <MyTextArea label='Ghi chú' />
            <MyFileInput label='File yêu cầu' />
            <SF6_2Table />
        </MyButtonCreate>
    )
}
