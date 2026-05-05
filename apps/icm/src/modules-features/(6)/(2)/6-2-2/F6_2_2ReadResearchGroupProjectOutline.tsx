'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatUpdateResearchGroupProjectOutline from './F6_2_2UpdateResearchGroupProjectOutline';

export interface I6_2_2ResearchGroupProjectOutline {
    id?: number;
    code?: string;
    topicName?: string;
    field?: string;
    groupName?: string;
    leaderName?: string;
    telephone?: string;
    email?: string;
    expense?: number;
    time?: string;

}

export default function F6_2_2ReadResearchGroupProjectOutline() {
    const query = useQuery<I6_2_2ResearchGroupProjectOutline[]>({
        queryKey: ["F6_2_2ReadResearchGroupProjectOutline"],
        queryFn: async () => data
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_2ResearchGroupProjectOutline>[]>(() => [
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
            header: "Số điện thoại",
            accessorKey: "telephone"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Kinh phí dự kiến",
            accessorKey: "expense"
        },
        {
            header: "Thời gian dự kiến",
            accessorKey: "time"
        },
        {
            header: "File thuyết minh",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }
    ], []);

    if (query.isLoading) return "Loading...";
    if (query.isError) return "Error!";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateResearchGroupProjectOutline values={row.original} />

                    </MyCenterFull>
                );
            }}
        />
    );
}

const data: I6_2_2ResearchGroupProjectOutline[] = [
    {
        code: "DT002",
        topicName: "Đổi mới phương pháp giáo dục",
        field: "Khoa học tự nhiên",
        groupName: "Nhóm A KHTN",
        leaderName: 'Nguyễn Văn A',
        telephone: '0986954853',
        email: "A@gmail.com",
        expense: 115000000,
        time: '11 tháng'
    },
];
