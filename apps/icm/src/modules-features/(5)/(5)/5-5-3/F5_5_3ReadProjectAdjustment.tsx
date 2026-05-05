'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_5_3CreateProjectAdjustment from "./F5_5_3CreateProjectAdjustment";
import FeatDeleteProjectAdjustment from './F5_5_3DeleteProjectAdjustment';
import FeatUpdateProjectAdjustment from './F5_5_3UpdateProjectAdjustment';

export interface I5_5_3ProjectAdjustment {
    id?: number; // STT
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    time?: string; // Thời gian thực hiện
    percentComplete?: number; // % hoàn thành
    adjustContent?: string; // Điều chỉnh nội dung
    adjustLeader?: string; // Điều chỉnh chủ nhiệm
    adjustTime?: string; // Điều chỉnh thời gian
    adjustProcess?: string; // Điều chỉnh tiến độ
}

export default function F5_5_3ReadProjectAdjustment() {
    const query = useQuery<I5_5_3ProjectAdjustment[]>({
        queryKey: [`F5_5_3ReadProjectAdjustment`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT00001",
                topicName: "Đổi mới phương pháp giáo dục",
                leaderName: "Nguyễn Văn A",
                time: "11 tháng",
                percentComplete: 60,
                adjustContent: "",
                adjustLeader: "",
                adjustTime: "",
                adjustProcess: "",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_5_3ProjectAdjustment>[]>(() => [

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
            accessorKey: "time",
        },
        {
            header: "% Hoàn thành",
            accessorKey: "percentComplete",
            Cell: ({ cell }) => `${cell.getValue<number>()}%`,
        },
        {
            header: "Điều chỉnh nội dung",
            accessorKey: "adjustContent",
        },
        {
            header: "Điều chỉnh chủ nhiệm",
            accessorKey: "adjustLeader",
        },
        {
            header: "Điều chỉnh thời gian",
            accessorKey: "adjustTime",
        },
        {
            header: "Điều chỉnh tiến độ",
            accessorKey: "adjustProcess",
        },
        {
            header: "File điều chỉnh",
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
            renderTopToolbarCustomActions={() => <F5_5_3CreateProjectAdjustment />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateProjectAdjustment values={row.original} />
                        <FeatDeleteProjectAdjustment id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
