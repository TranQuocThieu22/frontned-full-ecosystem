'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export interface I_sviddivwkl {
    policyCode?: string; // Mã diện chính sách
    policyName?: string; // Tên diện chính sách
    policyNameEg?: string; // Tên diện chính sách Eg
    note?: string; // Ghi chú
}

export default function F_sviddivwkl_Create() {
    const disc = useDisclosure(false);

    const form = useForm<I_sviddivwkl>({
        initialValues: {
            policyCode: "",
            policyName: "",
            policyNameEg: "",
            note: "",
        },
        validate:{
            policyCode: (value)=>(value?null:'Mã diện chính sách là bắt buộc'),
            policyName: (value)=>(value?null:'Tên diện chính sách là bắt buộc'),
        }
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết diện chính sách' modalSize="60%">
            {/* Form Fields */}
            <MyTextInput
                label="Mã diện chính sách"
                placeholder="Nhập mã diện chính sách"
                {...form.getInputProps("policyCode")}
            />

            <MyTextInput
                label="Tên diện chính sách"
                placeholder="Nhập tên diện chính sách"
                {...form.getInputProps("policyName")}
            />

            <MyTextInput
                label="Tên diện chính sách Eg"
                placeholder="Nhập tên diện chính sách Eg"
                {...form.getInputProps("policyNameEg")}
            />

            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyButtonCreate>
    );
}
