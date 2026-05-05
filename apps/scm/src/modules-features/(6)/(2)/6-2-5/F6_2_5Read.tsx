'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Checkbox, Switch, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
export interface I6_2_5Read {
    researchNumber?: string; // Research project number
    researchName?: string; // Research project name
    field?: string; // Research field
    groupName?: string; // Research group name
    leader?: string; // Research group leader
    estimateCost?: string; // Estimated cost
    estimateTime?: string; // Estimated time
    file?: string; // Path to the project description file
    completed?: boolean; // Whether the project is completed
    fileHT?: string; // Path to the completed file
    fileTMHT?: string; // File input for updated completed file
    check?: string; // Check status
    comment?: string; // Comments
}

export default function F6_2_5Read() {

    const [checked, setChecked] = useState(false);
    const form = useForm<I6_2_5Read>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_5Read[]>({
        queryKey: ["F7_2_4ReadRegisteredResearch"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_5Read>[]>(
        () => [
            { header: "Mã Đề tài", accessorKey: "researchNumber" },
            { header: "Tên đề tài", accessorKey: "researchName", size: 200 },
            { header: "Lĩnh vực", accessorKey: "field" },
            { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 250 },
            { header: "Trưởng nhóm", accessorKey: "leader", size: 200 },
            { header: "Kinh phí dự kiến", accessorKey: "estimateCost", size: 240 },
            { header: "Thời gian dự kiến", accessorKey: "estimateTime", size: 230 },
            {

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

                header: "File thuyết minh hoàn thiện",
                accessorKey: "fileHT",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
                size: 230
            },
            // {

            //     header: "Cập nhật thuyết minh hoàn thiện",
            //     accessorKey: "fileTMHT",
            //     Cell: ({ cell }) => {
            //         return <MyActionIconUpload />
            //     },
            //     size: 230
            // },
            { header: "Đạt yêu cầu", accessorKey: "check", accessorFn: (row) => <Checkbox onChange={() => { }} checked={row.check === "Đạt yêu cầu"} />, size: 200 },
            { header: "Nhận xét", accessorKey: "comment", size: 200 },
            {
                header: "Kiểm tra", accessorFn: () => <KiemTra />
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
const data: I6_2_5Read[] = [
    {
        researchNumber: "RS001",
        researchName: "Nghiên cứu AI trong Y tế",
        field: "Công nghệ thông tin",
        groupName: "Nhóm nghiên cứu AI",
        leader: "Nguyễn Văn A",
        estimateCost: "100,000,000 VND",
        estimateTime: "6 tháng",
        file: "file1.pdf",
        completed: true,
        fileHT: "fileCompleted1.pdf",
        fileTMHT: "fileUpdate1.pdf",
        check: "Đạt yêu cầu",
        comment: "Báo cáo tốt, đề nghị thêm ví dụ minh họa.",
    },
    {
        researchNumber: "RS002",
        researchName: "Ứng dụng Blockchain trong Quản lý",
        field: "Khoa học Máy tính",
        groupName: "Nhóm nghiên cứu Blockchain",
        leader: "Trần Thị B",
        estimateCost: "150,000,000 VND",
        estimateTime: "12 tháng",
        file: "file2.pdf",
        completed: false,
        fileHT: "fileCompleted2.pdf",
        fileTMHT: "fileUpdate2.pdf",
        check: "Đạt yêu cầu",
        comment: "Báo cáo tốt, đề nghị thêm ví dụ minh họa.",
    },
    {
        researchNumber: "RS003",
        researchName: "Phân tích Dữ liệu lớn trong Marketing",
        field: "Kinh tế",
        groupName: "Nhóm nghiên cứu Big Data",
        leader: "Lê Minh C",
        estimateCost: "80,000,000 VND",
        estimateTime: "8 tháng",
        file: "file3.pdf",
        completed: true,
        fileHT: "fileCompleted3.pdf",
        fileTMHT: "fileUpdate3.pdf",
        check: "Đạt yêu cầu",
        comment: "Báo cáo tốt, đề nghị thêm ví dụ minh họa.",
    },
];


function KiemTra() {
    const disc = useDisclosure()
    const [checked, setChecked] = useState(false);
    return (
        <MyButtonModal
            label="Kiểm tra"
            disclosure={disc}
            modalSize={"50%"}
            color="orange"
            title="Kiểm tra hồ sơ đăng ký"
        >
            <Switch
                label="Đạt yêu cầu"
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
                    message: "Cập nhật thành công",
                });
            }}>
                Cập nhật
            </Button>
        </MyButtonModal>
    )
}