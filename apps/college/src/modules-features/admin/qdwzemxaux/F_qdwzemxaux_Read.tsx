'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_qdwzemxaux_Create from "./F_qdwzemxaux_Create";
import F_qdwzemxaux_Delete from "./F_qdwzemxaux_Delete";
import F_qdwzemxaux_Update from "./F_qdwzemxaux_Update";

interface IBanGio {
    id?: number,
    name?: string,
    code?: string,
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;

}
export default function F_qdwzemxaux_Read() {


    const query = useQuery<IBanGio[]>({
        queryKey: ['F_qdwzemxaux_Read'],
        queryFn: async () => banGioData,
    })

    const columns = useMemo<MRT_ColumnDef<IBanGio>[]>(
        () => [
            {
                header: "Mã bận giờ",
                accessorKey: "code"
            },
            {
                header: "Tên bận giờ",
                accessorKey: "name"
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() =>
                <Group>
                    <F_qdwzemxaux_Create documentType={0} />
                    <MyButton crudType="import" />
                </Group>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_qdwzemxaux_Update values={row.original} />
                        <F_qdwzemxaux_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}



const banGioData: IBanGio[] = [
    {
        id: 1, name: "Chào Cờ",
        code: "CC001",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 2, name: "Giờ Học",
        code: "GH002",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 3, name: "Giờ Nghỉ",
        code: "GN003",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 4, name: "Giờ Ra Chơi",
        code: "RC004",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 5, name: "Giờ Thể Dục",
        code: "TD005",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 6, name: "Giờ Sinh Hoạt",
        code: "SH006",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 7, name: "Giờ Tự Học",
        code: "TH007",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 8, name: "Giờ Lao Động",
        code: "LD008",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 9, name: "Giờ Kiểm Tra",
        code: "KT009",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 10, name: "Giờ Bế Giảng",
        code: "BG010",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    }
];