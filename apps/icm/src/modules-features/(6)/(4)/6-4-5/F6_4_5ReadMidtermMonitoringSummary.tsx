'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I6_4_5MidtermMonitoringSummary {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    telLeader?: string;
    startTime?: string;
    endTime?: string;
    budget?: number;
    reportStatus?: string;
    deadline?: string;
    comment?: string;
    executionStatus?: string;
}

export default function F6_4_5ReadMidtermMonitoringSummary() {
    const query = useQuery<I6_4_5MidtermMonitoringSummary[]>({
        queryKey: ["F6_3_2ReadResearchOutlineFeedback"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_4_5MidtermMonitoringSummary>[]>(
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
                header: "Số điện thoại trưởng nhóm",
                accessorKey: "telLeader"
            },
            {
                header: "Thời gian bắt đầu",
                accessorKey: "startTime"
            },
            {
                header: "Thời gian kết thúc",
                accessorKey: "endTime"
            },
            {
                header: "Kinh phí",
                accessorKey: "budget"
            },
            {
                header: "Trạng thái báo cáo",
                accessorKey: "reportStatus"
            },
            {
                header: "Đến ngày báo cáo",
                accessorKey: "deadline"
            },
            {
                header: "File báo cáo tiến độ",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            },
            {
                header: "Đồng ý",
                accessorFn: () =>
                    <Checkbox />
            },
            {
                header: "Nhận xét",
                accessorKey: "comment"
            },
            {
                header: "Trạng thái thực hiện",
                accessorKey: "executionStatus"
            },
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    )
}

const data: I6_4_5MidtermMonitoringSummary[] = [
    {
        code: "DT0001",
        topicName: "Nâng cao chất lượng dạy học",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        telLeader: "0986546523",
        startTime: "30/11/2023",
        endTime: "",
        budget: 56222000,
        reportStatus: "Còn hạn/ Đã báo cáo/ Trễ hạn",
        deadline: "Còn 35 ngày",
        comment: "Đúng tiến độ",
        executionStatus: "Đang thực hiện/ Đã thanh lý/ Trễ hạn / Gia hạn"
    },

];