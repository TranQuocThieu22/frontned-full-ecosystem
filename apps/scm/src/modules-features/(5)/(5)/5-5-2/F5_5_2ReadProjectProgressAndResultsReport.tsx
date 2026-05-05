'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_5_2CreateProjectProgressAndResultsReport from "./F5_5_2CreateProjectProgressAndResultsReport";
import FeatDeleteProjectProgressAndResultsReport from './F5_5_2DeleteProjectProgressAndResultsReport';
import FeatUpdateProjectProgressAndResultsReport from './F5_5_2UpdateProjectProgressAndResultsReport';
export interface IF5_5_2ProjectProgressAndResultsReport {
    id?: number; // STT
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    time?: number; // Thời gian thực hiện
    percentComplete?: string; // % hoàn thành
    expenses?: number; // Kinh phí đã chi
}

export default function F5_5_2ReadProjectProgressAndResultsReport() {
    const query = useQuery<IF5_5_2ProjectProgressAndResultsReport[]>({
        queryKey: [`F5_5_2ReadProjectProgressAndResultsReport`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT00001",
                topicName: "Đổi mới phương pháp giáo dục",
                leaderName: "Nguyễn Văn A",
                time: 11,
                percentComplete: "60%",
                expenses: 58000000,
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<IF5_5_2ProjectProgressAndResultsReport>[]>(() => [

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
            header: "Thời gian thực hiện",
            accessorKey: "thoiGianDenhan",
            Cell: ({ cell }) => {
                return <Text>{cell.getValue<number>()} tháng</Text>
            }
        },
        {
            header: "% Hoàn thành",
            accessorKey: "percentComplete",
        },
        {
            header: "Kinh phí đã chi ",
            accessorKey: "expenses",
            Cell: ({ cell }) => {
                const expenses = cell.getValue<number>();
                return expenses.toLocaleString("vi-VN");
            },
        },
        {
            header: "File đính kèm",
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
            renderTopToolbarCustomActions={() => <F5_5_2CreateProjectProgressAndResultsReport />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateProjectProgressAndResultsReport values={row.original} />
                        <FeatDeleteProjectProgressAndResultsReport id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
