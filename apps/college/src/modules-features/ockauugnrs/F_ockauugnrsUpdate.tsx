'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { I_ockauugnrs } from "./F_ockauugnrsRead"
export default function F12_1Update(
    { values }: { values: I_ockauugnrs }
) {
    const form = useForm<I_ockauugnrs>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã nhân sự" {...form.getInputProps("maNhanSu")} />
            <MyTextInput label="Họ" {...form.getInputProps("hoLot")} />
            <MyTextInput label="Tên" {...form.getInputProps("ten")} />
            <Select label="Giới tính" {...form.getInputProps("gioiTinh")} data={["Nam", "Nữ"]} />
            <MyDateInput label="Ngày Sinh" {...form.getInputProps("ngaySinh")} />
            <MyTextInput label="Số điện thoại" {...form.getInputProps("soDienThoai")} />
            <MyTextInput label="Email" {...form.getInputProps("email")} />
        </MyActionIconUpdate>
    )
}
