'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Select } from "@mantine/core"
import { useForm } from "@mantine/form"

interface IChungChi {
    id?: number,
    name?: string,
    code?: string,
    tenChungChiEg?: string,
    phanLoai?: string;
    note?: string,

}

export default function F_awqigrupcl_Update(
    { values }: { values: IChungChi }
) {
    const form = useForm({
        initialValues: values
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label="Mã chứng chỉ" {...form.getInputProps("code")}  />
            <MyTextInput label="Tên chứng chỉ" {...form.getInputProps("name")}  />
            <MyTextInput label="Tên chứng chỉ Eg" {...form.getInputProps("tenChungChiEg")} />
            <Select label="Phân loại chứng chỉ" {...form.getInputProps("phanLoai")} data={["Ngoại ngữ", "Thể chất", "Quốc phòng", "Kỹ năng", "Khác"]} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")}/>
        </MyActionIconUpdate>
    )
}
