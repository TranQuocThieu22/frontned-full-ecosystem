'use client'

import { PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyFlexColumn, MySelect, MyTextInput } from "aq-fe-framework/components";
interface I_sz006g0m7l {
    phanHe?: string;
    hostMailServer?: string;
    outgoingPort?: number;
    incomingPort?: number;
    SSL?: boolean;
    userName?: string;
    password?: string;
}
export default function F_sz006g0m7l_Update({ values }: { values?: any }) {
    const form = useForm<I_sz006g0m7l>({
        initialValues: values,
        validate: {
            // phanHe: (value) => (value ? null : "Phân hệ không được để trống"),
        },
    });

    const dataSelectPhaHe = [
        { value: "Toàn hệ thống", label: "Toàn hệ thống" },
        { value: "Đào tạo", label: "Đào tạo" },
        { value: "Tuyển sinh", label: "Tuyển sinh" },
        { value: "Sinh viên", label: "Sinh viên" },
        { value: "Khảo thí", label: "Khảo thí" },
    ]

    return (
        <MyActionIconUpdate title="Danh mục cấu hình mail" form={form} onSubmit={() => { }}>
            <MyFlexColumn>
                <MySelect label="Phân hệ" data={dataSelectPhaHe} {...form.getInputProps("phanHe")} >
                </MySelect>
                <MyTextInput name="hostMailServer" label="Host mail server" {...form.getInputProps("hostMailServer")} />
                <MyTextInput name="outgoingPort" label="Outgoing port" {...form.getInputProps("outgoingPort")} />
                <MyTextInput name="incomingPort" label="Incoming port" {...form.getInputProps("incomingPort")} />
                <MyTextInput name="SSL" label="SSL" {...form.getInputProps("SSL")} />
                <MyTextInput name="userName" label="Username" {...form.getInputProps("userName")} />
                <PasswordInput name="password" label="Password" {...form.getInputProps("password")} />
            </MyFlexColumn>
        </MyActionIconUpdate>
    );
}