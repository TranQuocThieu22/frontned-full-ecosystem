'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_5_1_2CreateMemberScoringCard from "./F6_5_1_2CreateMemberScoringCard";
import FeatDeleteMemberScoringCard from './F6_5_1_2DeleteMemberScoringCard';
import FeatUpdateMemberScoringCard from './F6_5_1_2UpdateMemberScoringCard';

export interface I6_5_1_2MemberScoringCard {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    reviewer?: string;
    dateReview?: string;
    point?: number;
    comment?: string;
}

export default function F6_5_1_2ReadMemberScoringCard() {
    const query = useQuery<I6_5_1_2MemberScoringCard[]>({
        queryKey: ["F6_5_1_2ReadMemberScoringCard"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_5_1_2MemberScoringCard>[]>(
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
                accessorKey: "dateReview"
            },
            {
                header: "Tổng điểm",
                accessorKey: "point"
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
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F6_5_1_2CreateMemberScoringCard />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateMemberScoringCard values={row.original} />
                        <FeatDeleteMemberScoringCard id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_5_1_2MemberScoringCard[] = [
    {
        code: "DT0001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        reviewer: "Nguyễn Văn B",
        dateReview: "01/01/2024",
        point: 80,
        comment: ""
    },

];