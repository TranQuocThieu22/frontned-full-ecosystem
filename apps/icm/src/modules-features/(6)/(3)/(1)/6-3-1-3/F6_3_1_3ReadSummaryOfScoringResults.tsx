'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_3_1_3CreateSummaryOfScoringResults from "./F6_3_1_3CreateSummaryOfScoringResults";
import DeleteSummaryOfScoringResults from "./F6_3_1_3DeleteSummaryOfScoringResults";
import UpdateSummaryOfScoringResults from "./F6_3_1_3UpdateSummaryOfScoringResults";

export interface I6_3_1_3SummaryOfScoringResults {
    id?: number;
    decisionNumber?: string;
    topicCode?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    point?: number;
}

export default function F6_3_1_3ReadSummaryOfScoringResults() {
    const query = useQuery<I6_3_1_3SummaryOfScoringResults[]>({
        queryKey: ["F6_3_1_3ReadSummaryOfScoringResults"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_1_3SummaryOfScoringResults>[]>(
        () => [
            {
                header: "Số quyết định hội đồng xét duyệt đề tài",
                accessorKey: "decisionNumber"
            },
            {
                header: "Mã đề tài",
                accessorKey: "topicCode"
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
                header: "Điểm trung binh",
                accessorKey: "point"
            },
            {
                header: "File biên bản",
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
            renderTopToolbarCustomActions={() => <F6_3_1_3CreateSummaryOfScoringResults />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <UpdateSummaryOfScoringResults values={row.original} />
                        <DeleteSummaryOfScoringResults id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_3_1_3SummaryOfScoringResults[] = [
    {
        decisionNumber: "QT-1234",
        topicCode: "DT00001",
        topicName: "Đổi mới giáo dục đại học",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        point: 80
    },

];