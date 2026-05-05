'use client';
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, FileInput, Group, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";


export interface I6_2_6 {
    id: number; // Unique identifier
    researchNumber: string; // Research project number
    field: string; // Research field
    groupName: string; // Research group name
    leader: string; // Research group leader
    estimateCost: string; // Estimated cost
    estimateTime: string; // Estimated time
    file: string; // Path to the registration file
    completed?: boolean;
    fileTT?: string;
    average?: number;
}


export default function F6_2_6Read() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_6[]>({
        queryKey: ["F6_2_4Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_6>[]>(() => [
        { header: "Tên đề tài", accessorKey: "researchNumber" },
                    { header: "Lĩnh vực", accessorKey: "field", size: 170 },
                    { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 250 },
                    { header: "Trưởng nhóm", accessorKey: "leader", size: 200},
                    { header: "Kinh phí dự kiến", accessorKey: "estimateCost", size: 230 },
                    { header: "Thời gian dự kiến", accessorKey: "estimateTime", size: 230 },
                    { header: "Điểm trung bình xét duyệt đề cương", accessorKey: "average", size: 230 },
                    {
                        header: "Thực hiện",
                        accessorKey: "completed",
                        Cell: ({ cell }) => {
                            return (
                                <Checkbox
                                    checked={cell.row.original.completed || false}
                                    onChange={(event) => console.log(event.currentTarget.checked)}
                                />
                            );
                        },
                    },

                    {
                        header: "File thuyết minh hoàn thiện",
                        accessorKey: "fileTT",
                        Cell: ({ cell }) => {
                            return <MyButtonViewPDF />;
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

const data: I6_2_6[] = [
    {
        "id": 1,
        "researchNumber": "RS001",
        "field": "Khoa học máy tính",
        "groupName": "Nhóm nghiên cứu AI",
        "leader": "Nguyen Van A",
        "estimateCost": "500,000,000 VND",
        "estimateTime": "12 tháng",
        "file": "file_1.pdf",
        "average": 70,
        "completed": true
    },
    {
        "id": 2,
        "researchNumber": "RS002",
        "field": "Công nghệ thông tin",
        "groupName": "Nhóm nghiên cứu Blockchain",
        "leader": "Le Thi B",
        "estimateCost": "300,000,000 VND",
        "estimateTime": "18 tháng",
        "file": "file_2.pdf",
        "average": 70,
        "completed": false
    },
    {
        "id": 3,
        "researchNumber": "RS003",
        "field": "Công nghệ sinh học",
        "groupName": "Nhóm nghiên cứu IoT",
        "leader": "Tran Van C",
        "estimateCost": "600,000,000 VND",
        "estimateTime": "24 tháng",
        "file": "file_3.pdf",
        "average": 90,
        "completed": true
    },
    {
        "id": 4,
        "researchNumber": "RS004",
        "field": "Y học",
        "groupName": "Nhóm nghiên cứu Big Data",
        "leader": "Nguyen Van A",
        "estimateCost": "800,000,000 VND",
        "estimateTime": "15 tháng",
        "file": "file_4.pdf",
        "completed": false,
        "average": 80,

    },
    {
        "id": 5,
        "researchNumber": "RS005",
        "field": "Giáo dục",
        "groupName": "Nhóm nghiên cứu Cyber Security",
        "leader": "Hoang Van D",
        "estimateCost": "700,000,000 VND",
        "estimateTime": "20 tháng",
        "file": "file_5.pdf",
        "completed": true,
        "average": 70,
    }
]