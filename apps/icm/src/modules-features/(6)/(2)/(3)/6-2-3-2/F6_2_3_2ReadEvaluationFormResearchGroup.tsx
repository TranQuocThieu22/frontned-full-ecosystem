'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteEvaluationFormResearch from './F6_2_3_2DeleteEvaluationFormResearchGroup';
import FeatUpdateEvaluationFormResearch from './F6_2_3_2UpdateEvaluationFormResearchGroup';

export interface I6_2_3_2EvaluationFormResearch {
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

export default function F6_2_3_2ReadEvaluationFormResearch() {
    const query = useQuery<I6_2_3_2EvaluationFormResearch[]>({
        queryKey: ["F6_2_3_2ReadEvaluationFormResearch"],
        queryFn: async () => data
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_3_2EvaluationFormResearch>[]>(() => [
        {
            header: "Mã đánh giá",
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
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }
    ], []);

    if (query.isLoading) return "Loading...";
    if (query.isError) return "Error!";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateEvaluationFormResearch values={row.original} />
                        <FeatDeleteEvaluationFormResearch id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

const data: I6_2_3_2EvaluationFormResearch[] = [
    {
        code: "DT001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        reviewer: "Nguyễn Văn B",
        dateReview: "01/01/2024",
        point: 80,
        comment: "Đề tài có giá trị thực tiễn cao."
    },
];
