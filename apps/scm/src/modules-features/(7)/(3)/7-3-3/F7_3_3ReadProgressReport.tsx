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

export interface I7_3_3ProgressReport {
    researchNumber?: string;
    researchName?: string;
    researchGroup?: string;
    leader?: string;
    estimateTime?: string;
    progress?: string;
    cost?: string;
    reportFile?: string;
    agree?: boolean;
    comment?: string; 
}

export default function F7_3_3ReadProgressReport() {
    const disc = useDisclosure(false)
    const [checked, setChecked] = useState(false);
    const form = useForm<I7_3_3ProgressReport>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_3_3ProgressReport[]>({
        queryKey: ["F7_3_3ReadProgressReport"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_3_3ProgressReport>[]>(
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
                header: "Tên nhóm nghiên cứu",
                accessorKey: "researchGroup", // Maps to 'researchGroup' field in the interface
            },
            {
                header: "Trưởng nhóm",
                accessorKey: "leader", // Maps to 'leader' field in the interface
            },
            {
                header: "Thời gian thực hiện",
                accessorKey: "estimateTime", // Maps to 'estimateTime' field in the interface
            },
            {
                header: "% hoàn thành",
                accessorKey: "progress", // Maps to 'progress' field in the interface
            },
            {
                header: "Kinh phí đã chi",
                accessorKey: "cost", // Maps to 'cost' field in the interface
            },
            {
                header: "File báo cáo",
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
            }
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Kiểm tra báo cáo tiến độ thực hiện đề tài nhóm nghiên cứu</Text>
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
                            title="Kiểm tra báo cáo tiến độ thực hiện đề tài sinh viên nghiên cứu khoa học"
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

const data: I7_3_3ProgressReport[] = [
    {
        researchNumber: "R001",
        researchName: "Nghiên cứu AI trong Giáo dục",
        researchGroup: "Nhóm Nghiên cứu AI",
        leader: "Nguyễn Văn A",
        estimateTime: "7 tháng",
        progress: "85%",
        cost: "120,000,000 VND",
        reportFile: "AI_GiaoDuc.pdf",
        agree: true,
        comment: "Báo cáo đầy đủ, chất lượng tốt.",
    },
    {
        researchNumber: "R002",
        researchName: "Ứng dụng IoT trong Nông nghiệp",
        researchGroup: "Nhóm Nghiên cứu IoT",
        leader: "Lê Thị B",
        estimateTime: "10 tháng",
        progress: "90%",
        cost: "200,000,000 VND",
        reportFile: "IoT_NongNghiep.pdf",
        agree: true,
        comment: "Báo cáo rất chi tiết, cần thêm ứng dụng thực tế.",
    },
    {
        researchNumber: "R003",
        researchName: "Blockchain trong Chuỗi Cung Ứng",
        researchGroup: "Nhóm Blockchain",
        leader: "Trần Minh C",
        estimateTime: "9 tháng",
        progress: "80%",
        cost: "170,000,000 VND",
        reportFile: "Blockchain_CungUng.pdf",
        agree: false,
        comment: "Cần bổ sung thêm phần phân tích rủi ro.",
    },
  ];
  