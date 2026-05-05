
import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I_wirclkgdez_Update } from "./F_wirclkgdez_Update";

export default function F_wirclkgdez_Create() {

    const form = useForm<I_wirclkgdez_Update>({
        initialValues: {
            maBoTieuChuan: "",
            tenBoTieuChuan: "",
            tenBoTieuChuanEg: "",
            note: "",
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết danh sách bộ tiêu chuẩn đánh giá'>
            <MyTextInput label="Mã bộ tiêu chuẩn" {...form.getInputProps("maBoTieuChuan")} />
            <MyTextInput label="Tên bộ tiêu chuẩn" {...form.getInputProps("tenBoTieuChuan")} />
            <MyTextInput label="Tên bộ tiêu chuẩn Eg" {...form.getInputProps("tenBoTieuChuanEg")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}