'use client'
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
interface I {
    id?: number,
    maTieuChuan?: string;
    tenTieuChuan?: string;
    tenTieuChuanEg?: string;
    ghiChu?: string;
    thaoTac?: string;
}
export default function F_joakzugxkqUpdate(
    { values }: { values: I }
) {
    const form = useForm<I>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form}
            // onSubmit={async (values) => await baseAxios.post("/DocumentAttribute/Update", values)}
            onSubmit={() => { }}
            title="Chi tiết danh sách tiêu chuẩn"
        >
            <MyTextInput label="Mã tiêu chuẩn" {...form.getInputProps("maTieuChuan")} />
            <MyTextInput label="Tên tiêu chuẩn" {...form.getInputProps("tenTieuChuan")} />
            <MyTextInput label="Tên tiêu chí Eg" {...form.getInputProps("tenTieuChuanEg")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    )
}
