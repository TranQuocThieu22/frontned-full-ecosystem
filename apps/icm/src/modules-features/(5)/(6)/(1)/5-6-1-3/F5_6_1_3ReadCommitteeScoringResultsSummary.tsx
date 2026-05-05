'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_6_1_3CreateCommitteeScoringResultsSummary from "./F5_6_1_3CreateCommitteeScoringResultsSummary";
import FeatDeleteCommitteeScoringResultsSummary from './F5_6_1_3DeleteCommitteeScoringResultsSummary';
import FeatUpdateCommitteeScoringResultsSummary from './F5_6_1_3UpdateCommitteeScoringResultsSummary';

export interface I5_6_1_3CommitteeScoringResultsSummary {
    id?: number; // STT
    decisionNumber?: string; // Số quyết định hội đồng xét duyệt đề tài
    topicCode?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    point?: number; // Điểm trung bình
    rank?: string; // Xếp loại
}

export default function ReadTemplate() {
    const query = useQuery<I5_6_1_3CommitteeScoringResultsSummary[]>({
        queryKey: [`ReadI5_6_1_3CommitteeScoringResultsSummary`],
        queryFn: async () => [
            {
                id: 1,
                decisionNumber: "QT-1234",
                topicCode: "DT00001",
                topicName: "Đổi mới giáo dục đại học",
                leaderName: "Nguyễn Văn A",
                point: 80,
                rank: "Giỏi",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_6_1_3CommitteeScoringResultsSummary>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "decisionNumber",
        },
        {
            header: "Mã đề tài",
            accessorKey: "topicCode",
        },
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "point",
        },
        {
            header: "Xếp loại",
            accessorKey: "rank",
        },
        {
            header: "File biên bản",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }

    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F5_6_1_3CreateCommitteeScoringResultsSummary />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateCommitteeScoringResultsSummary values={row.original} />
                        <FeatDeleteCommitteeScoringResultsSummary id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
