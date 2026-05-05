'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_2_1DeleteResearchGroupTopicRegistration from "./F6_2_1DeleteResearchGroupTopicRegistration";
import F6_2_1UpdateResearchGroupTopicRegistration from "./F6_2_1UpdateResearchGroupTopicRegistration";
export interface IResearchGroupTopicRegistration {
    id?: number
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    field?: string; // Lĩnh vực
    groupName?: string; // Tên nhóm nghiên cứu
    leaderName?: string; // Trưởng nhóm
    telephone?: string; // Số điện thoại
    email?: string; // Email
    expense?: number; // Kinh phí dự kiến
    time?: string; // Thời gian dự kiến
}

export default function F6_2_1ReadResearchGroupTopicRegistration() {
    const query = useQuery<IResearchGroupTopicRegistration[]>({
        queryKey: ["F6_2_1ReadResearchGroupTopicRegistration"],
        queryFn: async () => data
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
            header: "Trưởng nhóm",
            accessorKey: "leaderName",
        },
        {
            header: "Số điện thoại",
            accessorKey: "telephone",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Kinh phí dự kiến (VND)",
            accessorKey: "expense",
            Cell: ({ cell }) => new Intl.NumberFormat("vi-VN").format(cell.getValue<number>()), // Hiển thị kinh phí theo định dạng tiền tệ Việt Nam
        },
        {
            header: "Thời gian dự kiến",
            accessorKey: "time",
        },
        {
            header: "File đăng ký",
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
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F6_2_1UpdateResearchGroupTopicRegistration values={row.original} />
                        <F6_2_1DeleteResearchGroupTopicRegistration id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

const data: IResearchGroupTopicRegistration[] = [
    {
        code: "DT002",
        topicName: "Đổi mới phương pháp giáo dục",
        field: "Khoa học tự nhiên",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        telephone: "0986954853",
        email: "A@example.com",
        expense: 115000000,
        time: "11 tháng",
    },
];
