'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button, Group } from "@mantine/core";
import F_skiywzymoc_BaoLuu from "./F_skiywzymoc_BaoLuu";
import F_skiywzymoc_BuocThoiHoc from "./F_skiywzymoc_BuocThoiHoc";
import F_skiywzymoc_RutDangKy from "./F_skiywzymoc_RutDangKy";

interface Student {
    maHocVien: string;
    hoTen: string;
    gioiTinh: string;
    ngaySinh: string;
    soDienThoai: string;
    email: string;
    maKhoaHoc: string;
    tenKhoaHoc: string;
    cumThoiGian: string;
    chiNhanh: string;
    trangThai: "Chưa khai giảng" | "Đang học" | "Đã hoàn thành" | "Rút đăng ký" | "Buộc thôi học" | "Bảo lưu";
    ngayQuyetDinh: string;
    tenQuyetDinh: string;
    ghiChu: string;
    bienLaiChuyenKhoanUrl: string;
}

const mockData: Student[] = [
    {
        maHocVien: "HV001",
        hoTen: "Nguyen Van A",
        gioiTinh: "Nam",
        ngaySinh: "01/01/1990",
        soDienThoai: "0973968438",
        email: "a@example.com",
        maKhoaHoc: "DGT2401",
        tenKhoaHoc: "Digital Marketing 2024",
        cumThoiGian: "Tối 2 4 6",
        chiNhanh: "Thủ Đức",
        trangThai: "Bảo lưu",
        ngayQuyetDinh: "",
        tenQuyetDinh: "",
        ghiChu: "",
        bienLaiChuyenKhoanUrl: "https://example.com/bienlai/1"
    },
    {
        maHocVien: "HV002",
        hoTen: "Nguyen Van A",
        gioiTinh: "Nam",
        ngaySinh: "01/01/1990",
        soDienThoai: "0973968438",
        email: "a@example.com",
        maKhoaHoc: "DGT2401",
        tenKhoaHoc: "Digital Marketing 2024",
        cumThoiGian: "Tối 2 4 6",
        chiNhanh: "Thủ Đức",
        trangThai: "Buộc thôi học",
        ngayQuyetDinh: "",
        tenQuyetDinh: "",
        ghiChu: "",
        bienLaiChuyenKhoanUrl: "https://example.com/bienlai/1"
    }
];

export default function F_skiywzymoc_Read() {
    const columns = [
        { header: "Mã học viên", accessorKey: "maHocVien" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Ngày sinh", accessorKey: "ngaySinh" },
        { header: "Số điện thoại", accessorKey: "soDienThoai" },
        { header: "Email", accessorKey: "email" },
        { header: "Mã khóa học", accessorKey: "maKhoaHoc" },
        { header: "Tên khóa học", accessorKey: "tenKhoaHoc" },
        { header: "Cụm thời gian", accessorKey: "cumThoiGian" },
        { header: "Chi nhánh", accessorKey: "chiNhanh" },
        { header: "Trạng thái", accessorKey: "trangThai" },
        { header: "Ngày quyết định", accessorKey: "ngayQuyetDinh" },
        { header: "Tên quyết định", accessorKey: "tenQuyetDinh" },
        { header: "Ghi chú", accessorKey: "ghiChu" },
        {
            header: "Biên lai chuyển khoản",
            accessorFn: () => <Button>Xem</Button>
        }
    ];

    return (
        <MyFieldset title="Danh sách đăng ký khóa học">
            <MyDataTable
                columns={columns}
                data={mockData}
                enableRowSelection={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_skiywzymoc_RutDangKy />
                        <F_skiywzymoc_BaoLuu />
                        <F_skiywzymoc_BuocThoiHoc />
                    </Group>
                )}
            />
        </MyFieldset>
    );
}