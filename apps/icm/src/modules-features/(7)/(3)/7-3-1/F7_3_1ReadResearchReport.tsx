'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import F7_3_1CreateAnnouncement from "./F7_3_1CreateAnnouncement";

export interface I7_3_1ResearchReport {
    check?: boolean
    researchNumber?: string;
    researchName?: string;
    headOfDepartment?: string;
    phoneNumber?: string;
    advisor?: string;
    startTime?: Date;
    endTime?: Date;
    cost?: string
    reportStatus?: string;
    dueDate?: string;
    status?: string;
}

export default function F7_3_1ReadResearchReport() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);

    const AllUserQuery = useQuery<I7_3_1ResearchReport[]>({
        queryKey: ["F7_3_1ReadResearchReport"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_3_1ResearchReport>[]>(
        () => [
            {
                header: "Check",
                accessorKey: "check", // Maps to 'check' field in the interface
                Cell: ({ cell }) => (
                    <Checkbox
                        checked={cell.row.original.check || false} // Reflects 'check' status
                        onChange={(event) => console.log(event.currentTarget.checked)} // Placeholder for check logic
                    />
                ),
            },
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
                accessorKey: "advisor", // Maps to 'advisor' field in the interface
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
                header: "Trạng thái thực hiện",
                accessorKey: "status", // Maps to 'status' field in the interface
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh mục đề tài sinh viên thực hiện theo dõi báo cáo </Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_3_1CreateAnnouncement />}
            />
            <Text>Danh sách thông báo yêu cầu báo cáo tiến độ thực hiện đề tài nghiên cứu khoa học Nhóm nghiên cứu</Text>
            <MyDataTable
                columns={[
                    { header: "STT", accessorKey: "id" },
                    { header: "Ngày gửi", accessorKey: "sentDate" },
                    { header: "Tiêu đề thông báo", accessorKey: "subject", size: 300 },
                    {
                        header: "Danh sách người nhận",
                        Cell: ({ cell }) => {
                            return <MyButtonModal
                                label="Xem danh sách"
                                modalSize={"100%"}
                                title="Quyết định giao đề tài"
                                onSubmit={() => {
                                }}
                                disclosure={disc} >
                                <MyDataTable
                                    columns={[
                                        {
                                            header: "STT",
                                            accessorKey: "id", // Maps to 'id' field in the interface
                                            size: 50, // Optional size configuration
                                        },
                                        {
                                            header: "Mã sinh viên",
                                            accessorKey: "studentNumber", // Maps to 'studentNumber' field in the interface
                                        },
                                        {
                                            header: "Họ tên",
                                            accessorKey: "studentName", // Maps to 'studentName' field in the interface
                                        },
                                        {
                                            header: "Lớp",
                                            accessorKey: "class", // Maps to 'class' field in the interface
                                        },
                                        {
                                            header: "Khoa",
                                            accessorKey: "department", // Maps to 'department' field in the interface
                                        },
                                        {
                                            header: "Mã đề tài",
                                            accessorKey: "researchNumber", // Maps to 'researchNumber' field in the interface
                                        },
                                        {
                                            header: "Tên đề tài",
                                            accessorKey: "researchName", // Maps to 'researchName' field in the interface
                                        },
                                    ]}
                                    data={receiverList}

                                ></MyDataTable>
                            </MyButtonModal>
                        },
                    },
                    { header: "Khoa", accessorKey: "department", size: 150 },
                ]}
                data={announcement}

            />
        </MyFlexColumn>
    );
}

export interface receiver {
    id?: number;
    studentNumber?: string;
    studentName?: string;
    class?: string;
    department?: string;
    researchNumber?: string;
    researchName?: string;
}

export interface I7_3_1Announcement {
    id?: number;
    sentDate?: Date;
    subject?: string;
    file?: string;
}

const data: I7_3_1ResearchReport[] = [
    {
        check: true,
        researchNumber: "RD001",
        researchName: "Nghiên cứu AI trong Y tế",
        headOfDepartment: "Nguyễn Văn A",
        phoneNumber: "0987654321",
        advisor: "Lê Thị B",
        startTime: new Date("2024-01-15"),
        endTime: new Date("2024-06-15"),
        cost: "100,000,000 VND",
        reportStatus: "Hoàn thành",
        dueDate: "còn 35 ngày",
        status: "Đã hoàn thành",
    },
    {
        check: false,
        researchNumber: "RD002",
        researchName: "Ứng dụng Blockchain trong Quản lý",
        headOfDepartment: "Trần Thị B",
        phoneNumber: "0123456789",
        advisor: "Nguyễn Thị D",
        startTime: new Date("2024-03-01"),
        endTime: new Date("2024-08-30"),
        cost: "150,000,000 VND",
        reportStatus: "Đang thực hiện",
        dueDate: "còn 35 ngày",
        status: "Đang thực hiện",
    },
    {
        check: true,
        researchNumber: "RD003",
        researchName: "Phân tích Dữ liệu lớn trong Marketing",
        headOfDepartment: "Lê Minh C",
        phoneNumber: "0965432187",
        advisor: "Trần Văn F",
        startTime: new Date("2024-05-10"),
        endTime: new Date("2024-10-10"),
        cost: "80,000,000 VND",
        reportStatus: "Chờ xét duyệt",
        dueDate: "còn 35 ngày",
        status: "Chờ xét duyệt",
    },
];

const receiverList: receiver[] = [
    {
        id: 1,
        studentNumber: "SV001",
        studentName: "Nguyen Van A",
        class: "CS01",
        department: "Khoa Công nghệ thông tin",
        researchNumber: "RD001",
        researchName: "Nghiên cứu AI trong Y tế",
    },
    {
        id: 2,
        studentNumber: "SV002",
        studentName: "Tran Thi B",
        class: "CS02",
        department: "Khoa Khoa học Máy tính",
        researchNumber: "RD002",
        researchName: "Ứng dụng Blockchain trong Quản lý",
    },
    {
        id: 3,
        studentNumber: "SV003",
        studentName: "Le Minh C",
        class: "KT01",
        department: "Khoa Kinh tế",
        researchNumber: "RD003",
        researchName: "Phân tích Dữ liệu lớn trong Marketing",
    },
];

const announcement = [
    {
        id: 1,
        sentDate: "2024-01-15",
        subject: "Thông báo về việc giao đề tài nghiên cứu khoa học",
        department: "Khoa Công nghệ thông tin",

    },
    {
        id: 2,
        sentDate: "2024-01-20",
        subject: "Thông báo về hội thảo khoa học lần thứ 10",
        department: "Khoa Khoa học Máy tính",
    },
    {
        id: 3,
        sentDate: "2024-01-25",
        subject: "Thông báo về kế hoạch hội nghị khoa học trẻ",
        department: "Khoa Kinh tế",
    },
];