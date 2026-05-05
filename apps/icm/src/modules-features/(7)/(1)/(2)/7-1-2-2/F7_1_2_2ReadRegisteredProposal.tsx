'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import F7_1_2_2CreateProposal from "./F7_1_2_2CreateProposal";
import F7_1_2_2DeleteProposal from "./F7_1_2_2DeleteProposal";
import F7_1_2_2UpdateProposal from "./F7_1_2_2UpdateProposal";

interface I7_1_2_2ProposalDetails {
    id: number;
    researchName: string;
    field: string;
    studentName: string;
    department: string;
    class: string;
    estimateCost?: string;
    estimateTime?: string;
    addFile?: string;
}

export default function F7_1_2_2ReadRegisteredProposal() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_1_2_2ProposalDetails[]>({
        queryKey: ["F7_1_2_2ReadRegisteredProposal"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_1_2_2ProposalDetails>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "researchName"
            },
            {
                header: "Lĩnh vực",
                accessorKey: "field"
            },
            {
                header: "Sinh viên đăng ký",
                accessorKey: "studentName"
            },
            {
                header: "Khoa",
                accessorKey: "department"
            },
            {
                header: "Lớp",
                accessorKey: "class"
            },
            {
                header: "Kinh phí dự kiến",
                accessorKey: "estimateCost"
            },
            {
                header: "Thời gian dự kiến",
                accessorKey: "estimateTime"
            },
            {
                header: "File Đăng ký",
                accessorKey: "addFile",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
            },

        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách đăng ký đề xuất định hướng </Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_1_2_2CreateProposal />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_1_2_2UpdateProposal values={row.original} />
                            <F7_1_2_2DeleteProposal id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_1_2_2ProposalDetails[] = [
    {
        id: 1,
        researchName: "Nghiên cứu trí tuệ nhân tạo trong giáo dục",
        field: "Công nghệ thông tin",
        studentName: "Nguyen Van A",
        department: "Công nghệ thông tin",
        class: "CNTT01",
        estimateCost: "10,000,000 VND",
        estimateTime: "6 tháng",
        addFile: "proposal1.pdf",
    },
    {
        id: 2,
        researchName: "Ứng dụng blockchain trong quản lý tài sản",
        field: "Công nghệ thông tin",
        studentName: "Le Thi B",
        department: "Khoa học máy tính",
        class: "KHMT02",
        estimateCost: "12,000,000 VND",
        estimateTime: "9 tháng",
        addFile: "proposal2.pdf",
    },
    {
        id: 3,
        researchName: "Nghiên cứu về tác động của ô nhiễm môi trường",
        field: "Môi trường",
        studentName: "Tran Van C",
        department: "Khoa học môi trường",
        class: "KHMT03",
        estimateCost: "8,000,000 VND",
        estimateTime: "4 tháng",
        addFile: "proposal3.pdf",
    },
    {
        id: 4,
        researchName: "Phát triển ứng dụng học trực tuyến",
        field: "Công nghệ thông tin",
        studentName: "Pham Thi D",
        department: "Kỹ thuật phần mềm",
        class: "KTPM01",
        estimateCost: "15,000,000 VND",
        estimateTime: "12 tháng",
        addFile: "proposal4.pdf",
    },
    {
        id: 5,
        researchName: "Phân tích dữ liệu lớn trong marketing",
        field: "Kinh tế",
        studentName: "Nguyen Thi E",
        department: "Quản trị kinh doanh",
        class: "QTKD02",
        estimateCost: "20,000,000 VND",
        estimateTime: "8 tháng",
        addFile: "proposal5.pdf",
    },
];