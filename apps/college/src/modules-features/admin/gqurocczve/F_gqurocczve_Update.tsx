'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from "@mantine/core";
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    reasonsCode?: string; // Mã ngành / Chuyên ngành
    name?: string //Tên ngành / Chuyên ngành
    type?: string // Loại vào/ra
    checkD?: boolean
}

export default function F_gqurocczve_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã loại thu' {...form.getInputProps("reasonsCode")} readOnly />
            <MyTextInput label='Tên loại thu' {...form.getInputProps("name")} />
            <MyTextInput label='Ưu tiên phân bố' {...form.getInputProps("type")} />
            <Checkbox
                defaultChecked={form.values.checkD}
                label="Cho phép phụ thu"
                value={form.getValues().checkD}
                {...form.getInputProps("checkD")}
            />
            {/* <Select
                label="Loại vào / ra"
                data={[
                    { value: "1", label: "Quyết định vào mới" },
                    { value: "2", label: "Quyết định bảo lưu" },
                    { value: "3", label: "Quyết định học lại" },
                    { value: "4", label: "Quyết định đổi lớp" },
                    { value: "5", label: "Quyết định nghỉ học" },
                    { value: "6", label: "Quyết định tốt nghiệp" },
                ]}

                // defaultValue={form.values.type?.toString()}
                // onChange={(value) => form.setFieldValue("type", value?.toString())}
                defaultValue={1?.toString()}
                // defaultValue={form.values.type?.toString()}
                onChange={(value) => form.setFieldValue("type", value?.toString())}
            /> */}






        </MyActionIconUpdate>
    )
}