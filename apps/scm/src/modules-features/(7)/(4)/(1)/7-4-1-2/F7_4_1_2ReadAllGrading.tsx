'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_4_1_2CreateGrading from "./F7_4_1_2CreateGrading";
import F7_4_1_2DeleteGrading from "./F7_4_1_2DeleteGrading";
import F7_4_1_2UpdateGrading from "./F7_4_1_2UpdateGrading";



export interface I7_4_1_2Grading {
    promulgateDate: string | number | Date;
    id: number;
    researchNumber?: string;
    reseacrhName?: string;
    headOfDepartment?: string;
    marker?: string;
    markDate?: Date;
    totalMark?: string;
    comment?: string;
    markFile: string;
}

export default function F7_4_1_2ReadAllGrading() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_4_1_2Grading[]>({
        queryKey: ["F7_4_1_1ReadAllDecision"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_4_1_2Grading>[]>(
        () => [
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
                header: "Người đánh giá",
                accessorKey: "marker", // Maps to 'marker' field in the interface
            },
            {
                header: "Ngày đánh giá",
                accessorKey: "markDate", // Maps to 'markDate' field in the interface
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
            },
            {
                header: "Tổng điểm",
                accessorKey: "totalMark", // Maps to 'totalMark' field in the interface
            },
            {
                header: "Nhận xét",
                accessorKey: "comment", // Maps to 'comment' field in the interface
            },
            {
                header: "File đánh giá",
                accessorKey: "markFile", // Maps to 'markFile' field in the interface
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
            <Text>Danh sách phiếu chấm điểm nghiệm thu đề tài</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_4_1_2CreateGrading />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_4_1_2UpdateGrading values={row.original} />
                            <F7_4_1_2DeleteGrading id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_4_1_2Grading[] = [
    {
        id: 1,
        researchNumber: "RN001",
        reseacrhName: "Nghiên cứu về Trí tuệ Nhân tạo trong Y tế",
        headOfDepartment: "Nguyễn Văn A",
        marker: "Lê Thị B",
        markDate: new Date("2024-11-01"),
        totalMark: "85",
        comment: "Nội dung nghiên cứu tốt, cần bổ sung thêm số liệu thực nghiệm.",
        markFile: "grading_ai_healthcare.pdf",
        promulgateDate: new Date("2024-10-25"),
    },
    {
        id: 2,
        researchNumber: "RN002",
        reseacrhName: "Ứng dụng Blockchain trong Quản lý Chuỗi Cung Ứng",
        headOfDepartment: "Trần Thị C",
        marker: "Nguyễn Văn D",
        markDate: new Date("2024-11-05"),
        totalMark: "90",
        comment: "Rất tốt, có tính ứng dụng cao.",
        markFile: "grading_blockchain_supplychain.pdf",
        promulgateDate: new Date("2024-10-30"),
    },
    {
        id: 3,
        researchNumber: "RN003",
        reseacrhName: "Phân tích Dữ liệu lớn trong Marketing",
        headOfDepartment: "Phạm Minh E",
        marker: "Hoàng Thị F",
        markDate: new Date("2024-11-10"),
        totalMark: "88",
        comment: "Bài nghiên cứu xuất sắc, đề nghị công bố trên các tạp chí uy tín.",
        markFile: "grading_bigdata_marketing.pdf",
        promulgateDate: new Date("2024-11-01"),
    },
];