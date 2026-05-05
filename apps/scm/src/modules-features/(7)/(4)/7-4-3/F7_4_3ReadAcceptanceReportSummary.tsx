'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I6_5_3AcceptanceReportSummary {
    topicName?: string; // Tên đề tài
    field?: string; // Lĩnh vực
    leaderName?: string; // Trưởng nhóm
    class?:string;
    unit?: string; // Đơn vị cộng tác
    adviser?:string;
    budget?: number; // Kinh phí
    time?: string; // Thời gian
    point?: number; // Điểm trung bình
    comment?: string; // Đánh giá
}

export default function F6_5_3ReadAcceptanceReportSummary() {
    const query = useQuery<I6_5_3AcceptanceReportSummary[]>({
        queryKey: ["F6_5_3ReadAcceptanceReportSummary"],
        queryFn: async () => data
    });

    const columns = useMemo<MRT_ColumnDef<I6_5_3AcceptanceReportSummary>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "field",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
        },
        {
            header: "Lớp",
            accessorKey: "class",
        },
        {
            header: "Khoa",
            accessorKey: "unit",
        },
        {
            header: "Cố vấn",
            accessorKey: "adviser",
        },
        {
            header: "Kinh phí",
            accessorKey: "budget",
        },
        {
            header: "Thời gian",
            accessorKey: "time",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "point",
        },
        {
            header: "Đánh giá",
            accessorKey: "comment",
        },
        {
            header: "File thuyết minh hoàn thiện",
            accessorFn: () =>
                <MyActionIconViewPDF pdfLink={"https://example.com/sample.pdf"} />,
        },
    ], []);

    if (query.isLoading) return "Loading...";
    if (query.isError) return "Error!";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    );
}

const data: I6_5_3AcceptanceReportSummary[] = [
    {
        topicName: "Đổi mới phương pháp giáo dục",
        field: "Khoa học tự nhiên",
        leaderName: "Nguyễn Văn A",
        class:"IT18001",
        unit: "Khoa Tự nhiên",
        adviser:"Nguyễn Văn B",
        budget: 115000000,
        time: "11 tháng",
        point: 80,
        comment: "Giỏi",
    },
];
