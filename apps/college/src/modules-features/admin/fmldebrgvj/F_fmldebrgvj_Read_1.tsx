'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_fmldebrgvj_Create from "./F_fmldebrgvj_Create";
import F12_1Delete from "./F_fmldebrgvj_Delete";
import F12_1Update from "./F_fmldebrgvj_Update";

interface IDsThoiGian {
    id?: number,
    name?: string,
    code?: string,
    sang?: number,
    chieu?: number,
    toi?: number,
    note?: string,
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_fmldebrgvj_Read_1() {


    const query = useQuery<IDsThoiGian[]>({
        queryKey: ['F_fmldebrgvj_Read_1'],
        queryFn: async () => thoiGianData,
    })

    const columns = useMemo<MRT_ColumnDef<IDsThoiGian>[]>(
        () => [
            {
                header: "Mã thời gian",
                accessorKey: "code"
            },
            {
                header: "Tên thời gian",
                accessorKey: "name"
            },
            {
                header: "Sáng",
                accessorKey: "sang"
            },
            {
                header: "Chiều",
                accessorKey: "chieu"
            },
            {
                header: "Tối",
                accessorKey: "toi"
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
                    <F_fmldebrgvj_Create documentType={0} />
                    <MyButton crudType="import" />
                </Group>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_1Update values={row.original} />
                        <F12_1Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}



const thoiGianData: IDsThoiGian[] = [
    {
        id: 1,
        name: "Buổi sáng",
        code: "SANG",
        sang: 8,
        chieu: 0,
        toi: 0,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 2,
        name: "Buổi chiều",
        code: "CHIEU",
        sang: 0,
        chieu: 14,
        toi: 0,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 3,
        name: "Buổi tối",
        code: "TOI",
        sang: 0,
        chieu: 0,
        toi: 19,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 4,
        name: "Cả ngày",
        code: "CANGAY",
        sang: 8,
        chieu: 14,
        toi: 19,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 5,
        name: "Nửa ngày sáng",
        code: "NUSANG",
        sang: 8,
        chieu: 12,
        toi: 0,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 6,
        name: "Nửa ngày chiều",
        code: "NUCHIEU",
        sang: 0,
        chieu: 13,
        toi: 17,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    }
];
