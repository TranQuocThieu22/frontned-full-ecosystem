'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_2_3Update from "./F5_2_3Update";


// Nếu tính năng có update, delete dùng cho prototype  thì có thể export interface ra ngoài và nhớ 
//đánh số theo module VD I11_7Teacher còn không thì có thể dùng I
export interface I5_2_3 {
    id?: number,
    tenDeTai?: string, // Tên đề tài
    linhVuc?: string, // Lĩnh vực,
    giangVienDangKy?: string, // Giảng viên đăng ký
    donViCongTac?: string,// Đơn vị cộng tác
    kinhPhiDuKien?: number,// Kinh Phí dự kiến,
    thoiGianDuKien?: number, // Thời gian dự kiến - 12 tháng VD: 12 ,
    ketQuaPhanbien?: string,
    yKienHoidong?: string,
    dongY?: boolean,
}

export default function F5_2_3Read() {
    const query = useQuery<I5_2_3[]>({
        queryKey: [`F5_2_3Read`],
        queryFn: async () => [
            {
                "id": 1,
                "tenDeTai": "Ứng dụng AI trong giáo dục",
                "linhVuc": "Công nghệ thông tin",
                "giangVienDangKy": "Nguyen Van A",
                "donViCongTac": "Đại học Công nghệ",
                "kinhPhiDuKien": 15000000,
                "thoiGianDuKien": 12,
                "ketQuaPhanbien": "Đạt",
                "yKienHoidong": "Rất tốt",
                "dongY": true
            },
            {
                "id": 2,
                "tenDeTai": "Ứng dụng Blockchain",
                "linhVuc": "Tài chính",
                "giangVienDangKy": "Tran Thi B",
                "donViCongTac": "Viện Hàn lâm Khoa học",
                "kinhPhiDuKien": undefined,
                "thoiGianDuKien": undefined,
                "ketQuaPhanbien": undefined,
                "yKienHoidong": undefined,
                "dongY": false
            }
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I5_2_3>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "tenDeTai"
            },
            {
                header: "Lĩnh vực",
                accessorKey: "linhVuc"
            },
            {
                header: "Giảng viên đăng ký",
                accessorKey: "giangVienDangKy"
            },
            {
                header: "Đơn vị cộng tác",
                accessorKey: "donViCongTac"
            },
            {
                header: "Kinh phí dự kiến",
                accessorKey: "kinhPhiDuKien",
                Cell: ({ cell }) => {
                    const value = cell.getValue<number>();
                    return value ? `${value.toLocaleString()} VND` : "Không có";
                }
            },

            {
                header: "Thời gian dự kiến (tháng)",
                accessorKey: "thoiGianDuKien",
                Cell: ({ cell }) => {
                    const value = cell.getValue<number>();
                    return value ? `${value} tháng` : "Chưa xác định";
                }
            },
            {
                header: "File minh chứng",
                accessorFn: () => {
                    return <MyButtonViewPDF />
                }
            },
            {
                header: "Kết quả phản biện",
                accessorKey: "ketQuaPhanbien",
                Cell: ({ cell }) => cell.getValue<string>() || "Chưa có kết quả"
            },
            {
                header: "Ý kiến hội đồng",
                accessorKey: "yKienHoidong",
                Cell: ({ cell }) => cell.getValue<string>() || "Không có ý kiến"
            },
            {
                header: "Đồng ý",
                accessorKey: "dongY",
                Cell: ({ cell }) => <Checkbox defaultChecked={cell.getValue<boolean>()}></Checkbox>
            }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        <F5_2_3Update values={row.original} />

                    </MyCenterFull>
                )
            }}
        />
    )
}
