'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface IResearchGroupTopicRegistration {
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    field?: string; // Lĩnh vực
    groupName?: string; // Tên nhóm nghiên cứu
    leaderName?: string //Trưởng nhóm
    expense?: number; // Kinh phí dự kiến
    time?: string; // Thời gian dự kiến
}

export default function ReadTemplate() {
    const query = useQuery<IResearchGroupTopicRegistration[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                code: "DT001",
                topicName: "Đổi mới phương pháp giáo dục",
                field: "Khoa học tự nhiên",
                groupName: "Nhóm A KHTN",
                leaderName: "Nguyễn Văn A",
                expense: 115000000,
                time: "11 tháng",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IResearchGroupTopicRegistration>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "field",
        },
        {
            header: "Tên nhóm nghiên cứu",
            accessorKey: "groupName",
        },
        {
            header: "Trưởng nhóm ",
            accessorKey: "leaderName",
        },
        {
            header: "Kinh phí dự kiến ",
            accessorKey: "expense",
            Cell: ({ cell }) => new Intl.NumberFormat("vi-VN").format(cell.getValue<number>()), // Hiển thị kinh phí theo định dạng tiền tệ Việt Nam
        },
        {
            header: "Thời gian dự kiến",
            accessorKey: "time",
        },
        {

            header: "File thuyết minh",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />

        },
        {
            header: "Thực hiện",
            accessorFn: () =>
                <Checkbox />
        },
        {
            header: "File thuyết minh hoàn thiện",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "Cập nhập thuyết mình hoàn thiện",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    );
}
