'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group, NumberFormatter, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { default as F7_2Create } from "./F7_2Create";


interface IDsSinhVien {
    id?: number;
    maSV?: string;
    hoTen?: string;
    gioiTinh?: number;
    ngaySinh?: Date | undefined;
    noiSinh?: string;
    soDienThoai?: string;
    email?: string;
    maKhoaThi?: string;
    tenKhoaThi?: string;
    ngayThi?: Date | undefined;
    chiNhanh?: string;
    maPhieu?: string;
    lePhi?: number;
    phaiThu?: number;
    daThu?: number;
    CCCD?: string;
    ngayCap?: Date | undefined;
    noiCap?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;

}
export default function F7_2Read() {
    const query = useQuery<IDsSinhVien[]>({
        queryKey: [`F7_2Read`],
        queryFn: async () => sinhVienList
    });
    const formatFunctions = {
        ngay: (value: string | Date) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt"),
        currency: (value: number) => {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value); // e.g., "1.500.000 ₫"
        },
        trangThai: (value: number) => {
            switch (value) {
                case 1:
                    return "Hoạt động";
                case 0:
                    return "Không hoạt động";
                default:
                    return "Không xác định";
            }
        },
    };

    const columns = useMemo<MRT_ColumnDef<IDsSinhVien>[]>(() => [
        {
            header: "Mã SV-HV",         // Student ID
            accessorKey: "maSV",       // Maps to maSV in IDsSinhVien
        },
        {
            header: "Họ  Tên",        // Full Name
            accessorKey: "hoTen",      // Maps to hoTen in IDsSinhVien
        },
        {
            header: "Giới Tính",        // Gender
            accessorKey: "gioiTinh",    // Maps to gioiTinh in IDsSinhVien
        },
        {
            header: "Ngày Sinh",        // Date of Birth
            accessorKey: "ngaySinh",    // Maps to ngaySinh in IDsSinhVien
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngaySinh!));
            },
        },
        {
            header: "Số điện thoại",     // Phone Number
            accessorKey: "soDienThoai",  // Maps to soDienThoai in IDsSinhVien
        },
        {
            header: "Email",            // Email Address
            accessorKey: "email",       // Maps to email in IDsSinhVien
        },
        {
            header: "Mã khóa thi",      // Exam Code
            accessorKey: "maKhoaThi",   // Maps to maKhoaThi in IDsSinhVien
        },
        {
            header: "Tên khóa thi",     // Exam Name
            accessorKey: "tenKhoaThi",  // Maps to tenKhoaThi in IDsSinhVien
        },
        {
            header: "Ngày thi",         // Exam Date
            accessorKey: "ngayThi",     // Maps to ngayThi in IDsSinhVien
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayThi!));
            },
        },
        {
            header: "Chi nhánh",        // Branch/Department
            accessorKey: "chiNhanh",    // Maps to chiNhanh in IDsSinhVien
        },
        {
            header: "Mã phiếu thu",         // Receipt Code
            accessorKey: "maPhieu",     // Maps to maPhieu in IDsSinhVien
        },
        {
            header: "Lệ phí",         // Receipt Type (Paper/Electronic)
            accessorKey: "lePhi",
            accessorFn(originalRow) {
                return <NumberFormatter suffix=" VND" value={originalRow.lePhi} thousandSeparator />;
            },    // Maps to lePhi in IDsSinhVien
        },
        {
            header: "Phải thu",         // Receipt Type (Paper/Electronic)
            accessorKey: "phaiThu",
            accessorFn(originalRow) {
                return <NumberFormatter suffix=" VND" value={originalRow.phaiThu} thousandSeparator />;
            },    // Maps to lePhi in IDsSinhVien
        },
        {
            header: "Đã thu",           // Fee Status (Paid/Not Paid)
            accessorKey: "daThu",       // Maps to daThu in IDsSinhVien
            accessorFn(originalRow) {
                return <NumberFormatter suffix=" VND" value={originalRow.daThu} thousandSeparator />;
            },
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <>
            <Tabs defaultValue="hocVienTuDo">
                <Tabs.List>
                    <Tabs.Tab value="hocVienTuDo">
                        Học viên tự do
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="hocVienTuDo">
                    <F7_2Create />
                </Tabs.Panel>
            </Tabs>

            <MyDataTable
                columns={columns}
                data={query.data!}
                exportAble
                enableSelectAll
                enableRowSelection
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <MyButton crudType="print" >In phiếu thu</MyButton>
                            <MyButton crudType="delete" />
                        </Group>

                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <MyButton crudType="print" />

                        </MyCenterFull>
                    );
                }}
            />
        </>
    );
}

const sinhVienList: IDsSinhVien[] = [
    {
        id: 1,
        maSV: "SV123456",
        hoTen: "Nguyen Van A",
        gioiTinh: 1, // Male
        ngaySinh: new Date("2000-01-15"),
        soDienThoai: "0123456789",
        email: "nguyenvana@example.com",
        maKhoaThi: "KT2024",
        tenKhoaThi: "Kỳ thi tốt nghiệp",
        ngayThi: new Date("2024-05-20"),
        chiNhanh: "Công nghệ thông tin",
        maPhieu: "PH123456",
        lePhi: 1206557,
        phaiThu: 1206557,
        daThu: 512010,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 2,
        maSV: "SV654321",
        hoTen: "Tran Thi B",
        gioiTinh: 0, // Female
        ngaySinh: new Date("1999-03-22"),
        soDienThoai: "0987654321",
        email: "tranthib@example.com",
        maKhoaThi: "KT2024",
        tenKhoaThi: "Kỳ thi tốt nghiệp",
        ngayThi: new Date("2024-05-21"),
        chiNhanh: "Quản trị kinh doanh",
        maPhieu: "PH654321",
        lePhi: 1206557,
        phaiThu: 1206557,
        daThu: 502010,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 3,
        maSV: "SV789012",
        hoTen: "Le Van C",
        gioiTinh: 1, // Male
        ngaySinh: new Date("2001-07-10"),
        soDienThoai: "0912345678",
        email: "levanc@example.com",
        maKhoaThi: "KT2024",
        tenKhoaThi: "Kỳ thi tốt nghiệp",
        ngayThi: new Date("2024-05-22"),
        chiNhanh: "Kỹ thuật điện tử",
        maPhieu: "PH789012",
        lePhi: 1206557,
        phaiThu: 1206557,
        daThu: 512010,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 4,
        maSV: "SV345678",
        hoTen: "Pham Thi D",
        gioiTinh: 0, // Female
        ngaySinh: new Date("2000-11-30"),
        soDienThoai: "0934567890",
        email: "phamthid@example.com",
        maKhoaThi: "KT2024",
        tenKhoaThi: "Kỳ thi tốt nghiệp",
        ngayThi: new Date("2024-05-23"),
        chiNhanh: "Ngôn ngữ Anh",
        maPhieu: "PH345678",
        lePhi: 1206557,
        phaiThu: 1206557,
        daThu: 512010,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    }
];
