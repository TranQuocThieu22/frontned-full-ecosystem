'use client';
import MyActionIconUpload from "@/components/ActionIcons/ActionIconUpload/MyActionIconUpload";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Checkbox, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";


export interface I6_2_4 {
    id: number; // Unique identifier
    researchNumber: string; // Research project number
    researchName: string; // Research project name
    field: string; // Research field
    groupName: string; // Research group name
    leader: string; // Research group leader
    estimateCost: string; // Estimated cost
    estimateTime: string; // Estimated time
    file: string; // Path to the registration file
    completed?: boolean;
}


export default function F6_2_4Read() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_4[]>({
        queryKey: ["F6_2_4Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_4>[]>(() => [
        { header: "Mã Đề tài", accessorKey: "researchNumber" },
        { header: "Tên đề tài", accessorKey: "researchName", size: 200 },
        { header: "Lĩnh vực", accessorKey: "field" },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 250 },
        { header: "Trưởng nhóm", accessorKey: "leader", size: 200 },
        { header: "Kinh phí dự kiến", accessorKey: "estimateCost", size: 230 },
        { header: "Thời gian dự kiến", accessorKey: "estimateTime", size: 230 },
        {
            mantineTableBodyCellProps: {
                align: 'center',
            },
            header: "File thuyết minh",
            accessorKey: "file",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230
        },
        {
            header: "Thực hiện",
            accessorKey: "completed",
            Cell: ({ cell }) => {
                const index = cell.row.index;
                return (
                    <Checkbox
                        onChange={() => { }}
                        checked={data[index]?.completed}
                    />
                );
            },
        },
        {
            mantineTableBodyCellProps: {
                align: 'center',
            },
            header: "File thuyết minh hoàn thiện",
            accessorKey: "fileHT",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230
        },
        {
            mantineTableBodyCellProps: {
                align: 'center',
            },
            header: "Cập nhật thuyết minh hoàn thiện",
            accessorKey: "fileTMHT",
            Cell: ({ cell }) => {
                return <MyActionIconUpload />
            },
            size: 230
        },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách đề tài đã đăng ký của Nhóm nghiên cứu</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
            />
        </MyFlexColumn>
    );
}

const data: I6_2_4[] = [
    {
        "id": 1,
        "researchNumber": "RS001",
        "researchName": "Nghiên cứu AI trong Giáo dục",
        "field": "Khoa học máy tính",
        "groupName": "Nhóm nghiên cứu AI",
        "leader": "Nguyen Van A",
        "estimateCost": "500,000,000 VND",
        "estimateTime": "12 tháng",
        "file": "file_1.pdf",
        "completed": true
    },
    {
        "id": 2,
        "researchNumber": "RS002",
        "researchName": "Nghiên cứu Blockchain trong Y học",
        "field": "Công nghệ thông tin",
        "groupName": "Nhóm nghiên cứu Blockchain",
        "leader": "Le Thi B",
        "estimateCost": "300,000,000 VND",
        "estimateTime": "18 tháng",
        "file": "file_2.pdf",
        "completed": false
    },
    {
        "id": 3,
        "researchNumber": "RS003",
        "researchName": "Nghiên cứu IoT trong Công nghệ thông tin",
        "field": "Công nghệ sinh học",
        "groupName": "Nhóm nghiên cứu IoT",
        "leader": "Tran Van C",
        "estimateCost": "600,000,000 VND",
        "estimateTime": "24 tháng",
        "file": "file_3.pdf",
        "completed": true
    },
    {
        "id": 4,
        "researchNumber": "RS004",
        "researchName": "Nghiên cứu Big Data trong Giáo dục",
        "field": "Y học",
        "groupName": "Nhóm nghiên cứu Big Data",
        "leader": "Nguyen Van A",
        "estimateCost": "800,000,000 VND",
        "estimateTime": "15 tháng",
        "file": "file_4.pdf",
        "completed": false
    },
    {
        "id": 5,
        "researchNumber": "RS005",
        "researchName": "Nghiên cứu Cyber Security trong Công nghệ thông tin",
        "field": "Giáo dục",
        "groupName": "Nhóm nghiên cứu Cyber Security",
        "leader": "Hoang Van D",
        "estimateCost": "700,000,000 VND",
        "estimateTime": "20 tháng",
        "file": "file_5.pdf",
        "completed": true
    }
]