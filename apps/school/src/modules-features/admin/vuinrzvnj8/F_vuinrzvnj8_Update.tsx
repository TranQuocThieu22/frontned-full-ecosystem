// src/modules-features/admin/vuinrzvnj8/F_vuinrzvnj8_Update.tsx
'use client';

import { MyActionIconUpdate, MySelect, MyTextInput, MyTextArea } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { F_vuinrzvnj8_Read } from "./F_vuinrzvnj8_Read";

interface I_vuinrzvnj8_Update {
    maHocSinh: string;
    tienSuBenh: string;
    ghiChu: string;
}

export default function F_vuinrzvnj8_Update({ data }: { data: F_vuinrzvnj8_Read }) {
    const modalName = "Chi tiết tiền sử bệnh";

    // Mock query for students
    const hocSinhQuery = useQuery({
        queryKey: ['Fvuinrzvnj8_hocSinh_UpdateQuery'],
        queryFn: async () => [
            { label: `${data.hoLot} ${data.ten} - ${data.maHocSinh}`, value: data.maHocSinh },
            { label: "Nguyễn Văn A - HS000002", value: "HS000002" },
            { label: "Trần Thị B - HS000003", value: "HS000003" }
        ]
    });

    const form = useForm<I_vuinrzvnj8_Update>({
        initialValues: {
            maHocSinh: data.maHocSinh,
            tienSuBenh: data.tienSuBenh,
            ghiChu: data.ghiChu
        },
    });

    if (hocSinhQuery.isLoading) return "Đang tải...";
    if (hocSinhQuery.isError) return "Có lỗi xảy ra!";

    return (
        <MyActionIconUpdate
            crudType='update'
            title={modalName}
            form={form}
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
        </MyActionIconUpdate>
    );
}