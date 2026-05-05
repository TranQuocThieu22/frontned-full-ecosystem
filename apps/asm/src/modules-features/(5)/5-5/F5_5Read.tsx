'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_5Form from "./F5_5Form/F5_5Form";
import F5_5Delete from "./F5_5Delete";
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface I {
    id?: number;
    ngayChungTu?: Date;
    soChungTu?: string;
    ghiChu?: string;
    ngayCapNhat?: Date; // Tự thêm theo yêu cầu
    nguoiCapNhat?: string; // Tự thêm theo yêu cầu
}

export default function F5_5Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_5Read`],
        queryFn: async () => [
            {
                id: 1,
                ngayChungTu: new Date("2023-01-15T00:00:00Z"),
                soChungTu: "CT001",
                ghiChu: "Thanh lý màn hình",
                ngayCapNhat: new Date("2023-01-20T00:00:00Z"),
                nguoiCapNhat: "Admin A"
            },
            {
                id: 2,
                ngayChungTu: new Date("2023-02-15T00:00:00Z"),
                soChungTu: "CT002",
                ghiChu: "Thanh lý máy chiếu",
                ngayCapNhat: new Date("2023-02-20T00:00:00Z"),
                nguoiCapNhat: "Admin B"
            }
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Ngày chứng từ",
            accessorKey: "ngayChungTu",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayChungTu!)),
        },
        {
            header: "Số chứng từ",
            accessorKey: "soChungTu",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!)),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F5_5Form />
                    <MyButton crudType="delete" />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F5_5Form values={row.original} />
                    <F5_5Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
