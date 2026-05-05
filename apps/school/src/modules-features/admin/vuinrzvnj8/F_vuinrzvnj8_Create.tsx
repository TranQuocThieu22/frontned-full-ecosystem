// src/modules-features/admin/vuinrzvnj8/F_vuinrzvnj8_Create.tsx
'use client';

import { MyButtonCreate, MySelect, MyTextInput, MyTextArea } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { IconCalendar } from '@tabler/icons-react';
import { useEffect } from "react";

interface I_vuinrzvnj8_Create {
    maHocSinh: string;
    tienSuBenh: string;
    ghiChu: string;
}

export default function F_vuinrzvnj8_Create() {
    const disclosure = useDisclosure();

    // Mock query for students
    const hocSinhQuery = useQuery({
        queryKey: ['Fvuinrzvnj8_hocSinh_CreateQuery'],
        queryFn: async () => [
            { label: "Tô Ngọc Lâm - HS000001", value: "HS000001" },
            { label: "Nguyễn Văn A - HS000002", value: "HS000002" },
            { label: "Trần Thị B - HS000003", value: "HS000003" }
        ]
    });

    const form = useForm<I_vuinrzvnj8_Create>({
        initialValues: {
            maHocSinh: hocSinhQuery.data?.[0]?.value || "",
            tienSuBenh: "",
            ghiChu: ""
        },
    });

    // Update form value when data is loaded
    useEffect(() => {
        if (hocSinhQuery.data && hocSinhQuery.data.length > 0) {
            form.setFieldValue("maHocSinh", hocSinhQuery.data[0]?.value || "");
        }
    }, [hocSinhQuery.data]);

    if (hocSinhQuery.isLoading) return "Đang tải...";
    if (hocSinhQuery.isError) return "Có lỗi xảy ra!";

    return (
        <>
            <MyButtonCreate
                form={form}
                disclosure={disclosure}
                crudType='create'
                title={"Chi tiết tiền sử bệnh"}
                onSubmit={() => { }}
            >
                <MySelect
                    data={hocSinhQuery.data!}
                    label="Học sinh"
                    {...form.getInputProps("maHocSinh")}
                    searchable
                    clearable
                    withAsterisk
                />
                <MyTextInput label="Tiền sử bệnh" {...form.getInputProps("tienSuBenh")} />
                <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
            </MyButtonCreate>
        </>
    );
}