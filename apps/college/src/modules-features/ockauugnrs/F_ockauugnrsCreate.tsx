'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { I_ockauugnrs } from "./F_ockauugnrsRead"
export default function F12_1Create(

) {
    const form = useForm<I_ockauugnrs>({
        mode: "uncontrolled",
        initialValues: {
            maNhanSu: "",
            hoLot: "",
            ten: "",
            gioiTinh: "",
            ngaySinh: undefined,
            soDienThoai: "",
            email: ""

        },
        validate: {
            maNhanSu: (value) => value ? null : 'Không được để trống',
            hoLot: (value) => value ? null : 'Không được để trống',
            ten: (value) => value ? null : 'Không được để trống',
            gioiTinh: (value) => value ? null : 'Không được để trống',
            ngaySinh: (value) => value ? null : 'Không được để trống',
            soDienThoai: (value) => value ? null : 'Không được để trống',
            email: (value) => value ? null : 'Không được để trống'

        }
    })
    return (
        <MyButtonCreate objectName="Loại văn bản" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã nhân sự" {...form.getInputProps("maNhanSu")} />
            <MyTextInput label="Họ" {...form.getInputProps("hoLot")} />
            <MyTextInput label="Tên" {...form.getInputProps("ten")} />
            <Select label="Giới tính" {...form.getInputProps("gioiTinh")} data={["Nam", "Nữ"]} />
            <MyDateInput label="Ngày Sinh" {...form.getInputProps("ngaySinh")} />
            <MyTextInput label="Số điện thoại" {...form.getInputProps("soDienThoai")} />
            <MyTextInput label="Email" {...form.getInputProps("email")} />
        </MyButtonCreate>
    )
}


