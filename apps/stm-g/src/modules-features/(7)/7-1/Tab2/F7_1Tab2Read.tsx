'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Anchor, Group, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number,
    maSinhVien?: string, // HV001
    hoTen?: string,
    GioiTinh?: string, // Nam
    ngaySinh?: Date,
    soDienThoai?: string,
    email?: string,
    maKhoaHoc?: string, // DGT2041
    tenKhoaHoc?: string, // Digital marketing 2024
    cumThoiGian?: string, // Tối 2 4 6
    chiNhanh?: string, // Thủ đức
    maPhieuThu?: string, // PT0001
    hocPhi?: number,
    tongMienGiam?: number, // 350000
    phaiThu?: number, // 215000
    daThu?: number, // 215000
    ngayCapNhat?: Date,
    nguoiCapNhat?: string
}

export default function F7_1Tab2Read() {
    const query = useQuery<I[]>({
        queryKey: [`F7_1Tab1Read`],
        queryFn: async () => [
            {
                id: 1,
                maSinhVien: "HV001",
                hoTen: "Nguyễn Văn A",
                GioiTinh: "Nam",
                ngaySinh: new Date("2000-01-01"),
                soDienThoai: "0123456789",
                email: "example@example.com",
                maKhoaHoc: "DGT2041",
                tenKhoaHoc: "Digital marketing 2024",
                cumThoiGian: "Tối 2 4 6",
                chiNhanh: "Thủ Đức",
                maPhieuThu: "PT0001",
                hocPhi: 1000000,
                tongMienGiam: 200000,
                phaiThu: 800000,
                daThu: 800000,
                ngayCapNhat: new Date(),
                nguoiCapNhat: "GV. Trương Mỹ Diệu"
            },
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã học viên", accessorKey: "maSinhVien" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Giới tính", accessorKey: "GioiTinh" },
        { header: "Ngày sinh", accessorKey: "ngaySinh", Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<Date>())) },
        { header: "Số điện thoại", accessorKey: "soDienThoai" },
        { header: "Email", accessorKey: "email" },
        { header: "Mã khóa học", accessorKey: "maKhoaHoc" },
        { header: "Tên khóa học", accessorKey: "tenKhoaHoc" },
        { header: "Cụm thời gian", accessorKey: "cumThoiGian" },
        { header: "Chi nhánh", accessorKey: "chiNhanh" },
        { header: "Mã phiếu thu", accessorKey: "maPhieuThu" },
        { header: "Học phí", accessorKey: "hocPhi", Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} /> },
        { header: "Tổng miễn giảm", accessorKey: "tongMienGiam", Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} /> },
        { header: "Phải thu", accessorKey: "phaiThu", Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} /> },
        { header: "Đã thu", accessorKey: "daThu", Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} /> },
        { header: "In phiếu thu", Cell: ({ cell }) => <Anchor >In</Anchor> },
        { header: "Ngày cập nhật", accessorKey: "ngayCapNhat", Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<Date>())) },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyFieldset title="Danh sách phiếu đã thu">
            <MyDataTable
                columns={columns}
                data={query.data!}

                exportAble
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Title order={3}>Danh sách phiếu thu</Title>
                        <MyButton crudType="print">In phiếu thu</MyButton>
                        <MyButton crudType="delete">Xóa</MyButton>
                    </Group>
                )}
            />
        </MyFieldset>
    );
}
