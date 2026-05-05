"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    id?: number;
    maDanhMucNhomKH?: string;
    tenDanhMucNhomKH?: string;
    note?: string;
}

export default function F12_4Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            maDanhMucNhomKH: "",
            tenDanhMucNhomKH: "",
            note: ""
        },
        validate: {
            maDanhMucNhomKH: (value) => value ? null : 'Không được để trống',
            tenDanhMucNhomKH: (value) => value ? null : 'Không được để trống',
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
                        console.log("thêm thành công: ", form.values);
                        // baseAxios.post("userNCKHs", form.values)
                    }
                }>
                <MyTextInput label="Mã nhóm" {...form.getInputProps("maDanhMucNhomKH")} />
                <MyTextInput label="Tên nhóm" {...form.getInputProps("tenDanhMucNhomKH")} />


                <Textarea label="Ghi chú" {...form.getInputProps("note")} placeholder='Nhập ghi chú' />
            </MyButtonCreate>
        </Group>
    )
}

