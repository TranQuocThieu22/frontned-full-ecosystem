"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MySelect from '@/components/Combobox/Select/MySelect'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { affiliationOptions, KieuDonVi } from "./F12_4Read"
interface I {
    id?: number,
    unitCode?: string
    unitName?: string,
    unitType?: KieuDonVi,
    affiliation: string,
    note?: string
}
export default function F12_4Create() {
    const [affiliationData, setAffiliationData] = useState<string[]>([])
    const form = useForm<I>({
        initialValues: {
            unitCode: "",
            unitType: KieuDonVi.Khoa,
            unitName: "",
            affiliation: "",
            note: "",
        },

        validate: {
            unitCode: (value) => value ? null : 'Không được để trống',
            unitName: (value) => value ? null : 'Không được để trống',
        }

    })

    useEffect(() => {
        const locationType = form.values.unitType
        if (locationType && affiliationOptions[locationType]) {
            setAffiliationData(affiliationOptions[locationType])
            form.setFieldValue('affiliation', '')
        }
    }, [form.values.unitType])

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            return await {}
        }} objectName='đơn vị'>
            <MyTextInput label='Mã đơn vị' {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên đơn vị' {...form.getInputProps("unitName")} />
            <MySelect data={Object.values(KieuDonVi)} label='Loại đơn vị' {...form.getInputProps("unitType")} />
            <MySelect data={affiliationData} label='Trực thuộc' {...form.getInputProps("affiliation")} />
            <MyTextInput label='Ghi Chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


