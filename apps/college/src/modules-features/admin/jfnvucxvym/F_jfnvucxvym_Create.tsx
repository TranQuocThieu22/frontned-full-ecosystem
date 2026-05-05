'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export interface I_jfnvucxvym {
    id: number;
    code: string;
    name: string;
    note?: string;
}

export default function F_jfnvucxvym_Create() {
    const disc = useDisclosure(false);

    const form = useForm<I_jfnvucxvym>({
        initialValues: {
            id:0,
            code: "",
            name: "",
            note: "",
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết tính chất phòng' modalSize={"80%"}>
            {/* Form Fields */}
            <MyTextInput
                label="Mã tính chất"
                placeholder="Nhập mã tính chất"
                {...form.getInputProps("code")}
            />

            <MyTextInput
                label="Tên tính chất"
                placeholder="Nhập tên tính chất"
                {...form.getInputProps("name")}
            />

            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />
            
        </MyButtonCreate>
    );
}
