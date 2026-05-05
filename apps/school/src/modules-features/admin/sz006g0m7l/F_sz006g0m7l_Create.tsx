'use client'

import { PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyFlexColumn, MySelect, MyTextInput } from "aq-fe-framework/components";

interface I_sz006g0m7l_Create {
    phanHe?: string;
    hostMailServer?: string;
    outgoingPort?: number;
    incomingPort?: number;
    SSL?: boolean;
    userName?: string;
    password?: string;
}

export default function F_sz006g0m7l_Create() {

    const dataSelectPhanHe = [
        { value: "Toàn hệ thống", label: "Toàn hệ thống" },
        { value: "Đào tạo", label: "Đào tạo" },
        { value: "Tuyển sinh", label: "Tuyển sinh" },
        { value: "Sinh viên", label: "Sinh viên" },
        { value: "Khảo thí", label: "Khảo thí" },
    ]


    const form = useForm<I_sz006g0m7l_Create>({
        initialValues: {
            phanHe: '',
            hostMailServer: '',
            outgoingPort: undefined,
            incomingPort: undefined,
            SSL: undefined,
            userName: '',
            password: '',
        },
        validate: {
            phanHe: (value) => (value ? null : "Phân hệ không được để trống"),
            hostMailServer: (value) => (value ? null : "Host mail server không được để trống"),
            outgoingPort: (value) => (value ? null : "Outgoing port không được để trống"),
            incomingPort: (value) => (value ? null : "Incoming port không được để trống"),
            SSL: (value) => (value !== undefined ? null : "SSL không được để trống"),
            userName: (value) => (value ? null : "Username không được để trống"),
            password: (value) => (value ? null : "Password không được để trống"),
        },
    });

    return (
        <MyButtonCreate title="Danh mục cấu hình mail" form={form} onSubmit={() => { }}>
            <MyFlexColumn>
                <MySelect label="Phân hệ" defaultValue={dataSelectPhanHe[0]?.value} data={dataSelectPhanHe}>
                </MySelect>
                <MyTextInput name="hostMailServer" label="Host mail server" />
                <MyTextInput name="outgoingPort" label="Outgoing port" />
                <MyTextInput name="incomingPort" label="Incoming port" />
                <MyTextInput name="SSL" label="SSL" />
                <MyTextInput name="userName" label="Username" />
                <PasswordInput name="password" label="Password" />
            </MyFlexColumn>
        </MyButtonCreate>
    );
}