'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Text } from "@mantine/core";

import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";

export interface I7_2_5RegisteredResearch {
    researchName?: string;
    field?: string;
    headOfDepartment?: string;
    class?: string;
    department?: string;
    estimateCost?: string;
    estimateTime?: string;
    averageMark?: string;
    agree?: boolean;
    fileCompleted?: string
}

export default function F7_2_5ReadRegisteredResearch() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    const form = useForm<I7_2_5RegisteredResearch>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_5RegisteredResearch[]>({
        queryKey: ["F7_2_5ReadRegisteredResearch"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_5RegisteredResearch>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "researchName", // Maps to 'researchName' field in data
            },
            {
                header: "Lĩnh vực",
                accessorKey: "field", // Maps to 'field' field in data
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "headOfDepartment", // Maps to 'headOfDepartment' field in data
            },
            {
                header: "Lớp",
                accessorKey: "class", // Maps to 'class' field in data
            },
            {
                header: "Khoa",
                accessorKey: "department", // Maps to 'department' field in data
            },
            {
                header: "Kinh phí dự kiến",
                accessorKey: "estimateCost", // Maps to 'estimateCost' field in data
            },
            {
                header: "Thời gian dự kiến",
                accessorKey: "estimateTime", // Maps to 'estimateTime' field in data
            },
            {
                header: "Đồng ý",
                accessorKey: "agree", // Maps to 'agree' field in data
                Cell: ({ cell }) => {
                    return (
                        <Checkbox
                            checked={cell.row.original.agree || false} // Reflects 'agree' status
                            onChange={(event) => console.log(event.currentTarget.checked)} // Placeholder for update logic
                        />
                    );
                },
            },
            {
                header: "File thuyết minh hoàn thiện",
                accessorKey: "fileCompleted", // Maps to 'fileCompleted' field in data
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
            <Text>Danh sách đề tài đã đăng ký </Text>
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data || []}
        />
        </MyFlexColumn>
    )
}

const data: I7_2_5RegisteredResearch[] = [
    {
      researchName: "Nghiên cứu AI trong Giáo dục",
      field: "Công nghệ thông tin",
      headOfDepartment: "Nguyễn Văn A",
      class: "CNTT01",
      department: "Khoa Công nghệ Thông tin",
      estimateCost: "120,000,000 VND",
      estimateTime: "7 tháng",
      averageMark: "8.5",
      agree: true,
      fileCompleted: "AI_GiaoDuc.pdf",
    },
    {
      researchName: "Ứng dụng IoT trong Nông nghiệp",
      field: "Kỹ thuật",
      headOfDepartment: "Lê Thị B",
      class: "KT01",
      department: "Khoa Kỹ thuật",
      estimateCost: "200,000,000 VND",
      estimateTime: "10 tháng",
      averageMark: "9.0",
      agree: true,
      fileCompleted: "IoT_NongNghiep.pdf",
    },
    {
      researchName: "Blockchain trong Chuỗi Cung Ứng",
      field: "Khoa học Máy tính",
      headOfDepartment: "Trần Minh C",
      class: "KHMT02",
      department: "Khoa Khoa học Máy tính",
      estimateCost: "170,000,000 VND",
      estimateTime: "9 tháng",
      averageMark: "8.0",
      agree: false,
      fileCompleted: "Blockchain_CungUng.pdf",
    },
  ];
  