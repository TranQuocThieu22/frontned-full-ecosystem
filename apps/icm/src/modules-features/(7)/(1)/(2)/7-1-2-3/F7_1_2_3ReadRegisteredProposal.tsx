'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Text } from "@mantine/core";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { Button, Checkbox, Switch } from "@mantine/core";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import { notifications } from "@mantine/notifications";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";

interface F7_1_2_3RegisteredProposal {
    id?: number;
    researchName?: string;
    field?: string;
    studentName?: string;
    department?: string;
    class?: string;
    estimateCost?: string;
    estimateTime?: string;
    addFile?: string;
    comment?: string;
}

export default function F7_1_2_3ReadRegisteredProposal() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    // Query to fetch the mock data
    const AllUserQuery = useQuery<F7_1_2_3RegisteredProposal[]>({
        queryKey: ["F7_1_2_3ReadRegisteredProposal"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<F7_1_2_3RegisteredProposal>[]>(
        () => [
            {
                header: "Tên đề tài",
                accessorKey: "researchName"
            },
            {
                header: "Lĩnh vực",
                accessorKey: "field"
            },
            {
                header: "Sinh viên đăng ký",
                accessorKey: "studentName"
            },
            {
                header: "Khoa",
                accessorKey: "department",
            },
            {
                header: "Lớp",
                accessorKey: "class"
            },
            {
                header: "Kinh phí dự kiến",
                accessorKey: "estimateCost"
            },
            {
                header: "Thời gian dự kiến",
                accessorKey: "estimateTime"
            },
            {
                header: "File Đăng ký",
                accessorKey: "addFile",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
            },
            {
                header: "Nhận xét",
                accessorKey: "comment"
            },

        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách đăng ký đề xuất định hướng </Text>
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data || []}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <MyButtonModal
                        label="Kiểm tra"
                        disclosure={disc}
                        modalSize={"50%"}
                        color="orange"
                        title="Kiểm tra đề xuất nghiên cứu khoa học của sinh viên"
                    >
                         <Switch label="Đồng ý" color="green"></Switch>
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
            )}
        />
        </MyFlexColumn>
    )
}

// Mock data
const data: F7_1_2_3RegisteredProposal[] = [
    {
        id: 1,
        researchName: "Nghiên cứu trí tuệ nhân tạo trong giáo dục",
        field: "Công nghệ thông tin",
        studentName: "Nguyen Van A",
        department: "Công nghệ thông tin",
        class: "CNTT01",
        estimateCost: "10,000,000 VND",
        estimateTime: "6 tháng",
        addFile: "proposal1.pdf",
        comment: "Rất tốt, cần thêm chi tiết về ứng dụng thực tiễn.",
    },
    {
        id: 2,
        researchName: "Ứng dụng blockchain trong quản lý tài sản",
        field: "Công nghệ thông tin",
        studentName: "Le Thi B",
        department: "Khoa học máy tính",
        class: "KHMT02",
        estimateCost: "12,000,000 VND",
        estimateTime: "9 tháng",
        addFile: "proposal2.pdf",
        comment: "Ý tưởng sáng tạo, cần bổ sung tài liệu tham khảo.",
    },
    {
        id: 3,
        researchName: "Nghiên cứu về tác động của ô nhiễm môi trường",
        field: "Môi trường",
        studentName: "Tran Van C",
        department: "Khoa học môi trường",
        class: "KHMT03",
        estimateCost: "8,000,000 VND",
        estimateTime: "4 tháng",
        addFile: "proposal3.pdf",
        comment: "Nên thêm số liệu thống kê để tăng thuyết phục.",
    },
    {
        id: 4,
        researchName: "Phát triển ứng dụng học trực tuyến",
        field: "Công nghệ thông tin",
        studentName: "Pham Thi D",
        department: "Kỹ thuật phần mềm",
        class: "KTPM01",
        estimateCost: "15,000,000 VND",
        estimateTime: "12 tháng",
        addFile: "proposal4.pdf",
        comment: "Ứng dụng rất hữu ích, cần thêm kế hoạch triển khai chi tiết.",
    },
    {
        id: 5,
        researchName: "Phân tích dữ liệu lớn trong marketing",
        field: "Kinh tế",
        studentName: "Nguyen Thi E",
        department: "Quản trị kinh doanh",
        class: "QTKD02",
        estimateCost: "20,000,000 VND",
        estimateTime: "8 tháng",
        addFile: "proposal5.pdf",
        comment: "Nên đưa thêm ví dụ thực tế trong ngành marketing.",
    },
];