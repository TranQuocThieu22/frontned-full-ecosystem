'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export interface I_wdft1r324q {
    id?: number; // STT - Số thứ tự
    studentId?: string; // Mã sinh viên
    classname?: string; //họ lót
    name?: string; // Họ tên sinh viên
    certificate?: string; // Chứng chỉ
    certificatename?: string; // Chứng chỉ
    diplomaNumber: string; // Số văn bằng
    issueDate?: string; // Ngày cấp
    expiryDate?: string; // Ngày hết hạn
    submissionDate?: string; // Ngày nhập
    note?: string; // Ghi chú
}

export default function F_wdft1r324q_Create() {
    const disc = useDisclosure(false);

    const form = useForm<I_wdft1r324q>({
        initialValues: {
            studentId: "",
            classname: "",
            name: "",
            certificate: "",
            certificatename: "",
            diplomaNumber: "",
            issueDate: "",
            expiryDate: "",
            submissionDate: "",
            note: "",
        },
        validate: {
            studentId:(value)=>(value?null:'Mã số sinh viên sách bắt buộc nhập'),
            certificate:(value)=>(value?null:'Mã chứng chỉ bắt buộc nhập'),
            diplomaNumber:(value)=>(value?null:'Số văn bằng buộc nhập'),
            issueDate:(value)=>(value?null:'Ngày cấp bắt buộc nhập'),
            expiryDate:(value)=>(value?null:'Ngày hết hạn bắt buộc nhập'),
            submissionDate:(value)=>(value?null:'Ngày nộp bắt buộc nhập'),
            note:(value)=>(value?null:'Ghi chú bắt buộc nhập'),
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết quy chế'>
            {/* Form Fields */}
            <MyTextInput
                label="Mã số sinh viên"
                placeholder="Nhập mã số sinh viên"
                {...form.getInputProps("studentId")}
            />

            <MyTextInput
                label="Mã chứng chỉ"
                placeholder="Nhập Mã chứng chỉ"
                {...form.getInputProps("certificate")}
            />

            <MyTextInput
                label="Số văn bằng"
                placeholder="Nhập số văn bằng"
                {...form.getInputProps("diplomaNumber")}
            />

            <MyTextInput
                label="Ngày cấp"
                placeholder="Nhập Ngày cấp"
                {...form.getInputProps("issueDate")}
            />

            <MyTextInput
                label="Ngày hết hạn"
                placeholder="Nhập ngày hết hạn "
                {...form.getInputProps("expiryDate")}
            />

            <MyTextInput
                label="Số nộp"
                placeholder="Nhập nộp"
                {...form.getInputProps("submissionDate")}
            />

            <MyTextInput
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyButtonCreate>
    );
}
