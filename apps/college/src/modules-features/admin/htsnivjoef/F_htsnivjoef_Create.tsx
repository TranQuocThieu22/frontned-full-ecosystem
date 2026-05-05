'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface ITinhChatThi {
    id?: number,
    name?: string,
    code?: string,
    note?: string,

}
export default function F_htsnivjoef_Create(
    { documentType }: { documentType: number }
) {
    const form = useForm<ITinhChatThi>({
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
        <MyButtonCreate objectName="chi tiết Tính chất thi" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã Tính chất thi" {...form.getInputProps("code")} />
            <MyTextInput label="Tên Tính chất thi" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


