"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    id?: number;
    maTrungTam?: string;
    tenTrungTam?: string;
    note?: string;
}

export default function F12_2Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            maTrungTam: "",
            tenTrungTam: "",
            note: ""
        },
        validate: {
            maTrungTam: (value) => value ? null : 'Không được để trống',
            tenTrungTam: (value) => value ? null : 'Không được để trống',
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
                <MyTextInput label="Mã trung tâm" {...form.getInputProps("maTrungTam")} />
                <MyTextInput label="Tên trung tâm" {...form.getInputProps("tenTrungTam")} />


                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    )
}

