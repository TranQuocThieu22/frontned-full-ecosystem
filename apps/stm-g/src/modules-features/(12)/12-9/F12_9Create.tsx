"use client"
import baseAxios from '@/api/config/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import { Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    id?: number;
    date?: Date | undefined;
    note?: string;
}


export default function F12_9Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            date: undefined,
            note: "",
        },
        validate: {
            date: (value) => value ? null : 'Không được để trống',
            note: (value) => value ? null : 'Không được để trống',
        }
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
                objectName='ngày nghỉ lễ'
                form={form}
                onSubmit={
                    (value) => {
                        console.log("thêm thành công: ", value);
                        return baseAxios.post("/Holiday/create", value)
                    }
                }>
                <MyDateInput label="Ngày" {...form.getInputProps("date")} ></MyDateInput>
                <Textarea label="Mô tả" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    )
}

