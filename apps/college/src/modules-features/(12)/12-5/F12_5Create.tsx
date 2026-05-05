"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MySelect from '@/components/Combobox/Select/MySelect'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { KieuDiaBan, affiliationOptions } from './F12_5Read'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'

interface I {
    id?: number,
    locationCode?: string
    locationName?: string,
    locationType?: KieuDiaBan,
    affiliation: string,
    note?: string
}

export default function F12_5Create() {
    const [affiliationData, setAffiliationData] = useState<string[]>([])

    const form = useForm<I>({
        initialValues: {
            locationCode: "",
            locationType: KieuDiaBan.QuocGia,
            locationName: "",
            affiliation: "",
            note: "",
        },

        validate: {
            locationCode: (value) => value ? null : 'Không được để trống',
            locationName: (value) => value ? null : 'Không được để trống'
        }
    })

    useEffect(() => {
        const locationType = form.values.locationType
        if (locationType && affiliationOptions[locationType]) {
            setAffiliationData(affiliationOptions[locationType])
            form.setFieldValue('affiliation', '')
        }
    }, [form.values.locationType])

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            console.log(values)
        }} objectName='địa bàn'>
            <MyTextInput label='Mã địa bàn' {...form.getInputProps("locationCode")} />
            <MyTextInput label='Tên địa bàn' {...form.getInputProps("locationName")} />
            <MySelect data={Object.values(KieuDiaBan)} label='Loại địa bàn' {...form.getInputProps("locationType")} />
            <MySelect data={affiliationData} label='Trực thuộc' {...form.getInputProps("affiliation")} />
            <MyTextInput label='Ghi Chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


