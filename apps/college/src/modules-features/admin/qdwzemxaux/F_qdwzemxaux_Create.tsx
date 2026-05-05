'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface IBanGio {
    id?: number,
    name?: string,
    code?: string,
    note?: string

}
export default function F_qdwzemxaux_Create(
    { documentType }: { documentType: number }
) {
    const form = useForm<IBanGio>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
            note: ""

        },
        validate: {
            name: (value) => value ? null : 'Không được để trống'
        }
    })
    return (
        <MyButtonCreate objectName="chi tiết bận giờ" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã bận giờ" {...form.getInputProps("code")} />
            <MyTextInput label="Tên bận giờ" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} defaultValue={form.values.note} />
        </MyButtonCreate>
    )
}


