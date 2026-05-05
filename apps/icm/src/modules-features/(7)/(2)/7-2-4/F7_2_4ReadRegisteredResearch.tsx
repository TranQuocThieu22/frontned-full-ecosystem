'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Checkbox, Switch, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";

export interface I7_2_4RegisteredResearch {
    researchName?: string;
    field?: string;
    headOfDepartment?: string;
    class?: string;
    department?: string;
    estimateCost?: string;
    estimateTime?: string;
    file?: string
    doing?: boolean
    fileCompleted?: string;
    agree?: boolean;
    comment?: string
}

export default function F7_2_4ReadRegisteredResearch() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    const form = useForm<I7_2_4RegisteredResearch>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_4RegisteredResearch[]>({
        queryKey: ["F7_2_4ReadRegisteredResearch"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_4RegisteredResearch>[]>(
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
                    return (
                        <Checkbox
                            checked={cell.row.original.doing || false} // Reflects 'doing' status
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
                header: "Nhận xét",
                accessorKey: "comment", // Maps to 'comment' field in data
                Cell: ({ cell }) => {
                    return (
                        <Textarea
                            value={cell.row.original.comment || ""}
                            onChange={(event) => console.log(event.target.value)} // Placeholder for comment update logic
                            style={{ width: "100%" }}
                        />
                    );
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
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <MyButtonModal
                                label="Cập nhật"
                                disclosure={disc}
                                modalSize={"50%"}
                                color="orange"
                                title="Kiểm tra thuyết minh đề xuất nghiên cứu khoa học của sinh viên"
                            >
                                <Switch
                                    label="Đồng ý"
                                    color="green" />
                                <MyTextEditor label="Nhận xét" onChange={() => { }}></MyTextEditor>
                                <Checkbox
                                    label="Gửi mail thông báo"
                                    checked={checked}
                                    onChange={(event) => setChecked(event.currentTarget.checked)}
                                />

                                <Button variant="filled" color="orange" onClick={() => {
                                    console.log("Saving data..."); // Logic to save data
                                    disc[1].close(); // Close the modal
                                    notifications.show({
                                        message: "Lưu thành công",
                                    });
                                }}>
                                    Lưu
                                </Button>
                            </MyButtonModal>
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_2_4RegisteredResearch[] = [
    {
        researchName: "Nghiên cứu AI trong Y tế",
        field: "Công nghệ thông tin",
        headOfDepartment: "Nguyễn Văn A",
        class: "CS01",
        department: "Khoa Công nghệ thông tin",
        estimateCost: "100,000,000 VND",
        estimateTime: "6 tháng",
        file: "file1.pdf",
        doing: true,
        fileCompleted: "fileCompleted1.pdf",
        agree: true,
        comment: "Thuyết minh đầy đủ, cần cải thiện phần triển khai.",
    },
    {
        researchName: "Ứng dụng Blockchain trong Quản lý",
        field: "Khoa học Máy tính",
        headOfDepartment: "Trần Thị B",
        class: "CS02",
        department: "Khoa Khoa học Máy tính",
        estimateCost: "150,000,000 VND",
        estimateTime: "12 tháng",
        file: "file2.pdf",
        doing: false,
        fileCompleted: "fileCompleted2.pdf",
        agree: false,
        comment: "Cần chỉnh sửa thêm phần ứng dụng thực tiễn.",
    },
    {
        researchName: "Phân tích Dữ liệu lớn trong Marketing",
        field: "Kinh tế",
        headOfDepartment: "Lê Minh C",
        class: "KT01",
        department: "Khoa Kinh tế",
        estimateCost: "80,000,000 VND",
        estimateTime: "8 tháng",
        file: "file3.pdf",
        doing: true,
        fileCompleted: "fileCompleted3.pdf",
        agree: true,
        comment: "Báo cáo tốt, đề nghị thêm ví dụ minh họa.",
    },
];