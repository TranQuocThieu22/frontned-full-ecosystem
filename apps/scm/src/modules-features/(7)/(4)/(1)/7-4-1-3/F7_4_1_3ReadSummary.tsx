'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_4_1_3CreateSummary from "./F7_4_1_3CreateSummary";
import F7_4_1_3DeleteGrading from "./F7_4_1_3DeleteSummary";
import F7_4_1_3UpdateGrading from "./F7_4_1_3UpdateSummary";


export interface I7_4_1_3Summary {
    id: number;
    decisionNumber?: string;
    researchNumber?: string;
    reseacrhName?: string;
    headOfDepartment?: string;
    advisor?: string;
    averageMark?: string;
    comment?: string;
    file: string;
}

export default function F7_4_1_3ReadSummary() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_4_1_3Summary[]>({
        queryKey: ["F7_4_1_3ReadSummary"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_4_1_3Summary>[]>(
        () => [
            {
                header: "Số quyết định hội đồng xét duyệt đề tài",
                accessorKey: "decisionNumber", // Maps to 'decisionNumber' field in the interface
            },
            {
                header: "Mã đề tài",
                accessorKey: "researchNumber", // Maps to 'researchNumber' field in the interface
            },
            {
                header: "Tên đề tài",
                accessorKey: "reseacrhName", // Maps to 'reseacrhName' field in the interface
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "headOfDepartment", // Maps to 'headOfDepartment' field in the interface
            },
            {
                header: "Cố vấn",
                accessorKey: "advisor", // Maps to 'advisor' field in the interface
            },
            {
                header: "Điểm trung bình",
                accessorKey: "averageMark", // Maps to 'averageMark' field in the interface
            },
            {
                header: "Đánh giá",
                accessorKey: "comment", // Maps to 'comment' field in the interface
            },
            {
                header: "File biên bản",
                accessorKey: "file", // Maps to 'file' field in the interface
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách biên bản tổng hợp kiếm phiếu đánh giá</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_4_1_3CreateSummary />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_4_1_3UpdateGrading values={row.original} />
                            <F7_4_1_3DeleteGrading id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_4_1_3Summary[] = [
    {
        id: 1,
        decisionNumber: "DCN001",
        researchNumber: "RN001",
        reseacrhName: "Nghiên cứu về Trí tuệ Nhân tạo trong Y tế",
        headOfDepartment: "Nguyễn Văn A",
        advisor: "Lê Thị B",
        averageMark: "85",
        comment: "Nội dung nghiên cứu tốt, cần bổ sung thêm số liệu thực nghiệm.",
        file: "grading_ai_healthcare_updated.pdf", // Updated file name
    },
    {
        id: 2,
        decisionNumber: "DCN002",
        researchNumber: "RN002",
        reseacrhName: "Ứng dụng Blockchain trong Quản lý Chuỗi Cung Ứng",
        headOfDepartment: "Trần Thị C",
        advisor: "Nguyễn Văn D",
        averageMark: "90",
        comment: "Rất tốt, có tính ứng dụng cao. Đề nghị mở rộng nghiên cứu trong thực tế.",
        file: "grading_blockchain_supplychain_updated.pdf", // Updated file name
    },
    {
        id: 3,
        decisionNumber: "DCN003",
        researchNumber: "RN003",
        reseacrhName: "Phân tích Dữ liệu lớn trong Marketing",
        headOfDepartment: "Phạm Minh E",
        advisor: "Hoàng Thị F",
        averageMark: "88",
        comment: "Bài nghiên cứu xuất sắc, đề nghị công bố trên các tạp chí uy tín. Xem xét bổ sung phần kết luận.",
        file: "grading_bigdata_marketing_updated.pdf", // Updated file name
    },
];
