'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, Checkbox } from "@mantine/core";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_7Approve from "./F3_7Approve";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import F3_7Xemdanhsach from "./F3_7Xemdanhsach";

interface I {
    id?: number,
    maKeHoach?: string,
    tenKeHoach?: string,
    tongChiPhi?: string,
    chiTietVatTu?: string,
    ngayCapNhat?: Date,
    nguoiCapNhat?: string,
    isDuyet?: boolean,
    ghiChu?: string,
    phieuThu?: string,
    minhChung?: string

}

export default function F3_7Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                maKeHoach: "MS2025-01",
                tenKeHoach: "Đầu tư mua sắm vật tư 2025",
                tongChiPhi: "2.256.530.000",
                isDuyet: true,
                ghiChu: "Định hướng đầu tư",
                minhChung: "",
                chiTietVatTu: "",
                ngayCapNhat: new Date(),
                nguoiCapNhat: "Admin"

            }
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã kế hoạch",
            accessorKey: "maKeHoach",
        },
        {
            header: "Tên kế hoạch",
            accessorKey: "tenKeHoach",
        },
        {
            header: "Tổng chi phí",
            accessorKey: "tongChiPhi",
        },
        { header: "Chi tiết vật tư", accessorKey: "chiTietVatTu", accessorFn: (row) => <F3_7Xemdanhsach /> },
        {
            header: "Duyệt",
            accessorKey: "isDuyet",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
        {
            header: "Minh chứng phê duyệt",
            accessorKey: "minhChung",
            accessorFn: (row) => <MyButtonViewPDF />
        },
        // {
        //     header: "Kiểm tra",
        //     accessorFn: (row) => <F3_7Approve/>
        // },

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
            renderTopToolbarCustomActions={() => {
                return (
                    <Group>
                        <MyButton crudType="print" >In kế hoạch</MyButton>
                    </Group>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_7Approve />
                    </MyCenterFull>
                )
            }}
        />
    );
}
