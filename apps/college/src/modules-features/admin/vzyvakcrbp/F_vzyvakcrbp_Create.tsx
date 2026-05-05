'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export interface I_vzyvakcrbp {
    policyCode?: string; // Mã diện chính sách
    policyName?: string; // Tên diện chính sách
    policyNameEg?: string; // Tên diện chính sách Eg
    parentPolicy?:string;
    note?: string;
}

export default function F_vzyvakcrbp_Create() {
    const disc = useDisclosure(false);

    const form = useForm<I_vzyvakcrbp>({
        initialValues: {
            policyCode: "",
            policyName: "",
            policyNameEg: "",
            parentPolicy:"",
            note: "",
        },
        validate: {
            policyCode:(value)=>(value?null:'Mã diện chính sách bắt buộc nhập'),
            policyName:(value)=>(value?null:'Tên diện chính sách bắt buộc nhập'),
            policyNameEg:(value)=>(value?null:'Tên diện chính sách Eg bắt buộc nhập'),
            parentPolicy:(value)=>(value?null:'Trực thuộc bắt buộc nhập'),
            note:(value)=>(value?null:'Ghi chú bắt buộc nhập'),
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết quy chế'>
            {/* Form Fields */}
            <MyTextInput
                label="Mã quy chế"
                placeholder="Nhập mã quy chế"
                {...form.getInputProps("policyCode")}
            />

            <MyTextInput
                label="Tên quy chế"
                placeholder="Nhập tên quy chế"
                {...form.getInputProps("policyName")}
            />

            <MyTextInput
                label="Tên quy chế Eg"
                placeholder="Nhập tên quy chế Eg"
                {...form.getInputProps("policyNameEg")}
            />

            <Select
                label="Trực thuộc"
                placeholder="Chọn trực thuộc"
                data={[
                    { value: "Thông tư 08", label: "Thông tư 08" },
                    { value: "Thông tư 16", label: "Thông tư 16" },
                ]}
                {...form.getInputProps("parentPolicy")}
            />

            <MyTextInput
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyButtonCreate>
    );
}
