'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_7ttzb1hr8s_ExamRetest from "./F_7ttzb1hr8s_ExamRetest";
import F_7ttzb1hr8s_MoveExam from "./F_7ttzb1hr8s_MoveExam";
// import F_3cntlaxrnz_Content from "./F_3cntlaxrnz_Content";

export interface I_7ttzb1hr8s {
    id?: number;
    maHocVien?: string;
    tenHocVien?: string;
    gioiTinh?: string;
    ngaySinh?: string;
    soDienThoai?: string;
    email?: string;
    maKhoaHoc?: string;
    tenKhoaHoc?: string;
    cumThoiGian?: string;
    chiNhanh?: string;
    trangThai?: string;
    ngayQuyetDinh?: string;
    tenQuyetDinh?: string;
    ghiChu?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: I_7ttzb1hr8s[] = [
    {
        id: 1,
        maHocVien: "HV001",
        tenHocVien: "Nguyễn Văn A",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        maKhoaHoc: "DGT2401",
        tenKhoaHoc: "Digital marketing 2024",
        cumThoiGian: "Tối 2 4 6",
        chiNhanh: "Thủ Đức",
        trangThai: "Hoãn thi",
        ngayQuyetDinh: "",
        tenQuyetDinh: "",
        ghiChu: "",

    },
    {
        id: 2,
        maHocVien: "HV002",
        tenHocVien: "Nguyễn Văn A",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        maKhoaHoc: "DGT2401",
        tenKhoaHoc: "Digital marketing 2024",
        cumThoiGian: "Tối 2 4 6",
        chiNhanh: "Thủ Đức",
        trangThai: "Chưa xếp thi",
        ngayQuyetDinh: "",
        tenQuyetDinh: "",
        ghiChu: "",
    },
]

export default function F_7ttzb1hr8s_Read() {
    const Q_data = useQuery({
        queryKey: [`F_7ttzb1hr8s_Read`],
        queryFn: async () => {
            return mockData;
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_7ttzb1hr8s>[]>(
        () => [
            {
                header: "Mã học viên",
                accessorKey: "maHocVien",
            },
            {
                header: "Họ tên",
                accessorKey: "tenHocVien",
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh",
            },
            {
                header: "Ngày sinh",
                accessorKey: "ngaySinh",
                accessorFn(row) {
                    return utils_date_dateToDDMMYYYString(new Date(row.ngaySinh!));
                },
            },
            {
                header: "Số điện thoại",
                accessorKey: "soDienThoai",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Mã khóa học",
                accessorKey: "maKhoaHoc"
            },
            {
                header: "Tên khóa học",
                accessorKey: "tenKhoaHoc"
            },
            {
                header: "Cụm thời gian",
                accessorKey: "cumThoiGian"
            },
            {
                header: "Chi nhánh",
                accessorKey: "chiNhanh"
            },
            {
                header: "Trạng thái",
                accessorKey: "trangThai",
            },
            {
                header: "Ngày quyết định",
                accessorKey: "ngayQuyetDinh",
            },
            {
                header: "Tên quyết định",
                accessorKey: "tenQuyetDinh",
            },
            {
                header: "Ghi chú",
                accessorKey: "ghiChu",
            },
            {
                header: "Biên lai chuyển khoản",
                Cell: ({ row }) => {
                    return <MyButtonViewPDF label="xem" />
                }
            },
            {
                header: "Người Cập Nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày Cập Nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            },
        ],
        []
    );

    if (Q_data.isLoading) return "Đang tải dữ liệu..."
    if (Q_data.isError) return "Không có dữ liệu..."
    return (
        <MyFieldset title="Danh sách đăng ký khóa thi">

            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={Q_data.data!}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_7ttzb1hr8s_MoveExam />
                        <F_7ttzb1hr8s_ExamRetest />
                    </Group>
                )}
            />

        </MyFieldset>
    );
}
