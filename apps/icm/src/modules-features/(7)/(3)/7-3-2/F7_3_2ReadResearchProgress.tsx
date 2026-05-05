'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_3_2CreateResearchProgress from "./F7_3_2CreateResearchProgress";
import F7_3_2DeleteResearchProgress from "./F7_3_2DeleteResearchProgress";
import F7_3_2UpdateResearchProgress from "./F7_3_2UpdateResearchProgress";

export interface I7_3_2ResearchProgress {
    id: number;
    researchNumber: string;
    researchName: string;
    leader: string;
    advisor: string;
    estimateTime?: string;
    completion?: string;
    editContent?: string;
    editHead?: string;
    editTime?: string
    editProgress?: string
    editFile?: string
}

export default function F7_3_2ReadResearchProgress() {
    const AllUserQuery = useQuery<I7_3_2ResearchProgress[]>({
        queryKey: ["F7_3_2ReadResearchProgress"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_3_2ResearchProgress>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "researchNumber", // Maps to 'researchNumber' field in the interface
        },
        {
            header: "Tên đề tài",
            accessorKey: "researchName", // Maps to 'researchName' field in the interface
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leader", // Maps to 'leader' field in the interface
        },
        {
            header: "Cố vấn",
            accessorKey: "advisor", // Maps to 'advisor' field in the interface
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "estimateTime", // Maps to 'estimateCost' field in the interface
        },
        {
            header: "% hoàn thành",
            accessorKey: "completion", // Maps to 'completion' field in the interface
        },
        {
            header: "Điều chỉnh nội dung",
            accessorKey: "editContent", // Maps to 'editContent' field in the interface
        },
        {
            header: "Điều chỉnh chủ nhiệm",
            accessorKey: "editHead", // Maps to 'editHead' field in the interface
        },
        {
            header: "Điều chỉnh thời gian",
            accessorKey: "editTime", // Maps to 'editTime' field in the interface
        },
        {
            header: "Điều chỉnh tiến độ",
            accessorKey: "editProgress", // Maps to 'editProgress' field in the interface
        },
        {
            header: "File điều chỉnh",
            accessorKey: "editFile", // Maps to 'editFile' field in the interface
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";
    return (
        <MyFlexColumn>
            <Text>Báo cáo tiến độ và kết quả thự hiện đề tài</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_3_2CreateResearchProgress />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_3_2UpdateResearchProgress values={row.original} />
                            <F7_3_2DeleteResearchProgress id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFlexColumn>
    );
}

const data: I7_3_2ResearchProgress[] = [
    {
        id: 1,
        researchNumber: "RN001",
        researchName: "Nghiên cứu AI trong Y tế",
        leader: "Nguyen Van A",
        advisor: "Le Thi B",
        estimateTime: "6 tháng",
        completion: "75%",
        editContent: "Bổ sung phân tích AI",
        editHead: "Nguyen Van C",
        editTime: "2024-07-01",
        editProgress: "Đã hoàn thành phần phân tích dữ liệu",
        editFile: "ai_research_edit.pdf",
    },
    {
        id: 2,
        researchNumber: "RN002",
        researchName: "Ứng dụng Blockchain trong Quản lý",
        leader: "Tran Van D",
        advisor: "Nguyen Thi E",
        estimateTime: "12 tháng",
        completion: "50%",
        editContent: "Thêm các trường hợp sử dụng thực tế",
        editHead: "Tran Van F",
        editTime: "2024-07-15",
        editProgress: "Đang triển khai hợp đồng thông minh",
        editFile: "blockchain_research_edit.pdf",
    },
    {
        id: 3,
        researchNumber: "RN003",
        researchName: "Phân tích dữ liệu lớn trong Marketing",
        leader: "Le Minh G",
        advisor: "Tran Thi H",
        estimateTime: "8 tháng",
        completion: "80%",
        editContent: "Cải thiện trực quan hóa dữ liệu",
        editHead: "Nguyen Van I",
        editTime: "2024-08-10",
        editProgress: "Đã hoàn thiện mô hình dự báo",
        editFile: "data_analysis_edit.pdf",
    },
];