'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface F4_1_2 {
    code: string, // Mã giảng viên
    name: string, // Họ và tên
    soGioDetai: number, // Số giờ đề tài
    soGioBaiBao: number, // Số giờ bài báo
    soGiohoithao: number, // Số giờ hội thảo
    daDuyet: boolean,// Duyệt
    nhanXet: string // Nhận xét
}
export default function F4_1_3SummaryOfAssignmentForm() {
    const query = useQuery({
        queryKey: ["F4_1_3SummaryOfAssignmentForm"],
        queryFn: () => {
            return data
        }
    })
    const columns = useMemo<MRT_ColumnDef<F4_1_2>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "name"
            },
            {
                header: "Số giờ đề tài",
                accessorKey: "soGioDetai"
            },
            {
                header: "Số giờ bài báo",
                accessorKey: "soGioBaiBao"
            },
            {
                header: "Số giờ hội thảo",
                accessorKey: "soGiohoithao"
            },
            {
                header: "Đã duyệt",
                accessorKey: "daDuyet",
                Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()}></Checkbox>
            },
            {
                header: "Nhận xét",
                accessorKey: "nhanXet"
            }
        ],
        []
    );
    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"
    return (
        <MyDataTable data={query.data!} columns={columns} />
    )
}


const data: F4_1_2[] = [
    {
        "code": "GV001",
        "name": "Nguyen Van A",
        "soGioDetai": 10,
        "soGioBaiBao": 5,
        "soGiohoithao": 2,
        "daDuyet": true,
        "nhanXet": "Hoàn thành tốt"
    },
    {
        "code": "GV002",
        "name": "Tran Thi B",
        "soGioDetai": 8,
        "soGioBaiBao": 3,
        "soGiohoithao": 4,
        "daDuyet": false,
        "nhanXet": "Cần bổ sung"
    }
]