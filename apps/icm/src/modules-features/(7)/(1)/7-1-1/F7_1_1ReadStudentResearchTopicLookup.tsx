'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I7_1_1StudentResearchTopicLookup {
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    class?: string; // Lớp
    unit?: string; // Khoa
    adviser?: string; // Cố vấn
    levelTopic?: string; // Cấp đề tài
    topicType?: string; // Loại đề tài
    startTime?: string; // Thời gian bắt đầu
    endTime?: string; // Thời gian kết thúc
    budget?: number; // Kinh phí
    resource?: string; // Nguồn kinh phí
    status?: string; // Trạng thái
}

export default function F7_1_1ReadStudentResearchTopicLookup() {
    const query = useQuery<I7_1_1StudentResearchTopicLookup[]>({
        queryKey: ["F7_1_1ReadStudentResearchTopicLookup"],
        queryFn: async () => data
    });

    const columns = useMemo<MRT_ColumnDef<I7_1_1StudentResearchTopicLookup>[]>(() => [
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
            header: "Cấp đề tài",
            accessorKey: "levelTopic",
        },
        {
            header: "Loại đề tài",
            accessorKey: "topicType",
        },
        {
            header: "Thời gian bắt đầu",
            accessorKey: "startTime",
        },
        {
            header: "Thời gian kết thúc",
            accessorKey: "endTime",
        },
        {
            header: "Kinh phí",
            accessorKey: "budget",
        },
        {
            header: "Nguồn kinh phí",
            accessorKey: "resource",
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
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

const data: I7_1_1StudentResearchTopicLookup[] = [
    {
        code: "DT0001",
        topicName: "Nâng cao chất lượng dạy học",
        leaderName: "Nguyễn Văn A",
        class: "IT18001",
        unit: "Công nghệ thông tin",
        adviser: "Nguyễn Văn E",
        levelTopic: "Trường",
        topicType: "Sáng tạo khoa học",
        startTime: "01/01/2023",
        endTime: "30/11/2023",
        budget: 16222000,
        resource: "Trường cấp",
        status: "Đã thanh lý",
    },
];
