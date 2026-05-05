"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    id?: number;
    maDonViTinh?: string;
    tenDonViTinh?: string;
    note?: string;
}

export default function F12_3Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            maDonViTinh: "",
            tenDonViTinh: "",
            note: ""
        },
        validate: {
            maDonViTinh: (value) => value ? null : 'Không được để trống',
            tenDonViTinh: (value) => value ? null : 'Không được để trống',
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
                <MyTextInput label="Mã Đơn vị tính" {...form.getInputProps("maDonViTinh")} />
                <MyTextInput label="Tên Đơn vị tính" {...form.getInputProps("tenDonViTinh")} />


                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    )
}

