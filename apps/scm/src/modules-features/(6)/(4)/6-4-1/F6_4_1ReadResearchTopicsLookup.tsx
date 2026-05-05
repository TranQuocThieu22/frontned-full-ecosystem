'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox, Fieldset } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_4_1ViewList from "./f6_4_1ViewList";

export interface I6_4_1researchTopicsTracking {
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
    executionStatus?: string;
}

export interface I6_4_1progressReportRequests {
    id?: number;
    sendDate?: string;
    notificationTitle?: string;
}


export default function F6_4_1ReadResarchTopicLookup() {
    const query = useQuery<I6_4_1researchTopicsTracking[]>({
        queryKey: ["F6_4_1ReadF6_4_1ReadResarchTopicLookupd"],
        queryFn: async () => data
    })
    const query1 = useQuery<I6_4_1progressReportRequests[]>({
        queryKey: ["F6_4_1ReadF6_4_1ReadProgress_report_requests"],
        queryFn: async () => data1
    })
    const columns = useMemo<MRT_ColumnDef<I6_4_1researchTopicsTracking>[]>(
        () => [
            {
                header: "Check",
                accessorFn: () =>
                    <Checkbox />
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
                header: "Số điện thoại trưởng nhóm",
                accessorKey: "telLeader"
            },
            {
                header: "Thời gian băt đầu",
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
                header: "Trạng thái thực hiện",
                accessorKey: "executionStatus"
            },
        ],
        []
    )
    const columns1 = useMemo<MRT_ColumnDef<I6_4_1progressReportRequests>[]>(
        () => [
            {
                header: "STT",
                accessorKey: "id"
            },
            {
                header: "Ngày gửi",
                accessorKey: "sendDate"
            },
            {
                header: "Tiêu đề thông báo",
                accessorKey: "notificationTitle"
            },
            {
                header: "Danh sách người nhận",
                accessorFn: () =>
                    <F6_4_1ViewList />
            },
            {
                header: "File đính kèm",
                accessorFn: () =>
                    <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />

            }
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <>
            <Fieldset legend="Danh mục đề tài nhóm nghiên cứu dõi báo cáo">
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                />
            </Fieldset>
            <Fieldset legend="Danh sách thông báo yêu cầu báo cáo tiến độ thực hiện đề tài nghiên cứu khoa học Nhóm nghiên cứu">
                <MyDataTable
                    columns={columns1}
                    data={query1.data!}
                />
            </Fieldset></>

    )
}

const data: I6_4_1researchTopicsTracking[] = [
    {
        code: "DT0001",
        topicName: "Nâng cao chất lượng dạy học",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        telLeader: "0895658754",
        startTime: "01/01/2023",
        endTime: "30/11/2023",
        budget: 56222000,
        reportStatus: "Còn hạn/ Đã báo cáo/ Trễ hạn",
        deadline: "Còn 35 ngày",
        executionStatus: "Đang thực hiện/ Đã thanh lý/ Trẽ hạn/ Gia hạn"
    },

];

const data1: I6_4_1progressReportRequests[] = [
    {
        id: 1,
        sendDate: "01/01/2024",
        notificationTitle: "Thông báo nhóm nghiên cứu báo cáo tiến độ thực hiện đề tài nghiên cứu năm 2024"
    }]
