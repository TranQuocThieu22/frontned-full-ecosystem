'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor,Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { useMemo } from "react";
// import F10_4NhapDiem from "./F10_4NhapDiem";
import { MyButton } from '../../../components/Buttons/Button/MyButton';
import { Button } from "@mantine/core";
import F3_6Xemdanhsach from "./F3_6Xemdanhsach";

interface I {
    id?: number;
    maKeHoach?: string; // LTB24101-10
    tenKeHoach?: string; // Khóa thi lập trình web 2024 ngày 15/06/2024
    tongChiPhi?: string; // LTB24101-10-001
    chiTietVatTu?: string; // P001
   
    isDuyet?: boolean; // 15/20
    ghiChu?: string; // 12/20
    minhChung?: string; 
    ngayCapNhat?: Date; // Ngày cập nhật cuối
    nguoiCapNhat?: string; // Người cập nhật cuối
}

export default function F3_6Read() {
    const query = useQuery<I[]>({
        queryKey: [`F3_6Read`],
        queryFn: async () => [
            {
                id: 1,
                maKeHoach: "MS2025-01",
                tenKeHoach: "Dầu tư mua sắm vật tư năm 2025",
                tongChiPhi: "2.256.530.000",
                chiTietVatTu: "",
                isDuyet: true,
                ghiChu: "đúng định hướng đầu tư",
                minhChung: "",
                ngayCapNhat: new Date("2025-1-1"),
                nguoiCapNhat: "Admin",
              
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
            accessorKey: "tenKeHoach"
        },
        {
            header: "Tổng chi phí",
            accessorKey: "tongChiPhi"
        },
       
        {
            header: "Chi tiết vật tư",
            accessorKey: "chiTietVatTu",
           accessorFn: (row) => <F3_6Xemdanhsach/>
        },
        {
            header: "Duyệt",
            accessorKey: "isDuyet",
            accessorFn: (originalRow) => {
                return (
                    <Checkbox defaultChecked={true} ></Checkbox>
                )
            }
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu"
        },
        {
            header: "Minh chứng phê duyệt",
            accessorFn: (row) => <MyButtonViewPDF id={undefined} />
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!))
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
        exportAble
        enableRowSelection={true}
            columns={columns}
            data={query.data!}
            // renderRowActions={({ row }) => {
            //     return (
            //         <MyCenterFull>
            //             <MyButton crudType="default"> Xem</MyButton>
            //         </MyCenterFull>
            //     );
            // }}
        />
    );
}
