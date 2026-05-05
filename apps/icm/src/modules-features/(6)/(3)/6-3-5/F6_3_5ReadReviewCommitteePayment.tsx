'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_3_5CreateReviewCommitteePayment from "./F6_3_5CreateReviewCommitteePayment";
import FeatDeleteReviewCommitteePayment from './F6_3_5DeleteReviewCommitteePayment';
import FeatUpdateReviewCommitteePayment from './F6_3_5UpdateReviewCommitteePayment';

export interface I6_3_5ReviewCommitteePayment {
    id?: number;
    decisionNumber?: string;
    chairPerson?: string;
    totalAmount?: number;

}

export default function F6_3_5ReadReviewCommitteePayment() {
    const query = useQuery<I6_3_5ReviewCommitteePayment[]>({
        queryKey: ["F6_5_2ReadPaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_5ReviewCommitteePayment>[]>(
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
                    <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />


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
            renderTopToolbarCustomActions={() => <F6_3_5CreateReviewCommitteePayment />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateReviewCommitteePayment values={row.original} />
                        <FeatDeleteReviewCommitteePayment id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_3_5ReviewCommitteePayment[] = [
    {
        decisionNumber: "QT-1234",
        chairPerson: "Nguyễn Văn A",
        totalAmount: 5000000,
    },

];