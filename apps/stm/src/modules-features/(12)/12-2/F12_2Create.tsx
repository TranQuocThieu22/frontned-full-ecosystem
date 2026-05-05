"use client"
import baseAxios from '@/api/config/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
//REVIEW: quuoc thieu review 47513

export default function F12_2Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            code: "",
            name: "",
            note: ""
        },
        validate: {
            code: (value) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số , và dấu '-' "
                : "Không được để trống",
            name: (value) => value ? null : 'Không được để trống',
        },
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <MyButtonCreate
                objectName='Tính chất phòng'
                form={form}
                onSubmit={
                    (values) => {
                        return baseAxios.post("/skillCenter/create", values)
                    }
                }>
                <MyTextInput label="Mã trung tâm" {...form.getInputProps("code")} />
                <MyTextInput label="Tên trung tâm" {...form.getInputProps("name")} />


                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    )
}

