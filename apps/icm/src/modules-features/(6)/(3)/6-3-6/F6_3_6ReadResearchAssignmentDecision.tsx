'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_3_6CreateResearchAssignmentDecision from "./F6_3_6CreateResearchAssignmentDecision";
import FeatDeleteResearchAssignmentDecision from './F6_3_6DeleteResearchAssignmentDecision';
import FeatUpdateResearchAssignmentDecision from './F6_3_6UpdateResearchAssignmentDecision';

export interface I6_3_6ResearchAssignmentDecision {
    id?: number;
    decisionNumber?: string;
    decisionDate?: string;
    decisionName?: string;
    totalAmount?: number;

}

export default function F6_3_6ReadResearchAssignmentDecision() {
    const query = useQuery<I6_3_6ResearchAssignmentDecision[]>({
        queryKey: ["F6_3_6ReadResearchAssignmentDecision"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_6ResearchAssignmentDecision>[]>(
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
                header: "Tổng kinh phí",
                accessorKey: "totalAmount"
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
            renderTopToolbarCustomActions={() => <F6_3_6CreateResearchAssignmentDecision />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateResearchAssignmentDecision values={row.original} />
                        <FeatDeleteResearchAssignmentDecision id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_3_6ResearchAssignmentDecision[] = [
    {
        decisionNumber: "QD/KT001",
        decisionDate: "01/01/2024",
        decisionName: "V/v Quyết định giao đề tài nghiên cứu cho Nhóm nghiên cứu",
        totalAmount: 150000000
    },

];