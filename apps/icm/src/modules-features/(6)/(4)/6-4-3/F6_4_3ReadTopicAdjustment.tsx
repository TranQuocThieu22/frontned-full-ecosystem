'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_4_3CreateTopicAdjustment from "./F6_4_3CreateTopicAdjustment";
import FeatDeleteTopicAdjustment from './F6_4_3DeleteTopicAdjustment';
import FeatUpdateTopicAdjustment from './F6_4_3UpdateTopicAdjustment';
export interface I6_4_3TopicAdjustment {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    time?: string;
    percentageComplete?: string;
    contentAdjustment?: string;
    leaderAdjustment?: string;
    timeAdjustment?: string;
    progressAdjustment?: string;
}
export default function F6_4_3ReadTopicAdjustment() {
    const query = useQuery<I6_4_3TopicAdjustment[]>({
        queryKey: ["F6_4_3ReadTopicAdjustment"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_4_3TopicAdjustment>[]>(
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
                accessorKey: "percentageComplete"
            },
            {
                header: "Điều chỉnh nội dung",
                accessorKey: "contentAdjustment"
            },
            {
                header: "Điều chỉnh chủ nghiệm",
                accessorKey: "leaderAdjustment"
            },
            {
                header: "Điều chỉnh thời gian",
                accessorKey: "timeAdjustment"
            },
            {
                header: "Điều chỉnh tiến độ",
                accessorKey: "progressAdjustment"
            },
            {
                header: "File điều chỉnh",
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
            renderTopToolbarCustomActions={() => <F6_4_3CreateTopicAdjustment />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateTopicAdjustment values={row.original} />
                        <FeatDeleteTopicAdjustment id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_4_3TopicAdjustment[] = [
    {
        code: "DT00001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        time: "11 tháng",
        percentageComplete: "60%",
        contentAdjustment: "",
        leaderAdjustment: "",
        timeAdjustment: "",
        progressAdjustment: ""
    },

];