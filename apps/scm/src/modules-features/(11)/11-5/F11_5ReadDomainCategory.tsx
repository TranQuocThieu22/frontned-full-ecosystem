'use client'
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_5DeleteDomainCategory from "./F11_5DeleteDomainCategory";
import F11_5UpdateDomainCategory from "./F11_5UpdateDomainCategory";

export interface I11_5DomainCategory {
    id?: number
    code?: string;
    name?: string;
    notes?: string;
}

export default function F11_5ReadDomainCategory() {
    const query = useQuery<I11_5DomainCategory[]>({
        queryKey: ["SystemCatalogDomainCategory"],
        queryFn: async () => {
            const result = await baseAxios.get("/SystemCatalogDomainCategory/GetAll", {
                params: {
                    "cols": "null"
                }
            });
            return result.data.data
        },
    })
    const columns = useMemo<MRT_ColumnDef<I11_5DomainCategory>[]>(
        () => [
            {
                header: "Mã lĩnh vực",
                accessorKey: "code"
            },
            {
                header: "Tên lĩnh vực",
                accessorKey: "name"
            },
            {
                header: "Ghi chú",
                accessorKey: "notes"
            }
        ],
        []
    );
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F11_5UpdateDomainCategory values={row.original} />
                        <F11_5DeleteDomainCategory id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const data: I11_5DomainCategory[] = [
    {
        code: "HR001",
        name: "Nhân sự",
        notes: "Quản lý thông tin nhân sự và tuyển dụng"
    },
    {
        code: "IT002",
        name: "Công nghệ thông tin",
        notes: "Phát triển phần mềm và quản trị hệ thống"
    },
    {
        code: "FIN003",
        name: "Tài chính",
        notes: "Quản lý ngân sách và báo cáo tài chính"
    },
    {
        code: "MKT004",
        name: "Marketing",
        notes: "Chiến lược và quảng bá thương hiệu"
    },
    {
        code: "PRD005",
        name: "Sản xuất",
        notes: "Quản lý sản xuất và vận hành"
    }
];
