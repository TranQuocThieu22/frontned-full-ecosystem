'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";

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

export interface I7_2_2aPropose {
    researchName?: string;
    field?: string;
    studentName?: string;
    unit?: string;
    estimateCost?: string;
    estimateTime?: string;
    file?: string;
    approve?: boolean
    comment?: string;
}

export default function F7_2_2aReadPropose() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    const form = useForm<I7_2_2aPropose>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_2aPropose[]>({
        queryKey: ["F7_2_2aReadPropose"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_2aPropose>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "researchName", // Maps to 'researchName' field in the interface
            },
            {
                header: "Lĩnh vực",
                accessorKey: "field", // Maps to 'field' field in the interface
            },
            {
                header: "Sinh viên đăng ký",
                accessorKey: "studentName", // Maps to 'studentName' field in the interface
            },
            {
                header: "Đơn vị công tác",
                accessorKey: "unit", // Maps to 'unit' field in the interface
            },
            {
                header: "Kinh phí dự kiến",
                accessorKey: "estimateCost", // Maps to 'estimateCost' field in the interface
            },
            {
                header: "Thời gian dự kiến",
                accessorKey: "estimateTime", // Maps to 'estimateTime' field in the interface
            },
            {
                header: "File thuyết minh",
                accessorKey: "file", // Maps to 'file' field in the interface
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
            },
            {
                header: "Hợp lệ kiểm tra",
                accessorKey: "approve", // Maps to 'approve' field in the interface
                Cell: ({ cell }) => {
                    return (
                        <Checkbox
                            checked={cell.row.original.approve || false} // Reflects 'approve' status
                            onChange={(event) => console.log(event.currentTarget.checked)} // Placeholder for update logic
                        />
                    );
                },
            },
            {
                header: "Nhận xét",
                accessorKey: "comment", // Maps to 'comment' field in the interface
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách đề xuất đã đăng ký </Text>
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data || []}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <MyButtonModal
                            label="Kiểm tra"
                            disclosure={disc}
                            modalSize={"50%"}
                            color="orange"
                            title="Kiểm tra thuyết minh đề xuất nghiên cứu khoa học của sinh viên"
                        >
                            <Switch
                                label="Hợp lệ"
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
const data: I7_2_2aPropose[] = [
    {
        researchName: "Nghiên cứu AI trong Giáo dục",
        field: "Công nghệ thông tin",
        studentName: "Nguyễn Văn A",
        unit: "Khoa Công nghệ Thông tin",
        estimateCost: "120,000,000 VND",
        estimateTime: "7 tháng",
        file: "AI_GiaoDuc.pdf",
        approve: true,
        comment: "Đề xuất hợp lệ. Báo cáo đầy đủ và có tiềm năng ứng dụng cao.",
    },
    {
        researchName: "Ứng dụng IoT trong Nông nghiệp",
        field: "Kỹ thuật",
        studentName: "Lê Thị B",
        unit: "Khoa Kỹ thuật",
        estimateCost: "200,000,000 VND",
        estimateTime: "10 tháng",
        file: "IoT_NongNghiep.pdf",
        approve: true,
        comment: "Đề xuất tốt. Cần bổ sung thêm thông tin chi tiết về triển khai.",
    },
    {
        researchName: "Blockchain trong Chuỗi Cung Ứng",
        field: "Khoa học Máy tính",
        studentName: "Trần Minh C",
        unit: "Khoa Khoa học Máy tính",
        estimateCost: "170,000,000 VND",
        estimateTime: "9 tháng",
        file: "Blockchain_CungUng.pdf",
        approve: false,
        comment: "Đề xuất cần chỉnh sửa và bổ sung tài liệu liên quan.",
    },
];