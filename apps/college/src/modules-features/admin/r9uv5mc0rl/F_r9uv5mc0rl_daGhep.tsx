'use client'
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Group } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
// import { Row } from "@tanstack/react-table";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";


interface Ir9uv5mc0rlViewModalDone {
    STT?: number;              // Số thứ tự (BTT - Bảng thứ tự)
    Masinhvien?: string;     // Mã sinh viên (ví dụ: "SV001")
    Hoten?: string;           // Họ tên (ví dụ: "Tạ Ngọc Lâm")
    Ngaysinh?: string;        // Ngày sinh (ví dụ: "07/09/2000")
    Gioitinh?: string;        // Giới tính (ví dụ: "Nam")
    Malop?: string;          // Mã khối (ví dụ: "IT2001")
    Makhoa?: string;         // Mã ngành (ví dụ: "IT204")
    Mamonhoc?: string;   // Tình trạng học (ví dụ: "Đang học trung cấp")
    Tenmonhoc?: string;
    Nhomhoc?: string;         // Nhóm học (ví dụ: "01")
    NHHK?: string;          // Năm học (ví dụ: "2024-1")
    Chuyencan?: number;     // Chuyên ngành (ví dụ: "6")
    Giuaki?: string;       // Ghs chú kỳ (ví dụ: "7")
    CuoikiL1?: string;       // Ghi chú lý thuyết (ví dụ: "6.5")
    Kythi?: String; // ghi chu ki thi ( co  the nhap du lieu vao day )

}
const mockData: Ir9uv5mc0rlViewModalDone[] = [

    {
        STT: 1,
        Masinhvien: "SV001",
        Hoten: "Tạ Ngọc Lâm",
        Ngaysinh: "07/09/2000",
        Gioitinh: "Nam",
        Malop: "IT2001",
        Makhoa: "IT204",
        Mamonhoc: "IT2071",
        Tenmonhoc: "Quản trị mạng",
        Nhomhoc: "01",
        NHHK: "2024-1",
        Chuyencan: 6,
        Giuaki: "7",
        CuoikiL1: "6.5",
        Kythi: "T1"
    },
    {
        STT: 2,
        Masinhvien: "SV002",
        Hoten: "Nguyễn Thị Minh",
        Ngaysinh: "15/04/2001",
        Gioitinh: "Nữ",
        Malop: "IT2002",
        Makhoa: "IT205",
        Mamonhoc: "IT2072",
        Tenmonhoc: "Lập trình Web",
        Nhomhoc: "02",
        NHHK: "2024-1",
        Chuyencan: 8,
        Giuaki: "8.5",
        CuoikiL1: "7.0",
        Kythi: "T1"
    }

]

export default function F_r9uv5mc0rl_Read() {

    const studentListQuery = useQuery<Ir9uv5mc0rlViewModalDone[]>({
        queryKey: ['IF_ r9uv5mc0rl_Read'],
        queryFn: async () => {
            return mockData
        }, refetchOnWindowFocus: false
    })

    const [selectedRow, setSelectedRow] = useState<number[]>([]);
    useEffect(() => {
        if (studentListQuery.data) {
            setSelectedRow([studentListQuery.data[0]?.STT!]);
        }
    }, [studentListQuery.isLoading]);
    const handleRowClick = (itemId: any) => {
        //single
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow.includes(itemId) ? [] : [itemId]
        );
    }


    const columnsDone = useMemo<MRT_ColumnDef<Ir9uv5mc0rlViewModalDone>[]>(() => [

        {
            accessorKey: "Masinhvien",
            header: "Mã SV",

            enableClickToCopy: true,
        },
        {
            accessorKey: "Hoten",
            header: "Họ Tên",

        },
        {
            accessorKey: "Ngaysinh",
            header: "Ngày Sinh",

        },
        {
            accessorKey: "Gioitinh",
            header: "Giới Tính",

        },
        {
            accessorKey: "Malop",
            header: "Mã Lớp",

        },
        {
            accessorKey: "Makhoa",
            header: "Mã Khóa",

        },
        {
            accessorKey: "Mamonhoc",
            header: "Mã Môn Học",

        },
        {
            accessorKey: "Tenmonhoc",
            header: "Tên Môn Học",

        },
        {
            accessorKey: "Nhomhoc",
            header: "Nhóm Học",

        },
        {
            accessorKey: "NHHK",
            header: "NHHK",

        },
        {
            accessorKey: "Chuyencan",
            header: "Chuyên Cần",

        },
        {
            accessorKey: "Giuaki",
            header: "Giữa Kỳ",

        },
        {
            accessorKey: "CuoikiL1",
            header: "Cuối Kỳ L1",

        },
        {
            accessorKey: "Kythi",
            header: "Kỳ Thi",

        },
    ], [])
    // Xử lý trạng thái tải dữ liệu
    if (studentListQuery.isLoading) return "Đang tải dữ liệu...";
    if (studentListQuery.isError) return "Không có dữ liệu...";


    return (

        <MyDataTable
            enableRowSelection
            columns={columnsDone}
            data={studentListQuery.data!}
            renderTopToolbarCustomActions={() =>
                <Group> <MyButton crudType='delete' /></Group>

            } />

    )
}
