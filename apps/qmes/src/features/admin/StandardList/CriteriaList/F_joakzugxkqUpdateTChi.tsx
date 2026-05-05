'use client'
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput"
import { Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { I_joakzugxkqRead } from "./F_joakzugxkqRead"
export default function F_joakzugxkqUpdateTChi(
    { values }: { values: I_joakzugxkqRead }
) {

    const form = useForm<I_joakzugxkqRead>({
        initialValues: values
    })

    // const defaultValues = `${form.getInputProps("maTieuChuan").value}-${form.getInputProps("tenTieuChuan").value}`
    const handleLogValues = () => {
        console.log(form.values);
    }

    return (
        <MyActionIconUpdate
            form={form}
            // onSubmit={async (values) => await baseAxios.post("/DocumentAttribute/Update", values)}
            onSubmit={() => { }}

            title="Chi tiết danh sách tiêu chí"
        >
            <Select label="Tiêu chuẩn" {...form.getInputProps("maTieuChuan")} data={["TC01", "TC02", "TC03", "TC04", "TC05", "TC06", "TC07"]}
            />
            <MyTextInput label="Mã tiêu chí" {...form.getInputProps("maTieuChi")} />
            <MyTextInput label="Tên tiêu chí " {...form.getInputProps("tenTieuChi")} />
            <MyTextInput label="Tên tiêu chí Eg" {...form.getInputProps("tenTieuChiEg")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    )
}
