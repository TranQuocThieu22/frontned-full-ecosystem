"use client"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { utils_date } from "aq-fe-framework/utils-v2"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"

interface I5_1 {
    id?: number
    maDeTai?: string
    tenDeTai?: string
    capDeTai?: string
    loaiDeTai?: string
    thoiGianBatDau?: Date
    thoiGianKetThuc?: Date
    kinhPhi?: number
    nguonKinhPhi?: string
    trangThai?: string
}

export default function F5_1Read() {
    const query = useQuery({
        queryKey: ["F5_1Read"],
        queryFn: () => {
            return data
        }
    })
    const columns = useMemo<MRT_ColumnDef<I5_1>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "maDeTai"
            },
            {
                header: "Tên đề tài",
                accessorKey: "tenDeTai"
            },
            {
                header: "Cấp đề tài",
                accessorKey: "capDeTai"
            },
            {
                header: "Loại đề tài",
                accessorKey: "loaiDeTai"
            },
            {
                header: "Thời gian bắt đầu",
                accessorKey: "thoiGianBatDau",
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue<Date>());
                    return utils_date.toDDMMYYYY(date) // Định dạng ngày tháng năm theo chuẩn Việt Nam
                }
            },
            {
                header: "Thời gian kết thúc",
                accessorKey: "thoiGianKetThuc",
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue<Date>());
                    return utils_date.toDDMMYYYY(date) // Định dạng ngày tháng năm theo chuẩn Việt Nam
                }
            },
            {
                header: "Kinh phí",
                accessorKey: "kinhPhi"
            },
            {
                header: "Nguồn kinh phí",
                accessorKey: "nguonKinhPhi"
            },
            {
                header: "Trạng thái",
                accessorKey: "trangThai"
            }
        ],
        []
    );

    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"

    return (
        <MyDataTable
            data={query.data!}
            columns={columns}
        />
    )
}
const data: I5_1[] = [
    {
        "maDeTai": "DT001",
        "tenDeTai": "Nghiên cứu AI",
        "capDeTai": "Cấp Bộ",
        "loaiDeTai": "Khoa học cơ bản",
        "thoiGianBatDau": new Date("2024-01-01T00:00:00Z"),
        "thoiGianKetThuc": new Date("2024-12-31T00:00:00Z"),
        "nguonKinhPhi": "Ngân sách nhà nước",
        "kinhPhi": 23000000,
        "trangThai": "Đã thanh lý"
    },
    {
        "maDeTai": "DT002",
        "tenDeTai": "Ứng dụng Blockchain",
        "capDeTai": "Cấp Trường",
        "loaiDeTai": "Ứng dụng",
        "thoiGianBatDau": new Date("2023-06-01T00:00:00Z"),
        "thoiGianKetThuc": new Date("2023-12-31T00:00:00Z"),
        "nguonKinhPhi": "Nguồn tài trợ tư nhân",
        "kinhPhi": 53000000,
        "trangThai": "Đã thanh lý"
    }
]