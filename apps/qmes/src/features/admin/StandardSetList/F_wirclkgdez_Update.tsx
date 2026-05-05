
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"


export interface I_wirclkgdez_Update {
    maBoTieuChuan?: string,
    tenBoTieuChuan?: string,
    tenBoTieuChuanEg?: string,
    note?: string
}
export default function F_wirclkgdez_Update({ data }: { data: I_wirclkgdez_Update }) {

    const form = useForm<I_wirclkgdez_Update>({
        initialValues: {
            maBoTieuChuan: data.maBoTieuChuan || "",
            tenBoTieuChuan: data.tenBoTieuChuan || "",
            tenBoTieuChuanEg: data.tenBoTieuChuanEg || "",
            note: data.note || ""
        }
    })

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => { }}
            title='Chi tiết danh sách bộ tiêu chuẩn đánh giá'
        >
            <MyTextInput label="Mã bộ tiêu chuẩn" {...form.getInputProps("maBoTieuChuan")} />
            <MyTextInput label="Tên bộ tiêu chuẩn" {...form.getInputProps("tenBoTieuChuan")} />
            <MyTextInput label="Tên bộ tiêu chuẩn Eg" {...form.getInputProps("tenBoTieuChuanEg")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    )
}