'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
interface I {
    maTieuChuan?: string;
    tenTieuChuan?: string;
    tenTieuChuanEg?: string;
    ghiChu?: string;
    documentType?: number
}

export default function F_joakzugxkqCreate(
) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            maTieuChuan: "",
            tenTieuChuan: "",
            tenTieuChuanEg: ""

        },
        validate: {
            maTieuChuan: (value) => value ? null : 'Không được để trống',
            tenTieuChuan: (value) => value ? null : 'Không được để trống',
            tenTieuChuanEg: (value) => value ? null : 'Không được để trống'

        }
    })
    return (
        <MyButtonCreate objectName="Danh sách tiêu chuẩn" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã tiêu chuẩn" {...form.getInputProps("maTieuChuan")} />
            <MyTextInput label="Tên tiêu chuẩn" {...form.getInputProps("tenTieuChuan")} />
            <MyTextInput label="Tên tiêu chuẩn Eg" {...form.getInputProps("tenTieuChuanEg")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    )
}


