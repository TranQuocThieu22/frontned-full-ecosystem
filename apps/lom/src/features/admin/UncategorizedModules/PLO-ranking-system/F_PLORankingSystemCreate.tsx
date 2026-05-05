'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate'
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput'
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Checkbox } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

export interface I_PLORankingSystemCreate {
    order: number | null;
    note: string;
    nameEg: string;
    point: number | null;
    isFailed: boolean;
    id: number;
    code: string | null;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_PLORankingSystemCreate() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<I_PLORankingSystemCreate>({
        mode: "uncontrolled",
        initialValues: {
            order: 0,
            note: "",
            nameEg: "",
            point: null,
            isFailed: false,
            id: 0,
            code: null,
            name: "",
            concurrencyStamp: "",
            isEnabled: true,
        },
        validate: {
            order: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    })

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            console.log("Thêm thành công: ", form.values);
            await baseAxios.post("/COERatingPLO/Create", values)
        }}
            objectName='Chi tiết Bảng xếp hạng PLO'>
            <MyTextInput label='Thứ tự' {...form.getInputProps("order")} />
            <MyTextInput label='Xếp loại' {...form.getInputProps("name")} />
            <MyTextInput label='Xếp loại Eg' {...form.getInputProps("nameEg")} />
            <MyNumberInput min={0} label='Điểm >=' {...form.getInputProps("point")} />
            <Checkbox label="Không đạt" {...form.getInputProps("isFailed", { type: 'checkbox' })} />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


