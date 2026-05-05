"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import { Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    id?: number;
    maPhong?: string;
    tenPhong?: string;
    chiNhanh?: string;
    day?: string;
    sucChuaHoc?: number;
    sucChuaThi?: number;
    tinhChatPhong?: string;
}

export default function F10_3Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            maPhong: "",
            tenPhong: "",
            chiNhanh: "",
            day: "",
            sucChuaHoc: 0,
            sucChuaThi: 0,
            tinhChatPhong: "",
        },
        validate: {
            maPhong: (value) => value ? null : 'Không được để trống',
            tenPhong: (value) => value ? null : 'Không được để trống',
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
            <MyButtonCreate label='Xếp lịch thi'
                objectName='Tính chất phòng'
                form={form}
                onSubmit={
                    () => {
                        console.log("thêm thành công: ", form.values);
                        // baseAxios.post("userNCKHs", form.values)
                    }
                }>

            </MyButtonCreate>
        </Group>
    )
}

