'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Select } from "@mantine/core"
import { useForm } from "@mantine/form"
interface IChungChi {
    id?: number,
    name?: string,
    code?: string,
    phanLoai?: string;
    tenChungChiEg?: string,
    note?: string
}

export default function F_awqigrupcl_Create(
    { documentType }: { documentType: number }
) {
    const form = useForm<IChungChi>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
            phanLoai: "Ngoại ngữ",
            tenChungChiEg: "",
            note: ""
        },
        validate: {
            name: (value) => value ? null : 'Tên chứng chỉ bắt buộc nhập',
            code: (value) => value ? null : 'Mã chứng chỉ bắt buộc nhập',
            tenChungChiEg: (value) => value ? null : 'Tên chứng chỉ Eg bắt buộc nhập',
        }
    })
    return (
        <MyButtonCreate objectName="chi tiết chứng chỉ" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã chứng chỉ" {...form.getInputProps("code")} />
            <MyTextInput label="Tên chứng chỉ" {...form.getInputProps("name")} />
            <MyTextInput label="Tên chứng chỉ Eg" {...form.getInputProps("tenChungChiEg")} />
            <Select label="Phân loại chứng chỉ" {...form.getInputProps("phanLoai")} data={["Ngoại ngữ", "Thể chất", "Quốc phòng", "Kỹ năng", "Khác"]} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


