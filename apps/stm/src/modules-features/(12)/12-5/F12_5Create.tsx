"use client"
import baseAxios from '@/api/config/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
//REVIEW: quuoc thieu review 47514

interface ICreateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    chiNhanh?: string;
    day?: string;
    sucChuaHoc?: number;
    sucChuaThi?: number;
    tinhChatPhong?: string;
    note?: string;
}

export default function F12_5Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            code: "",
            name: "",
            chiNhanh: "",
            day: "",
            sucChuaHoc: 0,
            sucChuaThi: 0,
            tinhChatPhong: "",
        },
        validate:
        {
            code: (value) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số , và dấu '-' "
                : "Không được để trống",
            name: (value) => value ? null : "không được để trống"
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
                objectName='Tính chất phòng'
                form={form}

                onSubmit={
                    () => {
                        return baseAxios.post("/roomType/create", form.values)
                    }
                }>
                <MyTextInput label="Mã Tính chất" {...form.getInputProps("code")} />
                <MyTextInput label="Tên tính chất" {...form.getInputProps("name")} />
                <MyTextArea label="Ghi chú" {...form.getInputProps("note")}></MyTextArea>
            </MyButtonCreate>
        </Group>
    )
}

