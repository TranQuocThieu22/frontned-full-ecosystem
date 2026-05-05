import { useEffect, useState } from "react";

import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import MyNumberInput from "@/components/ui/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I_ethxdmfcgp_update } from "./F_ethxdmfcgp_Update";
export default function F_ethxdmfcgp_Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<I_ethxdmfcgp_update>({

        initialValues: {
            maCongTrinh: "",
            tenCongTrinh: "",
            dienTichXayDung: 0,
            dienTichQuyDoi: 0,
            heSo: 0,
            ghiChu: ""
        },
        validate: {

        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <MyButtonCreate
                form={form}
                onSubmit={
                    () => {
                        console.log("Thêm thành công: ", form.values);

                    }
                }>
                <MyTextInput label="Mã công trình" {...form.getInputProps("maCongTrinh")} />
                <MyTextInput label="Tên công trình" {...form.getInputProps("tenCongTrinh")} />
                <MyTextInput label="Diện tích sàn" {...form.getInputProps("dienTichSanXayDung")} />
                <MyNumberInput label="Hệ số sử dụng đào tạo" {...form.getInputProps("heSo")} />

                <Textarea label="Ghi chú" {...form.getInputProps("ghiChu")} />
            </MyButtonCreate>
        </Group>
    )
}