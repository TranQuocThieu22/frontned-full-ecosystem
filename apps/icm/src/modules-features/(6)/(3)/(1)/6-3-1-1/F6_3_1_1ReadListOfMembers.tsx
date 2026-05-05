'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_3_1_1CreateListOfMembers from "./F6_3_1_1CreateListOfMembers";
import FeatDeleteListOfMembers from './F6_3_1_1DeleteListOfMembers';
import FeatUpdateListOfMembers from './F6_3_1_1UpdateListOfMembers';
export interface I6_3_1_1ListOfMembers {
    id?: number;
    decisionNumber?: string;
    decisionDate?: string;
    decisionName?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
}

export default function F6_3_1_1ReadListOfMembers() {
    const query = useQuery<I6_3_1_1ListOfMembers[]>({
        queryKey: ["F6_5_2ReadPaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_1_1ListOfMembers>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber"
            },
            {
                header: "Ngày quyết định",
                accessorKey: "decisionDate"
            },
            {
                header: "Tên quyết định",
                accessorKey: "decisionName"
            },
            {
                header: "Tên đề tài",
                accessorKey: "topicName"
            },
            {
                header: "Tên nhóm nghiên cứu",
                accessorKey: "groupName"
            },
            {
                header: "Trưởng nhóm",
                accessorKey: "leaderName"
            },
            {
                header: "File quyết định",
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
            renderTopToolbarCustomActions={() => <F6_3_1_1CreateListOfMembers />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateListOfMembers values={row.original} />
                        <FeatDeleteListOfMembers id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_3_1_1ListOfMembers[] = [
    {
        decisionNumber: "QD/KT001",
        decisionDate: "01/01/2000",
        decisionName: "V/v xác định danh sách đề xuất đề tài NCKH định hướng",
        topicName: "Đề tài A",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A"
    },

];