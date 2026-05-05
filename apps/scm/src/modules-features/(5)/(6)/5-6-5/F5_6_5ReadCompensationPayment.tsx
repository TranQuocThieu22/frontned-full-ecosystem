'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_6_5CreateCompensationPayment from "./F5_6_5CreateCompensationPayment";
import FeatDeleteCompensationPayment from './F5_6_5DeleteCompensationPayment';
import FeatUpdateCompensationPayment from './F5_6_5UpdateCompensationPayment';

export interface ICompensationPayment {
    id?: number; // STT
    decisionNumber?: string; // Số quyết định
    leader?: string; // Chủ tịch
    sumMoney?: number; // Tổng tiền
}

export default function F5_6_5ReadCompensationPayment() {
    const query = useQuery<ICompensationPayment[]>({
        queryKey: [`F5_6_5ReadCompensationPayment`],
        queryFn: async () => [
            {
                id: 1,
                decisionNumber: "QT-1234",
                leader: "Nguyễn Văn A",
                sumMoney: 500000,
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<ICompensationPayment>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "decisionNumber",
        },
        {
            header: "Chủ tịch",
            accessorKey: "leader",
        },
        {
            header: "Tổng tiền (VNĐ)",
            accessorKey: "sumMoney",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "File thanh toán",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F5_6_5CreateCompensationPayment />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateCompensationPayment values={row.original} />
                        <FeatDeleteCompensationPayment id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
