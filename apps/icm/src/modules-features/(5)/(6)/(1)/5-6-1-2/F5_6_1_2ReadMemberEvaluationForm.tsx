'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_6_1_2CreateMemberEvaluationForm from "./F5_6_1_2CreateMemberEvaluationForm";
import FeatDeleteMemberEvaluationForm from './F5_6_1_2DeleteMemberEvaluationForm';
import FeatUpdateMemberEvaluationForm from './F5_6_1_2UpdateMemberEvaluationForm';

export interface I5_6_1_2MemberEvaluationForm {
    id?: number; // STT
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    reviewer?: string; // Người đánh giá
    dateReview?: string; // Ngày đánh giá
    point?: number; // Tổng điểm
    comment?: string; // Nhận xét
}

export default function ReadTemplate() {
    const query = useQuery<I5_6_1_2MemberEvaluationForm[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT0001",
                topicName: "Đề tài A",
                leaderName: "QD/KT001",
                reviewer: "Lê Văn A",
                dateReview: "01/01/2000",
                point: 85,
                comment: "Đề tài có tính ứng dụng cao, cần bổ sung thêm tài liệu tham khảo.",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_6_1_2MemberEvaluationForm>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
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
            header: "Người đánh giá",
            accessorKey: "reviewer",
        },
        {
            header: "Ngày đánh giá",
            accessorKey: "dateReview",
            Cell: ({ cell }) => {
                // Chuyển đổi ngày sang định dạng dd/MM/yyyy
                const date = new Date(cell.getValue<string>());
                return date.toLocaleDateString("vi-VN");
            },
        },
        {
            header: "Tổng điểm",
            accessorKey: "point",
        },
        {
            header: "Nhận xét",
            accessorKey: "comment",
        },
        {
            header: "File đánh giá",
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
            renderTopToolbarCustomActions={() => <F5_6_1_2CreateMemberEvaluationForm />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>

                        <FeatUpdateMemberEvaluationForm values={row.original} />
                        <FeatDeleteMemberEvaluationForm id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
