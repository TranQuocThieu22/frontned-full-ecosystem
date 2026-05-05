'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_4_4CheckMidtermProgressReview from "./F6_4_4CheckMidtermProgressReview";

export interface I6_4_4MidtermProgressReview {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    time?: string;
    percentage?: string;
    budget?: number;
    comment?: string;
}

export default function F6_4_4ReadMidtermProgressReview() {
    const query = useQuery<I6_4_4MidtermProgressReview[]>({
        queryKey: ["F6_3_2ReadResearchOutlineFeedback"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_4_4MidtermProgressReview>[]>(
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
                header: "Thời gian thực hiện",
                accessorKey: "time"
            },
            {
                header: "% hoàn thành",
                accessorKey: "percentage"
            },
            {
                header: "Kinh phí đã chi",
                accessorKey: "budget"
            },
            {
                header: "File báo cáo",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            },
            {
                header: "Thao tác",
                accessorFn: () =>
                    <F6_4_4CheckMidtermProgressReview />
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

const data: I6_4_4MidtermProgressReview[] = [
    {
        code: "DT00001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        time: "11 tháng",
        percentage: "60%",
        budget: 5000000,
        comment: "Đúng tiến độ"
    },

];