'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_5_1_1CreateAcceptanceCommitteeMembers from "./F6_5_1_1CreateAcceptanceCommitteeMembers";
import FeatDeleteAcceptanceCommitteeMembers from './F6_5_1_1DeleteAcceptanceCommitteeMembers';
import FeatUpdateAcceptanceCommitteeMembers from './F6_5_1_1UpdateAcceptanceCommitteeMembers';
export interface I6_5_1_1AcceptanceCommitteeMembers {
    id?: number;
    decisionNumber?: string;
    decisionDate?: string;
    decisionName?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
}

export default function F6_3_1_1ReadAcceptanceCommitteeMembers() {
    const query = useQuery<I6_5_1_1AcceptanceCommitteeMembers[]>({
        queryKey: ["F6_5_2ReadPaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_1_1AcceptanceCommitteeMembers>[]>(
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
            renderTopToolbarCustomActions={() => <F6_5_1_1CreateAcceptanceCommitteeMembers />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateAcceptanceCommitteeMembers values={row.original} />
                        <FeatDeleteAcceptanceCommitteeMembers id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_5_1_1AcceptanceCommitteeMembers[] = [
    {
        decisionNumber: "QD/KT001",
        decisionDate: "01/01/2000",
        decisionName: "V/v Thành lập hội đồng nghiệm thu đề tài năm 2024",
        topicName: "Đề tài A",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A"
    },

];