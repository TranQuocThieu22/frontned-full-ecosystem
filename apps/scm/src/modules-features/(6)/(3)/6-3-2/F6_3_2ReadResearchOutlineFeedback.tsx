'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I6_3_2ResearchOutlineFeedback {
    id?: number;
    code?: string;
    topicName?: string;
    field?: string;
    groupName?: string;
    leaderName?: string;
    telLeader?: string;
    budget?: string
    time?: string;
}

export default function F6_3_2ReadResearchOutlineFeedback() {
    const query = useQuery<I6_3_2ResearchOutlineFeedback[]>({
        queryKey: ["F6_3_2ReadResearchOutlineFeedback"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_2ResearchOutlineFeedback>[]>(
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
                header: "Lĩnh vực",
                accessorKey: "field"
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
                header: "Kinh phí",
                accessorKey: "budget"
            },
            {
                header: "Thời gian",
                accessorKey: "time"
            },
            {
                header: "File thuyết minh",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />


            },
            {
                header: "Duyệt",
                accessorFn: () =>
                    <Checkbox />


            },
            {
                header: "File thuyết minh hoàn thiện cấp trường",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            },
            {
                header: "Cập nhập thuyết minh cấp trường",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />


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

        />
    )
}

const data: I6_3_2ResearchOutlineFeedback[] = [
    {
        code: "DT00001",
        topicName: "Đổi mới phương pháp giáo dục",
        field: "Khoa học tự nhiên",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        telLeader: "0978563584",
        budget: "115000000",
        time: "11 tháng"
    },

];