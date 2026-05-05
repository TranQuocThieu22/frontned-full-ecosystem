'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_2_1Create from "./F6_2_1Create";
import F6_2_1Delete from "./F6_2_1Delete";
import F6_2_1Update from "./F6_2_1Update";


export interface I6_2_1 {
    id: number; // Unique identifier
    researchNumber: string; // Research project number
    researchName: string; // Research project name
    field: string; // Research field
    groupName: string; // Research group name
    leader: string; // Research group leader
    phoneNumber: string; // Leader's phone number
    email: string; // Leader's email
    estimateCost: string; // Estimated cost
    estimateTime: string; // Estimated time
    file: string; // Path to the registration file
}
export default function F6_2_1Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_1[]>({
        queryKey: ["F6_2_1Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_1>[]>(() => [
        { header: "Mã đề tài", accessorKey: "researchNumber" },
        { header: "Tên đề tài", accessorKey: "researchName", size: 200 },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 250 },
        { header: "Trưởng nhóm", accessorKey: "leader", size: 200 },
        { header: "Số điện thoại", accessorKey: "phoneNumber", size: 200 },
        { header: "Email", accessorKey: "email" },
        { header: "Kinh phí dự kiến", accessorKey: "estimateCost", size: 230 },
        { header: "Thời gian dự kiến", accessorKey: "estimateTime", size: 230 },
        {
            mantineTableBodyCellProps: {
                align: 'center',
            },
            header: "File đăng ký",
            accessorKey: "file",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230
        }
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách thù lao đã thanh toán</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_2_1Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_2_1Update values={row.original as any} />
                        <F6_2_1Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_2_1[] = [
    {
        id: 1,
        researchNumber: "RS001",
        researchName: "Nghiên cứu AI trong giáo dục",
        field: "Khoa học máy tính",
        groupName: "Nhóm nghiên cứu AI",
        leader: "Nguyen Van A",
        phoneNumber: "0123456789",
        email: "nguyenvana@example.com",
        estimateCost: "500,000,000 VND",
        estimateTime: "12 tháng",
        file: "ai_research.pdf",
    },
    {
        id: 2,
        researchNumber: "RS002",
        researchName: "Blockchain trong chuỗi cung ứng",
        field: "Công nghệ thông tin",
        groupName: "Nhóm nghiên cứu Blockchain",
        leader: "Le Thi B",
        phoneNumber: "0987654321",
        email: "lethib@example.com",
        estimateCost: "750,000,000 VND",
        estimateTime: "18 tháng",
        file: "blockchain_research.pdf",
    },
    {
        id: 3,
        researchNumber: "RS003",
        researchName: "Công nghệ sinh học trong y học",
        field: "Công nghệ sinh học",
        groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Tran Van C",
        phoneNumber: "0345678912",
        email: "tranvanc@example.com",
        estimateCost: "1,000,000,000 VND",
        estimateTime: "24 tháng",
        file: "biotech_research.pdf",
    },
];