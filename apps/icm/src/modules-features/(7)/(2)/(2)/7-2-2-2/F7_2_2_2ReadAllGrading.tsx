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
import F7_2_2_2CreateGrading from "./F7_2_2_2CreateGrading";
import F7_2_2_2DeleteGrading from "./F7_2_2_2DeleteGrading";
import F7_2_2_2UpdateGrading from "./F7_2_2_2UpdateGrading";


export interface F7_2_2_2Grading {
    promulgateDate: string | number | Date;
    id: number;
    researchName?: string;
    headOfDepartment?: string;
    markerName?: string;
    markingDate?: Date;
    totalMark?: string;
    comment?: string;
    markingFile?: string;
}

export default function F7_2_2_2ReadAllGrading() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<F7_2_2_2Grading[]>({
        queryKey: ["F7_2_2_2ReadAllGrading"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<F7_2_2_2Grading>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "researchName", // Corresponds to 'researchName' in the interface
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "headOfDepartment", // Corresponds to 'headOfDepartment' in the interface
            },
            {
                header: "Người đánh giá",
                accessorKey: "markerName", // Corresponds to 'markerName' in the interface
            },
            {
                header: "Ngày đánh giá",
                accessorKey: "markingDate", // Corresponds to 'markingDate' in the interface
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.markingDate!)),
                size: 100
            },
            {
                header: "Tổng điểm",
                accessorKey: "totalMark",
                size: 100 // Corresponds to 'totalMark' in the interface
            },
            {
                header: "Nhận xét",
                accessorKey: "comment", // Corresponds to 'comment' in the interface
            },
            {
                header: "File đánh giá",
                accessorKey: "markingFile", // Corresponds to 'markingFile' in the interface
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
                size: 70
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách phiếu chấm điểm thành viên hội đồng xét duyệt đề cương </Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_2_2_2CreateGrading />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_2_2_2UpdateGrading values={row.original} />
                            <F7_2_2_2DeleteGrading id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: F7_2_2_2Grading[] = [
    {
        promulgateDate: "2024-12-01",
        id: 1,
        researchName: "Nghiên cứu AI trong y tế",
        headOfDepartment: "Nguyễn Văn A",
        markerName: "Lê Minh B",
        markingDate: new Date("2024-12-10"),
        totalMark: "9.5",
        comment: "Nghiên cứu có ý nghĩa thực tiễn cao, cần bổ sung thêm tài liệu tham khảo.",
        markingFile: "grading1.pdf",
    },
    {
        promulgateDate: "2024-12-05",
        id: 2,
        researchName: "Blockchain trong dịch vụ tài chính",
        headOfDepartment: "Trần Thị C",
        markerName: "Nguyễn Văn D",
        markingDate: new Date("2024-12-12"),
        totalMark: "8.0",
        comment: "Ứng dụng thú vị nhưng cần chi tiết hơn phần triển khai.",
        markingFile: "grading2.pdf",
    },
    {
        promulgateDate: "2024-12-08",
        id: 3,
        researchName: "Ứng dụng thuật toán lượng tử",
        headOfDepartment: "Phạm Văn E",
        markerName: "Hoàng Thị F",
        markingDate: new Date("2024-12-15"),
        totalMark: "8.7",
        comment: "Nghiên cứu sáng tạo, cần cải thiện kết quả thực nghiệm.",
        markingFile: "grading3.pdf",
    },
]; 