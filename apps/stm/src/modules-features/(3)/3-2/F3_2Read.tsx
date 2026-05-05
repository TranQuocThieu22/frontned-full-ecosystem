'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_2Delete from "./F3_2Delete";
import F3_2DeleteList from "./F3_2DeleteList";
import F3_2Form from "./F3_2Form/F3_2Form";

interface IprogramType {
    id?: number,
    code?: string
    name?: string
}

interface I {
    id?: number;
    code?: string; // CT01
    name?: string; // Lập trình web
    programType?: IprogramType; // Đào tạo ngắn hàng
    isTesting?: boolean; // true
    certificateId?: number; // Nếu có gắn thì có cấp chứng chỉ chứng nhận
    isCancel?: boolean; // false
    totalClassPeriodNumber?: number; // 120 Tống số tiết
    totalHours?: number; // 90 Tổng số giờ
    price?: number; // 95000000
    ngayCapNhat?: Date; // Ngày cập nhật cuối
    nguoiCapNhat?: string; // Người cập nhật cuối
}

export default function F3_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`F3_2Read`],
        queryFn: async () => {
            const result = await baseAxios.get('/Program/getall?cols=programType')
            return result.data.data
        }
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã chương trình",
            accessorKey: "code",
        },
        {
            header: "Tên chương trình",
            accessorKey: "name",
        },
        {
            header: "Loại chương trình",
            accessorKey: "programType.name",
        },
        {
            header: "Có tổ chức thi",
            accessorKey: "isTesting",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "Có cấp chứng chỉ chứng nhận",
            accessorFn: (row) => {
                if (row.certificateId == null) return false
                return true
            },
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "Dừng đào tạo",
            accessorKey: "isCancel",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "Tổng số tiết",
            accessorKey: "totalClassPeriodNumber",
        },
        // {
        //     header: "Tổng số giờ",
        //     accessorKey: "totalHours",
        // },
        {
            header: "Học phí (gợi ý)",
            accessorKey: "price",
            Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        <F3_2Form />
                        <F3_2DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        <MyButton crudType="import" />
                    </Group>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_2Form values={row.original} />
                        <F3_2Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
