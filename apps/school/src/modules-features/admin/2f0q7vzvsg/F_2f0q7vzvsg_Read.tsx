'use client';

import { AQButtonExportData, MyDataTable, MyFieldset, MySelect, MyCenterFull } from "aq-fe-framework/components";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Checkbox, Group } from "@mantine/core";
import F_2f0q7vzvsg_NotificationModal from "./F_2f0q7vzvsg_NotificationModal";
import F_2f0q7vzvsg_NotificationSent from "./F_2f0q7vzvsg_NotificationSent";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";


export interface F_2f0q7vzvsg_Read {
    id: number;
    maSuKien: string; // Mã sự kiện
    tenSuKien: string; // Tên sự kiện
    ngayToChuc: Date; // Ngày tổ chức
    gioBatDau: string; // Giờ bắt đầu
    thoiGian: string; // Thời gian
    diaDiem: string; // Địa điểm
    trangThai: string; // Trạng thái
    lePhi: number; // Lệ phí
    maHocSinh: string; // Mã học sinh
    hoTen: string; // Họ tên
    lop: string; // Lớp
    gioiTinh: string; // Giới tính
    ngaySinh: string; // Ngày sinh
    ngayDangKy: Date; // Ngày đăng ký
    daGui: boolean; // Đã gửi
}

export default function F_2f0q7vzvsg_Read() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>("SK0001");

    // Mock query for events dropdown
    const suKienQuery = useQuery({
        queryKey: ['F_2f0q7vzvsg_SuKienQuery'],
        queryFn: async () => [
            { value: "SK0001", label: "Đêm hội Halloween - SK0001" },
            { value: "SK0002", label: "Hội chợ xuân - SK0002" },
            { value: "SK0003", label: "Kỷ niệm ngày nhà giáo - SK0003" }
        ]
    });

    const dangKySuKienQuery = useQuery({
        queryKey: ['F_2f0q7vzvsg_ReadQuery'],
        queryFn: async () => mockData
    });

    const exportConfig = {
        fields: [
            { fieldName: "maSuKien", header: "Mã sự kiện" },
            { fieldName: "tenSuKien", header: "Tên sự kiện" },
            { fieldName: "ngayToChuc", header: "Ngày tổ chức" },
            { fieldName: "gioBatDau", header: "Giờ bắt đầu" },
            { fieldName: "thoiGian", header: "Thời gian" },
            { fieldName: "diaDiem", header: "Địa điểm" },
            { fieldName: "trangThai", header: "Trạng thái" },
            { fieldName: "lePhi", header: "Lệ phí" },
            { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoTen", header: "Họ tên" },
            { fieldName: "lop", header: "Lớp" },
            { fieldName: "gioiTinh", header: "Giới tính" },
            { fieldName: "ngaySinh", header: "Ngày sinh" },
            { fieldName: "ngayDangKy", header: "Ngày đăng ký" },
            { fieldName: "daGui", header: "Đã gửi" },
            { fieldName: "noiDungThongBao", header: "Nội dung thông báo" }
        ]
    };

    const dangKySuKienColumns = useMemo<MRT_ColumnDef<F_2f0q7vzvsg_Read>[]>(() => [
        { accessorKey: 'maSuKien', header: 'Mã sự kiện' },
        { accessorKey: 'tenSuKien', header: 'Tên sự kiện' },
        { accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngayToChuc), header: 'Ngày tổ chức' },
        { accessorKey: 'gioBatDau', header: 'Giờ bắt đầu' },
        { accessorKey: 'thoiGian', header: 'Thời gian' },
        { accessorKey: 'diaDiem', header: 'Địa điểm' },
        { accessorKey: 'trangThai', header: 'Trạng thái' },
        { accessorKey: 'lePhi', header: 'Lệ phí', Cell: ({ cell }) => cell.getValue<number>().toLocaleString('vi-VN')},
        { accessorKey: 'maHocSinh', header: 'Mã học sinh' },
        { accessorKey: 'hoTen', header: 'Họ tên' },
        { accessorKey: 'lop', header: 'Lớp' },
        { accessorKey: 'gioiTinh', header: 'Giới tính' },
        { accessorKey: 'ngaySinh', header: 'Ngày sinh' },
        { accessorFn: (row) => `${utils_date_dateToDDMMYYYString(row.ngayDangKy)} ${row.ngayDangKy.toLocaleTimeString("VI")}`, header: 'Ngày đăng ký' },
        {
            accessorKey: 'daGui',
            header: 'Đã gửi',
            Cell: ({ cell }) => (
                <Checkbox checked={cell.getValue<boolean>()} readOnly />
            )
        },
        {
            accessorKey: 'noiDungThongBao',
            header: 'Nội dung thông báo',
            Cell: () => (
                <MyCenterFull><F_2f0q7vzvsg_NotificationSent/></MyCenterFull>
            )
        }
    ], []);

    if (dangKySuKienQuery.isLoading || suKienQuery.isLoading) return "Đang tải...";
    if (dangKySuKienQuery.isError || suKienQuery.isError) return "Có lỗi xảy ra!";

    return (
        <>
        <Group ml={20} mb={20}>
            <MySelect
                label="Chọn sự kiện"
                data={suKienQuery.data || []}
                value={selectedEvent}
                onChange={(value) => setSelectedEvent(value)}
                searchable
                clearable
            />
        </Group>
            <MyFieldset title="Danh sách đăng ký sự kiện">
                <MyDataTable
                    columns={dangKySuKienColumns}
                    data={dangKySuKienQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={() => (<>
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={dangKySuKienQuery.data!}
                                objectName={'Danh sách đăng ký sự kiện'}
                            />
                            <F_2f0q7vzvsg_NotificationModal />
                        </>
                    )}
                />
            </MyFieldset>
        </>
    );
}

const mockData: F_2f0q7vzvsg_Read[] = [
    {
        id: 1,
        maSuKien: 'SK0001',
        tenSuKien: 'Đêm hội Halloween',
        ngayToChuc: new Date("2024-10-30"),
        gioBatDau: '07:00',
        thoiGian: "180 phút",
        diaDiem: 'Hội trường A',
        trangThai: 'Sắp diễn ra',
        lePhi: 150000,
        maHocSinh: 'HS0001',
        hoTen: 'Tô Ngọc Linh',
        lop: '1146',
        gioiTinh: 'Nữ',
        ngaySinh: '01/02/2000',
        ngayDangKy: new Date("2025-02-15 14:00:25"),
        daGui: true
    }
];