'use client';

import { MyActionIconUpdate, MySelect, MyTextInput, MyNumberInput, MyTextArea, MyDateInput } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { F_v9g6ko7dbi_Read } from "./F_v9g6ko7dbi_Read";
import { IconCalendar } from '@tabler/icons-react';
import { Grid } from '@mantine/core';

interface I_v9g6ko7dbi_Update extends Omit<F_v9g6ko7dbi_Read, 'ngayToChuc' | 'ngayDangKy'> {
    ngayToChuc: Date | null;
    ngayBatDauDangKy: Date | null;
    ngayKetThucDangKy: Date | null;
    ngayDangKy: Date | null;
    soLuongDuKien: number;
    hocSinh: string;
    ghiChu: string;
}

const trangThaiSelectData = [
    {
        label: "Sắp diễn ra",
        value: "Sắp diễn ra",
    },
    {
        label: "Đang diễn ra",
        value: "Đang diễn ra",
    },
    {
        label: "Đã kết thúc",
        value: "Đã kết thúc",
    }
];

export default function F_v9g6ko7dbi_Update({ data }: { data: F_v9g6ko7dbi_Read }) {
    const modalName = "Chi tiết đăng ký";
    const calendarIcon = <IconCalendar size="1rem" style={{ opacity: 0.5 }} />;

    // Convert string dates to Date objects
    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            if (!parts[0] || !parts[1] || !parts[2]) return null;
            return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
        return null;
    };

    // Mock query for locations
    const diaDiemQuery = useQuery({
        queryKey: ['Fv9g6ko7dbi_diaDiem_UpdateQuery'],
        queryFn: async () => [
            { label: "Hội trường A", value: "Hội trường A" },
            { label: "Hội trường B", value: "Hội trường B" },
            { label: "Phòng C", value: "Phòng C" }
        ]
    });

    // Mock query for students
    const hocSinhQuery = useQuery({
        queryKey: ['Fv9g6ko7dbi_hocSinh_UpdateQuery'],
        queryFn: async () => [
            { label: `${data.hoTen} - ${data.maHocSinh} - Lớp ${data.lop}`, value: data.maHocSinh },
            { label: "Nguyễn Văn A - SV0003 - Lớp 11A7", value: "SV0003" },
            { label: "Trần Thị B - SV0004 - Lớp 11A8", value: "SV0004" }
        ]
    });

    const form = useForm<I_v9g6ko7dbi_Update>({
        initialValues: {
            ...data,
            ngayToChuc: parseDate(data.ngayToChuc),
            ngayBatDauDangKy: parseDate("15/10/2025"),
            ngayKetThucDangKy: parseDate("25/10/2025"),
            ngayDangKy: parseDate(data.ngayDangKy.split(' ')[0] || ''),
            soLuongDuKien: 150,
            hocSinh: data.maHocSinh,
            ghiChu: ""
        },
        validate: {
            tenSuKien: (value) => (value ? null : "Không được để trống"),
            hocSinh: (value) => (value ? null : "Không được để trống"),
            ngayToChuc: (value) => (value ? null : "Không được để trống"),
            ngayKetThucDangKy: (value, values) =>
                value && values.ngayBatDauDangKy && value > values.ngayBatDauDangKy
                ? null
                : "Ngày kết thúc đăng ký phải sau ngày bắt đầu đăng ký",
            maSuKien: (value) => (value ? null : "Không được để trống"),
            gioBatDau: (value) => (value ? null : "Không được để trống"),
            thoiGian: (value) => (value > 0 ? null : "Thời gian phải lớn hơn 0"),
            ngayBatDauDangKy: (value) => (value ? null : "Không được để trống"),
            diaDiem: (value) => (value ? null : "Không được để trống"),
            soLuongDuKien: (value) => (value > 0 ? null : "Số lượng dự kiến phải lớn hơn 0"),
        }
    });

    if (diaDiemQuery.isLoading || hocSinhQuery.isLoading) return "Đang tải...";
    if (diaDiemQuery.isError || hocSinhQuery.isError) return "Có lỗi xảy ra!";

    return (
        <MyActionIconUpdate
            form={form}
            modalSize="lg"
            crudType='update'
            title={modalName}
            onSubmit={() => { }}
        >
            <Grid gutter="md">
                {/* Left Column */}
                <Grid.Col span={6}>
                    <MyTextInput label="Tên sự kiện" {...form.getInputProps("tenSuKien")} />
                    <MyDateInput
                        label="Ngày tổ chức"
                        valueFormat="DD/MM/YYYY"
                        rightSection={calendarIcon}
                        {...form.getInputProps("ngayToChuc")}
                    />
                    <MyTextInput label="Giờ bắt đầu" placeholder="HH:MM" {...form.getInputProps("gioBatDau")} />
                    <MyNumberInput label="Thời gian (phút)" {...form.getInputProps("thoiGian")} />
                    <MyDateInput
                        label="Ngày bắt đầu đăng ký"
                        valueFormat="DD/MM/YYYY"
                        rightSection={calendarIcon}
                        {...form.getInputProps("ngayBatDauDangKy")}
                    />
                    <MyDateInput
                        label="Ngày kết thúc đăng ký"
                        valueFormat="DD/MM/YYYY"
                        rightSection={calendarIcon}
                        {...form.getInputProps("ngayKetThucDangKy")}
                    />
                </Grid.Col>

                {/* Right Column */}
                <Grid.Col span={6}>
                    <MySelect data={diaDiemQuery.data!} label="Địa điểm" {...form.getInputProps("diaDiem")} />
                    <MySelect
                        data={trangThaiSelectData}
                        label="Trạng thái"
                        {...form.getInputProps("trangThai")}
                        disabled
                    />
                    <MyNumberInput label="Số lượng dự kiến" {...form.getInputProps("soLuongDuKien")} />
                    <MyNumberInput
                        label="Lệ phí"
                        thousandSeparator=" "
                        suffix="VNĐ"
                        {...form.getInputProps("lePhi")}
                    />
                    <MySelect
                        data={hocSinhQuery.data!}
                        label="Họ Tên"
                        {...form.getInputProps("hocSinh")}
                        searchable
                        clearable
                    />
                    <MyDateInput
                        label="Ngày đăng ký"
                        valueFormat="DD/MM/YYYY"
                        rightSection={calendarIcon}
                        disabled
                        {...form.getInputProps("ngayDangKy")}
                    />
                </Grid.Col>

                {/* Full width for text area */}
                <Grid.Col span={12}>
                    <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
                </Grid.Col>
            </Grid>
        </MyActionIconUpdate>
    );
}