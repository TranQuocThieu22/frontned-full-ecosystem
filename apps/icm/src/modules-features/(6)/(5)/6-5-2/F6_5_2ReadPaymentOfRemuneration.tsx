'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_5_2CreatePaymentOfRemuneration from "./F6_5_2CreatePaymentOfRemuneration";
import FeatDeletePaymentOfRemuneration from './F6_5_2DeletePaymentOfRemuneration';
import FeatUpdatePaymentOfRemuneration from './F6_5_2UpdatePaymentOfRemuneration';

export interface I6_5_2PaymentOfRemuneration {
    id?: number;
    decisionNumber?: string;
    chairPerson?: string;
    totalAmount?: number;

}

export default function F6_5_2ReadPaymentOfRemuneration() {
    const query = useQuery<I6_5_2PaymentOfRemuneration[]>({
        queryKey: ["F6_5_2ReadPaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_2PaymentOfRemuneration>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber"
            },
            {
                header: "Chủ tịch",
                accessorKey: "chairPerson"
            },
            {
                header: "Tổng tiền",
                accessorKey: "totalAmount"
            },
            {
                header: "File thanh toán",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />


            }
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F6_5_2CreatePaymentOfRemuneration />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdatePaymentOfRemuneration values={row.original} />
                        <FeatDeletePaymentOfRemuneration id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_5_2PaymentOfRemuneration[] = [
    {
        decisionNumber: "QT-1234",
        chairPerson: "Nguyễn Văn A",
        totalAmount: 5000000,
    },

];