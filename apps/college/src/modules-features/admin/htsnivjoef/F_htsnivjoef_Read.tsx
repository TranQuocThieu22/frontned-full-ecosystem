'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_htsnivjoef_Create from "./F_htsnivjoef_Create";
import F_htsnivjoef_Delete from "./F_htsnivjoef_Delete";
import F_htsnivjoef_Update from "./F_htsnivjoef_Update";

interface ITinhChatThi {
    id?: number,
    name?: string,
    code?: string,
    note?: string,
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;


}
export default function F_htsnivjoef_Read() {


    const query = useQuery<ITinhChatThi[]>({
        queryKey: ['F_htsnivjoef_Read'],
        queryFn: async () => tinhChatThiData,
    })

    const columns = useMemo<MRT_ColumnDef<ITinhChatThi>[]>(
        () => [
            {
                header: "Mã tính chất thi",
                accessorKey: "code"
            },
            {
                header: "Tên tính chất thi",
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
                    <F_htsnivjoef_Create documentType={0} />
                    <MyButton crudType="import" />
                </Group>
            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_htsnivjoef_Update values={row.original} />
                        <F_htsnivjoef_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}



const tinhChatThiData: ITinhChatThi[] = [
    {
        id: 1,
        name: "Bắt buộc",
        code: "TCT001",
        note: "Áp dụng cho tất cả các chứng chỉ quốc gia",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 2,
        name: "Tự chọn",
        code: "TCT002",
        note: "Chỉ áp dụng cho một số ngành đặc thù",
        nguoiCapNhat: "Trần Thị B",
        ngayCapNhat: new Date("2023-12-20")
    },
    {
        id: 3,
        name: "Bổ sung",
        code: "TCT003",
        note: "Dành cho các khóa học mở rộng",
        nguoiCapNhat: "Lê Văn C",
        ngayCapNhat: new Date("2024-01-03")
    },
    {
        id: 4,
        name: "Cấp tốc",
        code: "TCT004",
        note: "Áp dụng cho các khóa học ngắn hạn",
        nguoiCapNhat: "Hoàng Thị D",
        ngayCapNhat: new Date("2024-01-01")
    },
    {
        id: 5,
        name: "Gia hạn",
        code: "TCT005",
        note: "Dành cho chứng chỉ sắp hết hạn",
        nguoiCapNhat: "Phạm Văn E",
        ngayCapNhat: new Date("2023-11-15")
    }
];
