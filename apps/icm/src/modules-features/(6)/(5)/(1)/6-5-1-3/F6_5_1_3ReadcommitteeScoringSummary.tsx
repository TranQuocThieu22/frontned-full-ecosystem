'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_5_1_3CreatecommitteeScoringSummary from "./F6_5_1_3CreatecommitteeScoringSummary";
import FeatDeleteCommitteeScoringSummary from './F6_5_1_3DeletecommitteeScoringSummary';
import FeatUpdateCommitteeScoringSummary from './F6_5_1_3UpdatecommitteeScoringSummary';

export interface I6_5_1_3CommitteeScoringSummary {
    id?: number;
    decisionNumber?: string;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    point?: number;
    comment?: string;
}

export default function F6_5_1_3ReadcommitteeScoringSummary() {
    const query = useQuery<I6_5_1_3CommitteeScoringSummary[]>({
        queryKey: ["F6_3_6ReadResearchAssignmentDecision"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_1_3CommitteeScoringSummary>[]>(
        () => [
            {
                header: "Số quyết định hội đồng xét duyệt đề tài",
                accessorKey: "decisionNumber"
            },
            {
                header: "Mã đề tài",
                accessorKey: "code"
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
                header: "Điểm trung bình",
                accessorKey: "point"
            },
            {
                header: "Đánh giá",
                accessorKey: "comment"
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
            renderTopToolbarCustomActions={() => <F6_5_1_3CreatecommitteeScoringSummary />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateCommitteeScoringSummary value={row.original} />
                        <FeatDeleteCommitteeScoringSummary id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_5_1_3CommitteeScoringSummary[] = [
    {
        decisionNumber: "QT-1234",
        code: "DT00001",
        topicName: "Đổi mới giáo dục đại học",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        point: 80,
        comment: "Giỏi"
    },

];