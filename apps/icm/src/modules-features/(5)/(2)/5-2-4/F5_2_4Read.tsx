'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date } from "aq-fe-framework/utils-v2"
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_2_4Create from "./F5_2_4Create";
import F5_2_4Delete from "./F5_2_4Delete";
import F5_2_4Update from "./F5_2_4Update";


interface I {
    id?: number,
    soQuyetDinh?: string,
    ngayQuyetDinh?: Date,
    tenQuyetDinh?: string,
}

export default function F5_2_4Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_2_4Read`],
        queryFn: async () => [
            {
                "soQuyetDinh": "QĐ001",
                "ngayQuyetDinh": new Date("2024-01-15T00:00:00Z"),
                "tenQuyetDinh": "Quyết định bổ nhiệm"
            },
            {
                "soQuyetDinh": "QĐ002",
                "ngayQuyetDinh": new Date("2024-01-15T00:00:00Z"),
                "tenQuyetDinh": "Quyết định khen thưởng"
            }
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "soQuyetDinh"
            },
            {
                header: "Ngày quyết định",
                accessorKey: "ngayQuyetDinh",
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue<Date>());
                    return utils_date.toDDMMYYYY(date); // Định dạng ngày tháng năm theo chuẩn Việt Nam
                }
            },
            {
                header: "Tên quyết định",
                accessorKey: "tenQuyetDinh"
            },
            {
                header: "File quyết định",
                accessorFn: () => {
                    return <MyButtonViewPDF />
                }
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
            renderTopToolbarCustomActions={() => < F5_2_4Create />}
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        <F5_2_4Update values={row.original} />
                        <F5_2_4Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
