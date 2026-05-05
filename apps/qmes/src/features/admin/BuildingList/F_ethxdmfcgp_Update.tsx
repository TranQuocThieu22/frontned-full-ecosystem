
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/ui/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export interface I_ethxdmfcgp_update {
    maCongTrinh?: string,
    tenCongTrinh?: string,
    dienTichXayDung?: number,
    dienTichQuyDoi?: number,
    heSo?: number,
    ghiChu?: string
}

export default function F_ethxdmfcgp_update({ data }: { data: I_ethxdmfcgp_update }) {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<I_ethxdmfcgp_update>({

        initialValues: data,
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
            <MyActionIconUpdate
                form={form}
                onSubmit={
                    () => {
                        console.log("Sửa thành công: ", form.values);

                    }
                }>
                <MyTextInput label="Mã công trình" disabled {...form.getInputProps("maCongTrinh")} />
                <MyTextInput label="Tên công trình" {...form.getInputProps("tenCongTrinh")} />
                <MyNumberInput label="Diện tích sàn" {...form.getInputProps("dienTichXayDung")} />
                <MyNumberInput label="Hệ số sử dụng đào tạo" {...form.getInputProps("heSo")} />

                <Textarea label="Ghi chú" {...form.getInputProps("ghiChu")} />
            </MyActionIconUpdate>
        </Group>
    )
}