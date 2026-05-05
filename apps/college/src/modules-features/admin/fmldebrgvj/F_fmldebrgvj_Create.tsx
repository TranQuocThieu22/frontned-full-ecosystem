'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface IDsThoiGian {
    id?: number,
    name?: string,
    code?: string,
    sang?: number,
    chieu?: number,
    toi?: number,
    note?: string
}
export default function F_fmldebrgvj_Create(
    { documentType }: { documentType: number }
) {
    const form = useForm<IDsThoiGian>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",

        },
        validate: {
            name: (value) => value ? null : 'Không được để trống'
        }
    })
    return (
        <MyButtonCreate objectName="Phân bổ loại thời gian" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã thời gian" {...form.getInputProps("code")} />
            <MyTextInput label="Tên thời gian" {...form.getInputProps("name")} />
            <MyNumberInput label="Sáng" {...form.getInputProps("sang")} defaultValue={0} />
            <MyNumberInput label="chiều" {...form.getInputProps("chieu")} defaultValue={0} />
            <MyNumberInput label="tối" {...form.getInputProps("toi")} defaultValue={0} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


