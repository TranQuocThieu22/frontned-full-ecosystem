'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatUpdateProjectMonitoringResultsSummary from './F5_5_5UpdateProjectMonitoringResultsSummary';

export interface IProjectMonitoringResultsSummary {
    id?: number; // STT
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    leaderTel?: string; // Số điện thoại chủ nhiệm
    beginTime?: string; // Thời gian bắt đầu
    endTime?: string; // Thời gian kết thúc
    expense?: number; // Kinh phí
    statusReport?: string; // Trạng thái báo cáo
    vote?: string; // Duyệt
    comment?: string; // Nhận xét
    statusAct?: string; // Trạng thái thực hiện
}

export default function F5_5_5ReadProjectMonitoringResultsSummary() {
    const query = useQuery<IProjectMonitoringResultsSummary[]>({
        queryKey: [`F5_5_5ReadProjectMonitoringResultsSummary`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT000022",
                topicName: "Nâng cao chất lượng dạy học",
                leaderName: "Nguyễn Văn A",
                leaderTel: "09512312321",
                beginTime: "30/11/2023",
                endTime: "12/12/2024",
                expense: 56222000,
                statusReport: "Còn hạn",
                vote: "Đúng tiến độ",
                comment: "Tốt, nhưng cần cải thiện thêm",
                statusAct: "Đã thanh lý",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IProjectMonitoringResultsSummary>[]>(() => [

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
            header: "Số điện thoại",
            accessorKey: "leaderTel",
        },
        {
            header: "Thời gian bắt đầu",
            accessorKey: "beginTime",
        },
        {
            header: "Thời gian kết thúc",
            accessorKey: "endTime",
        },
        {
            header: "Kinh phí (VNĐ)",
            accessorKey: "expense",
            Cell: ({ cell }) => cell.getValue<number>().toLocaleString("vi-VN"),
        },
        {
            header: "Trạng thái báo cáo",
            accessorKey: "statusReport",
        },
        {
            header: "Đến ngày báo cáo",
            accessorFn: () =>
                <Checkbox />
        },
        {
            header: "Duyệt",
            accessorKey: "vote",
        },
        {
            header: "Nhận xét",
            accessorKey: "comment",
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "statusAct",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateProjectMonitoringResultsSummary values={row.original} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

