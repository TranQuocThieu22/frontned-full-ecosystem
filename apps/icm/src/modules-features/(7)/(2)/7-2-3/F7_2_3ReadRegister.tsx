'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { Text } from "@mantine/core";

export interface I7_2_3Register {
    id: number;
    researchName?: string;
    field?: string;
    headOfDepartment?: string;
    class?: string
    department?: string
    estimateCost?: string;
    estimateTime?: string;
    file?: string;
    doing: boolean;
    fileCompleted?: string;
    fileUpdate?: string;
}

export default function F7_2_1ReadRegister() {
    const disc = useDisclosure(false)
    const form = useForm<I7_2_3Register>({
        initialValues: {
            id: 0,
            doing: false
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_3Register[]>({
        queryKey: ["F7_2_1ReadRegister"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_3Register>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "researchName",
                size: 240 // Maps to 'researchName' field in data
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
                accessorKey: "class",
                size: 100 
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
                header: "File thuyết minh",
                accessorKey: "file", // Maps to 'file' field in data
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
            },
            {
                header: "Thực hiện",
                accessorKey: "doing", // Maps to 'doing' field in data
                Cell: ({ cell }) => {
                    return <Checkbox
                        checked={cell.row.original.doing || false}
                        onChange={(event) => console.log(event.currentTarget.checked)}
                    />
                },
            },
            {
                header: "File thuyết minh hoàn thiện",
                accessorKey: "fileCompleted", // Maps to 'fileCompleted' field in data
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; 
                },
            },
            {
                header: "Cập nhật thuyết minh hoàn thiện",
                accessorKey: "fileUpdate", // Maps to 'fileUpdate' field in data
                Cell: ({ cell }) => {
                    return <MyFileInput placeholder ="Tải file thuyết minh" />; 
                },
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách đăng ký đề xuất đề tài sinh viên đã được duyệt thực hiện</Text>
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data || []}
        />
        </MyFlexColumn>
    )
}

const data: I7_2_3Register[] = [
    {
        id: 1,
        researchName: "Ứng dụng trí tuệ nhân tạo trong giáo dục",
        field: "Công nghệ thông tin",
        headOfDepartment: "Nguyễn Văn A",
        class: "CNTT01",
        department: "Khoa Công nghệ thông tin",
        estimateCost: "50,000,000 VND",
        estimateTime: "6 tháng",
        file: "research_ai_education.pdf",
        doing: true,
        fileCompleted: "completed_ai_education.pdf",
        fileUpdate: "update_ai_education.pdf",
    },
    {
        id: 2,
        researchName: "Phát triển hệ thống blockchain trong ngân hàng",
        field: "Khoa học dữ liệu",
        headOfDepartment: "Lê Thị B",
        class: "DS02",
        department: "Khoa Khoa học dữ liệu",
        estimateCost: "80,000,000 VND",
        estimateTime: "12 tháng",
        file: "research_blockchain_banking.pdf",
        doing: false,
        fileCompleted: "completed_blockchain_banking.pdf",
        fileUpdate: "update_blockchain_banking.pdf",
    },
    {
        id: 3,
        researchName: "Nghiên cứu công nghệ IoT trong nông nghiệp thông minh",
        field: "Kỹ thuật điện tử",
        headOfDepartment: "Trần Minh C",
        class: "KTDT03",
        department: "Khoa Kỹ thuật điện tử",
        estimateCost: "70,000,000 VND",
        estimateTime: "8 tháng",
        file: "research_iot_agriculture.pdf",
        doing: true,
        fileCompleted: "completed_iot_agriculture.pdf",
        fileUpdate: "update_iot_agriculture.pdf",
    },
    {
        id: 4,
        researchName: "Phân tích dữ liệu lớn trong quản lý đô thị",
        field: "Khoa học máy tính",
        headOfDepartment: "Hoàng Văn D",
        class: "KHMT04",
        department: "Khoa Khoa học máy tính",
        estimateCost: "60,000,000 VND",
        estimateTime: "10 tháng",
        file: "research_bigdata_urban.pdf",
        doing: false,
        fileCompleted: "completed_bigdata_urban.pdf",
        fileUpdate: "update_bigdata_urban.pdf",
    },
    {
        id: 5,
        researchName: "Nghiên cứu phát triển năng lượng tái tạo",
        field: "Kỹ thuật môi trường",
        headOfDepartment: "Phạm Thị E",
        class: "KTMT05",
        department: "Khoa Kỹ thuật môi trường",
        estimateCost: "90,000,000 VND",
        estimateTime: "15 tháng",
        file: "research_renewable_energy.pdf",
        doing: true,
        fileCompleted: "completed_renewable_energy.pdf",
        fileUpdate: "update_renewable_energy.pdf",
    },
];




