
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Select } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export interface I_hkrnoszyoo_Read {
    id?: number;
    code?: string;
    name?: string;
    khoa?: number;
    note?: string;
}
export default function F_hkrnoszyoo_Update(
    { values }: { values: I_hkrnoszyoo_Read }
) {
    const disc = useDisclosure(false)
    const form = useForm<I_hkrnoszyoo_Read>({
        initialValues: {
            ...values
        },
    })

    return (
        <MyActionIconUpdate modalSize={"80%"} form={form}
            onSubmit={() => {
            }}
        >
            <MyTextInput disabled label="Mã lớp:" defaultValue={form.values.code} />

            <MyTextInput label="Tên lớp:" defaultValue={form.values.name} />

            <Select
                w={"100%"}
                label="Chương trình:"
                data={[
                    { value: "1", label: "IT2041" },
                    { value: "2", label: "IT2042" },
                ]}
                value={1?.toString()}
                onChange={(value) => form.setFieldValue('chuongTrinh', Number(value))}
            />



            <MyTextArea label="Ghi chú:" value={form.values.note} />


        </MyActionIconUpdate>
    );
}

