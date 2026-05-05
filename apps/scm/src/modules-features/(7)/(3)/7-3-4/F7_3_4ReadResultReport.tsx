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
import { U0DateToDDMMYYYString } from "@/utils/date";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";

export interface I7_3_4ResultReport {
    promulgateDate: any;
    researchNumber?: string;
    researchName?: string;
    headOfDepartment?: string;
    phoneNumber?: string;
    advisor?: string;
    startTime?: Date;
    endTime?: Date;
    cost?: string;
    reportStatus?: string;
    dueDate?: string;
    reportFile?: string;
    agree?: boolean;
    comment?: string;
    status?: string;
}

export default function F7_3_4ReadResultReport() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    const form = useForm<I7_3_4ResultReport>({
        initialValues: {
            promulgateDate: undefined
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_3_4ResultReport[]>({
        queryKey: ["F7_3_3ReadProgressReport"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_3_4ResultReport>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "researchNumber", // Maps to 'researchNumber' field in the interface
            },
            {
                header: "Tên đề tài",
                accessorKey: "researchName", // Maps to 'researchName' field in the interface
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "headOfDepartment", // Maps to 'headOfDepartment' field in the interface
            },
            {
                header: "Số điện thoại chủ nhiệm",
                accessorKey: "phoneNumber", // Maps to 'phoneNumber' field in the interface
            },
            {
                header: "Cố vấn",
                accessorKey: "advisor",
            },
            {
                header: "Thời gian bắt đầu",
                accessorKey: "startTime", // Maps to 'startTime' field in the interface
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.startTime!)),
            },
            {
                header: "Thời gian kết thúc",
                accessorKey: "endTime", // Maps to 'endTime' field in the interface
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.endTime!)),

            },
            {
                header: "Kinh phí",
                accessorKey: "cost", // Maps to 'cost' field in the interface
            },
            {
                header: "Trạng thái báo cáo",
                accessorKey: "reportStatus", // Maps to 'reportStatus' field in the interface
            },
            {
                header: "Đến ngày báo cáo",
                accessorKey: "dueDate", // Maps to 'dueDate' field in the interface
            },
            {
                header: "File báo cáo tiến độ",
                accessorKey: "reportFile", // Maps to 'reportFile' field in the interface
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
            },
            {
                header: "Đồng ý",
                accessorKey: "agree", // Maps to 'agree' field in the interface
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
                header: "Nhận xét",
                accessorKey: "comment", // Maps to 'comment' field in the interface
            },
            {
                header: "Trạng thái thực hiện",
                accessorKey: "status", // Maps to 'status' field in the interface
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        //Tổng hợp báo cáo kết quả giám sát thực hiện đề tài
        <MyFlexColumn>
            <Text>Danh sách đăng ký đề xuất định hướng </Text>
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data || []}
        />
        </MyFlexColumn>
    )
}

const data: I7_3_4ResultReport[] = [
    {
        researchNumber: "RD001",
        researchName: "Nghiên cứu AI trong Y tế",
        headOfDepartment: "Nguyễn Văn A",
        phoneNumber: "0987654321",
        advisor: "Lê Thị B",
        startTime: new Date("2024-01-15"),
        endTime: new Date("2024-06-15"),
        cost: "120,000,000 VND",
        reportStatus: "Hoàn thành",
        dueDate: "còn 35 ngày",
        reportFile: "report_ai_healthcare.pdf",
        agree: true,
        comment: "Báo cáo đầy đủ và chất lượng.",
        status: "Đã hoàn thành",
        promulgateDate: undefined
    },
    {
        researchNumber: "RD002",
        researchName: "Ứng dụng Blockchain trong Quản lý",
        headOfDepartment: "Trần Văn C",
        phoneNumber: "0123456789",
        advisor: "Phạm Thị D",
        startTime: new Date("2024-03-01"),
        endTime: new Date("2024-08-30"),
        cost: "150,000,000 VND",
        reportStatus: "Đang thực hiện",
        dueDate: "còn 35 ngày", // Example due date
        reportFile: "report_blockchain_management.pdf",
        agree: false,
        comment: "Cần bổ sung chi tiết về tính ứng dụng.",
        status: "Đang thực hiện",
        promulgateDate: undefined
    },
    {
        researchNumber: "RD003",
        researchName: "Phân tích dữ liệu lớn trong Marketing",
        headOfDepartment: "Lê Minh E",
        phoneNumber: "0965432187",
        advisor: "Nguyễn Văn F",
        startTime: new Date("2024-05-10"),
        endTime: new Date("2024-10-10"),
        cost: "90,000,000 VND",
        reportStatus: "Chờ xét duyệt",
        dueDate: "còn 35 ngày", // Example due date
        reportFile: "report_bigdata_marketing.pdf",
        agree: false,
        comment: "Chờ cập nhật các tài liệu liên quan.",
        status: "Chờ xét duyệt",
        promulgateDate: undefined
    },
];
