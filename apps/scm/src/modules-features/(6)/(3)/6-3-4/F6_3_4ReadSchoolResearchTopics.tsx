'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I6_3_4SchoolResearchTopics {
    id?: number;
    topicName?: string;
    field?: string;
    leaderName?: string;
    collaborationUnit?: string
    budget?: string
    time?: string;
    point?: number
}

export default function F6_3_4ReadSchoolResearchTopics() {
    const query = useQuery<I6_3_4SchoolResearchTopics[]>({
        queryKey: ["F6_3_2ReadResearchOutlineFeedback"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_4SchoolResearchTopics>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "topicName"
            },
            {
                header: "Lĩnh vực",
                accessorKey: "field"
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "leaderName"
            },
            {
                header: "Đơn vị cộng tác",
                accessorKey: "collaborationUnit"
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
                header: "Điểm trung bình",
                accessorKey: "point"
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

const data: I6_3_4SchoolResearchTopics[] = [
    {
        topicName: "Đổi mới phương pháp giáo dục",
        field: "Khoa học tự nhiên",
        leaderName: "Nguyễn Văn A",
        collaborationUnit: "Khoa Tự nhiên",
        budget: "115000000",
        time: "11 tháng",
        point: 80
    },

];