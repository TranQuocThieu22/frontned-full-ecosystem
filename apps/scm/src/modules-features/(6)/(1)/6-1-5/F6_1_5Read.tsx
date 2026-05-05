'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";



export interface I6_1_5 {
    id: number; // Unique identifier
    name: string; // Research group name (accessorKey: "name")
    leader: string; // Group leader name (accessorKey: "leader")
    level: string; // Academic rank (accessorKey: "level")
    field: string; // Research field (accessorKey: "field")
    signUpFile: string; // Path to the sign-up file (accessorKey: "signUpFile")
    file: string; // Path to the explanation file (accessorKey: "file")
    qualify: string; // Evaluation result (accessorKey: "qualify")
    comment: string; // Conclusion or comments (accessorKey: "comment")
}
export default function F6_1_5Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_5[]>({
        queryKey: ["F6_1_5Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_5>[]>(() => [
        { header: "Tên nhóm nghiên cứu", accessorKey: "name", size: 250 },
                        { header: "Trưởng nhóm", accessorKey: "leader", size: 200 },
                        { header: "Học hàm - Học vị", accessorKey: "level", size: 230 },
                        { header: "Lĩnh vực hoạt động", accessorKey: "field", size: 230 },
                        {
                            header: "Đơn đăng ký",
                            accessorKey: "signUpFile",
                            Cell: ({ cell }) => {
                                return <MyButtonViewPDF />;
                            },
                            size: 200
                        },
                        {
                            header: "Thuyết minh nhóm",
                            accessorKey: "file",
                            Cell: ({ cell }) => {
                                return <MyButtonViewPDF />;
                            },
                            size: 230
                        },
                        { header: "Đánh giá", accessorKey: "qualify" },
                        { header: "Kết luận", accessorKey: "comment" },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách đăng ký nhóm nghiên cứu</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
            />
        </MyFlexColumn>
    );
}

const data: I6_1_5[] = [
    {
        id: 1,
        name: "Nhóm nghiên cứu AI",
        leader: "Nguyen Van A",
        level: "PGS, TS",
        field: "Khoa học Máy tính",
        signUpFile: "ai_signup.pdf",
        file: "ai_explanation.pdf",
        qualify: "Đạt yêu cầu",
        comment: "Hội đồng đã phê duyệt đề tài với điểm cao.",
    },
    {
        id: 2,
        name: "Nhóm nghiên cứu Blockchain",
        leader: "Le Thi B",
        level: "GS, TS",
        field: "Công nghệ thông tin",
        signUpFile: "blockchain_signup.pdf",
        file: "blockchain_explanation.pdf",
        qualify: "Đạt yêu cầu",
        comment: "Đề tài cần bổ sung tài liệu chi tiết.",
    },
    {
        id: 3,
        name: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Tran Van C",
        level: "TS",
        field: "Công nghệ Sinh học",
        signUpFile: "biotech_signup.pdf",
        file: "biotech_explanation.pdf",
        qualify: "Không đạt yêu cầu",
        comment: "Đề tài chưa đủ điều kiện triển khai.",
    },
];