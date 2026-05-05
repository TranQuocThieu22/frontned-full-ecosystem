'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_3_1_2CreateMemberScorecard from "./F6_3_1_2CreateMemberScorecard";
import DeleteMemberScorecard from './F6_3_1_2DeleteMemberScorecard';
import UpdateMemberScorecard from './F6_3_1_2UpdateMemberScorecard';

export interface I6_3_1_2MemberScorecard {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    reviewer?: string;
    evaluationDate?: string;
    totalPoint?: number;
    comment?: string;

}

export default function F6_3_1_2ReadMemberScorecard() {
    const query = useQuery<I6_3_1_2MemberScorecard[]>({
        queryKey: ["F6_3_1_2ReadMemberScorecard"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_1_2MemberScorecard>[]>(
        () => [
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
                header: "Người đánh giá",
                accessorKey: "reviewer"
            },
            {
                header: "Ngày đánh giá",
                accessorKey: "evaluationDate"
            },
            {
                header: "Tổng điểm",
                accessorKey: "totalPoint"
            },
            {
                header: "Nhận xét",
                accessorKey: "comment"
            },
            {
                header: "File đánh giá",
                accessorFn: () =>
                    <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            }
        ],
        []
    );
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F6_3_1_2CreateMemberScorecard />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <UpdateMemberScorecard values={row.original} />
                        <DeleteMemberScorecard id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const data: I6_3_1_2MemberScorecard[] = [
    {
        code: "DT0001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        reviewer: "Nguyễn Văn B",
        evaluationDate: "01/01/2024",
        totalPoint: 80,
        comment: ""
    },

];