'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_2_1DeleteResearch from "./F7_2_1DeleteResearch";
import F7_2_1UpdateResearch from "./F7_2_1UpdateResearch";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";

export interface I7_2_1Research {
    id: number;
    researchName?: string;
    field?: string;
    studentName?: string;
    unit?: string;
    estimateCost?: string;
    estimateTime?: string;
    file?: string
}

export default function F7_2_1ReadResearch() {
    const disc = useDisclosure(false)
    const form = useForm<I7_2_1ResearchData>({
        initialValues: {
        },
    });
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_1Research[]>({
        queryKey: ["F7_2_1ReadResearch"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_1Research>[]>(
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
                header: "Sinh viên đăng ký",
                accessorKey: "studentName", // Maps to 'studentName' field in data
            },
            {
                header: "Đơn vị",
                accessorKey: "unit", // Maps to 'unit' field in data
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
                accessorKey: "file",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
            },

        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách đề xuất đã đăng ký</Text>
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data || []}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <MyButtonModal
                            label="Cập nhật"
                            disclosure={disc}
                            modalSize={"80%"}
                            color="orange"
                            title="Thuyết minh đề tài NCKH sinh viên"
                        >
                            <TextInput
                                label="Tên đề tài:"
                                {...form.getInputProps("researchName")}
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                label="Thời gian thực hiện:"
                                {...form.getInputProps("estimateTime")}
                            />

                            <MyFlexRow>
                                <MyDateInput
                                    label="Từ ngày:"
                                    {...form.getInputProps("startDate")}
                                    style={{ flex: 1 }}
                                />
                                <MyDateInput
                                    label="Đến ngày:"
                                    {...form.getInputProps("endDate")}
                                    style={{ flex: 1 }}
                                />
                            </MyFlexRow>

                            <TextInput
                                label="Đơn vị chủ trì:"
                                {...form.getInputProps("hostUnit")}
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                label="Mục tiêu nghiên cứu:"
                                {...form.getInputProps("researchPurpose")}
                            />
                            <TextInput
                                label="Hướng ứng dụng:"
                                {...form.getInputProps("application")}
                            />
                            <TextInput
                                label="Kinh phí dự kiến:"
                                {...form.getInputProps("estimateCost")}
                            />
                            <MyFileInput label="Đính kèm file thuyết minh/ đề cương:" {...form.getInputProps("file")} />

                            <MyDataTable
                                columns={[
                                    { header: "STT", accessorKey: "id", size: 100 }, // Display the 'id' property
                                    { header: "Mã sinh viên", accessorKey: "studentId", size: 150 }, // Display 'studentId'
                                    { header: "Họ tên", accessorKey: "studentName", size: 200 }, // Display 'studentName'
                                    { header: "Lớp", accessorKey: "class", size: 150 }, // Display 'class'
                                    { header: "Khoa", accessorKey: "department", size: 200 }, // Display 'department'
                                    { header: "Chức vụ", accessorKey: "position", size: 150 }, // Display 'position'
                                    {
                                        header: "File lý lịch",
                                        accessorKey: "file",
                                        Cell: ({ cell }) => {
                                            return <MyButtonViewPDF />;
                                        },
                                    }

                                ]}
                                data={memberData} 
                                renderRowActions={({ row }) => {
                                    return (
                                        <MyCenterFull>
                                            <F7_2_1UpdateResearch values={row.original} />
                                            <F7_2_1DeleteResearch id={row.original.id} />
                                        </MyCenterFull>
                                    );
                                }}
                            ></MyDataTable>
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

export interface I7_2_1ResearchData {
    researchName?: string;
    estimateTime?: string;
    startDate?: Date;
    endDate?: Date;
    hostUnit?: string;
    researchPurpose?: string;
    application?: string;
    estimateCost?: string;
}

// Interface for payment member data
export interface I7_2_1MemberData {
    id: number;
    studentId?: string;
    studentName?: string;
    class?: string;
    department?: string;
    position?: string;
    file?: string;
}
const memberData: I7_2_1MemberData[] = [
    {
        id: 1,
        studentId: "S001",
        studentName: "Nguyễn Văn A",
        class: "CS101",
        department: "Khoa học máy tính",
        position: "Trưởng nhóm",
        file: "file1.pdf"
    },
    {
        id: 2,
        studentId: "S002",
        studentName: "Trần Thị B",
        class: "CS102",
        department: "Khoa học máy tính",
        position: "Thành viên",
        file: "file2.pdf"
    },
    {
        id: 3,
        studentId: "S003",
        studentName: "Lê Minh C",
        class: "CS103",
        department: "Khoa học máy tính",
        position: "Thành viên",
        file: "file3.pdf"
    }
];


const data: I7_2_1Research[] = [
    {
        id: 1,
        researchName: 'Đề tài 1',
        field: 'Field 1',
        studentName: 'Sinh viên 1',
        unit: 'Đơn vị 1',
        estimateCost: '1000',
        estimateTime: '6 tháng',
        file: 'file1.pdf',
    },
    {
        id: 2,
        researchName: 'Đề tài 2',
        field: 'Field 2',
        studentName: 'Sinh viên 2',
        unit: 'Đơn vị 2',
        estimateCost: '2000',
        estimateTime: '12 tháng',
        file: 'file2.pdf',
    },
];



