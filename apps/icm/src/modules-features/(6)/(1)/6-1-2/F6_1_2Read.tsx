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

export interface I6_1_2Read {
    name?: string; // Research group name
    leader?: string; // Group leader
    level?: string; // Academic rank and degree
    department?: string; // Field of activity
    signUpFile?: string; // File path of the sign-up document
    file?: string; // File path of the group explanation document
    status?: string; // Status of the application
    comment?: string; // Comments or feedback
}

export default function F6_1_2Read() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    const form = useForm<I6_1_2Read>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_2Read[]>({
        queryKey: ["F6_1_2Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_2Read>[]>(
        () => [
            { header: "Tên nhóm nghiên cứu", accessorKey: "name", size: 300 },
            { header: "Trưởng nhóm", accessorKey: "leader", size: 200 },
            { header: "Học hàm - Học vị", accessorKey: "level", size: 250 },
            { header: "Lĩnh vực hoạt động", accessorKey: "department", size: 250 },
            {

                header: "Đơn đăng ký",
                accessorKey: "signUpFile",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
                size: 230
            },
            {

                header: "Thuyết minh nhóm",
                accessorKey: "file",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
                size: 230
            },
            { header: "Trạng thái kiểm tra", accessorKey: "status", size: 230 },
            { header: "Nhận xét", accessorKey: "comment", size: 230 },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách đăng ký nhóm nghiên cứu </Text>
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
                                title="Kiểm tra hồ sơ đăng ký"
                            >
                                <Switch
                                    label="Đủ hồ sơ:"
                                    color="green" />
                                <MyTextEditor label="Kết luận:" onChange={() => { }}></MyTextEditor>

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
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I6_1_2Read[] = [
    {
        name: "Nhóm nghiên cứu AI",
        leader: "Nguyễn Văn A",
        level: "Phó Giáo sư - Tiến sĩ",
        department: "Khoa học máy tính",
        signUpFile: "AI_SignUp.pdf",
        file: "AI_Explanation.pdf",
        status: "Đã kiểm tra",
        comment: "Đầy đủ thông tin và có tiềm năng ứng dụng.",
    },
    {
        name: "Nhóm nghiên cứu Blockchain",
        leader: "Lê Thị B",
        level: "Giáo sư - Tiến sĩ",
        department: "Khoa học dữ liệu",
        signUpFile: "Blockchain_SignUp.pdf",
        file: "Blockchain_Explanation.pdf",
        status: "Chờ kiểm tra",
        comment: "Cần bổ sung thêm thông tin về tính khả thi.",
    },
    {
        name: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Trần Minh C",
        level: "Tiến sĩ",
        department: "Công nghệ Sinh học",
        signUpFile: "BioTech_SignUp.pdf",
        file: "BioTech_Explanation.pdf",
        status: "Đã kiểm tra",
        comment: "Đề xuất tốt, cần làm rõ chi tiết triển khai.",
    },
];