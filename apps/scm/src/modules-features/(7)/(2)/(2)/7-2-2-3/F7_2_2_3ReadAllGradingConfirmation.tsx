'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_2_2_3CreateGradingConfirmation from "./F7_2_2_3CreateGradingConfirmation";
import F7_2_2_3DeleteGradingConfirmation from "./F7_2_2_3DeleteGradingConfirmation";
import F7_2_2_3UpdateGradingConfirmation from "./F7_2_2_3UpdateGradingConfirmation";


export interface F7_2_2_3GradingConfirmation {
    id: number;
    decisionNumber?: string;
    reseacrhNumber?: string;
    reseacrhName?: string;
    headOfDepartment?: string;
    averageMark?: string;
    headOfConfirmation?: string;
    numberOfMember?: string;
    file: string;
}

export default function F7_2_2_3ReadAllGradingConfirmation() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<F7_2_2_3GradingConfirmation[]>({
        queryKey: ["F7_2_2_1ReadAllGradingConfirmation"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<F7_2_2_3GradingConfirmation>[]>(
        () => [
            {
                header: "Số quyết định hội đồng xét duyệt đề cương",
                accessorKey: "decisionNumber", // Matches 'decisionNumber' field in the interface
            },
            {
                header: "Mã đề tài",
                accessorKey: "reseacrhNumber", // Matches 'reseacrhNumber' field in the interface
            },
            {
                header: "Tên đề tài",
                accessorKey: "reseacrhName", // Matches 'reseacrhName' field in the interface
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "headOfDepartment", // Matches 'headOfDepartment' field in the interface
            },
            {
                header: "Điểm trung bình",
                accessorKey: "averageMark", // Matches 'totalMark' field in the interface
            },
            {
                header: "Trưởng ban kiểm phiếu",
                accessorKey: "headOfConfirmation", // Matches 'headOfConfirmation' field in the interface
            },
            {
                header: "Số lượng thành viên",
                accessorKey: "numberOfMember",
            },
            {
                header: "File biên bản",
                accessorKey: "file", // Matches 'file' field in the interface
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
            <Text>Danh sách biên bản tổng hợp kiểm phiếu đánh giá</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_2_2_3CreateGradingConfirmation />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_2_2_3UpdateGradingConfirmation values={row.original} />
                            <F7_2_2_3DeleteGradingConfirmation id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}


const data: F7_2_2_3GradingConfirmation[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        reseacrhNumber: "RS001", // Research code
        reseacrhName: "Nghiên cứu A",
        headOfDepartment: "Nguyễn Văn A",
        averageMark: "8.5",
        headOfConfirmation: "Trần Minh B",
        numberOfMember: "5",
        file: "grading_confirmation1.pdf", // File name for the confirmation document
    },
    {
        id: 2,
        decisionNumber: "QD002",
        reseacrhNumber: "RS002", // Research code
        reseacrhName: "Nghiên cứu B",
        headOfDepartment: "Lê Thị C",
        averageMark: "7.8",
        headOfConfirmation: "Phan Thanh D",
        numberOfMember: "4",
        file: "grading_confirmation2.pdf", // File name for the confirmation document
    },
    {
        id: 3,
        decisionNumber: "QD003",
        reseacrhNumber: "RS003", // Research code
        reseacrhName: "Nghiên cứu C",
        headOfDepartment: "Hoàng Văn E",
        averageMark: "9.2",
        headOfConfirmation: "Nguyễn Thị F",
        numberOfMember: "6",
        file: "grading_confirmation3.pdf", // File name for the confirmation document
    },
];