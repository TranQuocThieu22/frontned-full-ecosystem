import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import MySelect from '@/components/Combobox/Select/MySelect';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyNumberFormatter from '@/components/DataDisplay/NumberFormatter/MyNumberFormatter';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Checkbox, FileInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react'
import F6_6Form_Table from './F6_6Form_Table';
import MyActionIconUpload from '@/components/ActionIcons/ActionIconUpload/MyActionIconUpload';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';

interface I {
    maHoSo?: string
    ngayKy?: Date,
    daKy?: boolean,
    tenHoSo?: string,
    keHoach?: string,
    fileMinhChung?: string,
    nguoiKy?: string
}
export default function F6_6Form({ values }: { values?: I }) {
    const form = useForm({
        initialValues: values
    })

    if (values) return (
        <MyActionIconUpdate title='Chi tiết hồ sơ trình ký sữa chữa, bảo trì, nâng cấp tài sản' modalSize={'80%'} form={form} onSubmit={() => { }}>
            <Group align="end">
                <MyTextInput label='Mã hồ sơ' {...form.getInputProps("maHoSo")} />
                <MyDateInput label='Ngày ký'  {...form.getInputProps("ngayKy")} />
                <Checkbox label="Đã ký"  {...form.getInputProps("daKy")} />
            </Group>
            <MyTextInput label='Tên hồ sơ'  {...form.getInputProps("tenHoSo")} />
            <MySelect label='Kế hoạch'  {...form.getInputProps("keHoach")} data={['Bảo trì vật tư đợt 1 2025', 'Bảo trì vật tư đợt 2 2025']} />
            <Group>
                <MyFileInput label='File minh chứng' />
                <MyTextInput label='Người ký' {...form.getInputProps("nguoiKy")} />
            </Group>
            <F6_6Form_Table />
        </MyActionIconUpdate>
    )
    return (
        <MyButtonCreate title='Chi tiết hồ sơ trình ký sữa chữa, bảo trì, nâng cấp tài sản' modalSize={'80%'} form={form} onSubmit={() => { }}>
            <Group align="end">
                <MyTextInput label='Mã hồ sơ' {...form.getInputProps("maHoSo")} />
                <MyDateInput label='Ngày ký'  {...form.getInputProps("ngayKy")} />
                <Checkbox label="Đã ký"  {...form.getInputProps("daKy")} />
            </Group>
            <MyTextInput label='Tên hồ sơ'  {...form.getInputProps("tenHoSo")} />
            <MySelect label='Kế hoạch'  {...form.getInputProps("keHoach")} data={['Bảo trì vật tư đợt 1 2025', 'Bảo trì vật tư đợt 2 2025']} />
            <Group>
                <MyFileInput label='File minh chứng' />
                <MyTextInput label='Người ký' {...form.getInputProps("nguoiKy")} />
            </Group>
            <F6_6Form_Table />
        </MyButtonCreate>
    )
}
