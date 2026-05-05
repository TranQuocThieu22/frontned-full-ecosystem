'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F_th1wvlqe58_Create from "./F_th1wvlqe58_Create";


interface Ith1wvlqe58ViewModel {
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
}
const mockData: Ith1wvlqe58ViewModel[] = [
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
    },
]


export default function F_th1wvlqe58_Read() {
    const studentListImproveScores = useQuery<Ith1wvlqe58ViewModel[]>({
        queryKey: ["IF_th1wvlqe58_Read"],
        queryFn: async () => {
            return mockData
        }, refetchOnWindowFocus: false
    })

    const [selectedId, setSelectedRow] = useState<number[]>([]);
    useEffect(() => {
        if (studentListImproveScores.data) {
            setSelectedRow([studentListImproveScores.data[0]?.STT!]);
        }
    }, [studentListImproveScores.isLoading]);

    const handleRowClick = (itemId: any) => {
        //single
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow.includes(itemId) ? [] : [itemId]
        );
    };
    const columns = useMemo<MRT_ColumnDef<Ith1wvlqe58ViewModel>[]>(() => [

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
            header: "Mã Khoa",

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

    ], [])
    // Xử lý trạng thái tải dữ liệu
    if (studentListImproveScores.isLoading) return "Đang tải dữ liệu...";
    if (studentListImproveScores.isError) return "Không có dữ liệu...";


    return (

        <Fieldset legend="Danh sách sinh viên đăng kí cải thiện" >   <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns} data={studentListImproveScores.data!}
            renderTopToolbarCustomActions={() =>
                <Group>
                    <F_th1wvlqe58_Create />
                    <MyButton crudType="import" />
                    <MyButton crudType="delete" />

                </Group>
            }

        /></Fieldset>




    )
}
