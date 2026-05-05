'use client';
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, FileInput, Group, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";


export interface I6_2_2 {
    id: number; // Unique identifier
    researchNumber: string; // Research project number
    researchName: string; // Research project name
    field: string; // Research field
    groupName: string; // Research group name
    leader: string; // Research group leader
    phoneNumber: string; // Leader's phone number
    email: string; // Leader's email
    estimateCost: string; // Estimated cost
    estimateTime: string; // Estimated time
    file: string; // Path to the registration file
}
export interface I6_2_2Member {
    teacherNumber: string; // Teacher ID
    name: string; // Full name
    level: string; // Academic rank/degree
    unit: string; // Affiliated unit
    position: string; // Role in the research
    file: string; // Path to CV or personal file
}

export default function F6_2_2Read() {
    const disc = useDisclosure(false)

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_2[]>({
        queryKey: ["F6_2_2Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_2>[]>(() => [
        { header: "Mã đề tài", accessorKey: "researchNumber", size: 200 },
        { header: "Tên đề tài", accessorKey: "researchName", size: 200 },
        { header: "Lĩnh vực", accessorKey: "field", size: 200 },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 100 },
        { header: "Trưởng nhóm", accessorKey: "leader", size: 100 },
        { header: "Số điện thoại", accessorKey: "phoneNumber", size: 100 },
        { header: "Email", accessorKey: "email", size: 100 },
        { header: "Thời gian dự kiến", accessorKey: "estimateTime", size: 100 },
        { header: "File thuyết minh", accessorFn: () => <MyButtonViewPDF />, size: 100 },

    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách đề tài đã đăng ký</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <Group>
                            <MyButtonModal
                                label="Cập nhập"
                                title="Thuyết minh đề tài NCKH Nhóm nghiên cứu"
                                modalSize={"100%"}
                                disclosure={disc}>
                                <TextInput label="Tên đề tài" defaultValue="Đổi mới phương pháp giáo dục" />
                                <TextInput label="Thời gian thực hiện" />
                                <MyFlexRow>
                                    <MyDateInput
                                        label="Từ ngày"
                                        placeholder=""
                                    />

                                    <MyDateInput
                                        label="Đến ngày"
                                        placeholder=""
                                    />
                                </MyFlexRow>
                                <TextInput label="Đơn vị chủ trì" />
                                <TextInput label="Mục tiêu nghiên cứu" />
                                <TextInput label="Hướng ứng dụng" />
                                <TextInput label="Kinh phí dự kiến" />
                                <FileInput
                                    withAsterisk
                                    clearable
                                    multiple
                                    w={"100%"}
                                    accept=".pdf,.doc,.docx"
                                    label="Đính kèm file thuyết minh/ đề cương"
                                    description="Định dạng hợp lệ: PDF, doc, docx"
                                    placeholder="chọn file"
                                />
                                <Text>Danh sách thành viên trong nhóm nghiên cứu</Text>
                                <MyDataTable
                                    data={member}
                                    rowActionSize={150}
                                    columns={[
                                        {
                                            header: "Mã giảng viên",
                                            accessorKey: "teacherNumber",

                        
                                        },
                                        {
                                            header: "Họ tên",
                                            accessorKey: "name",

                                            
                                        },
                                        {
                                            header: "Học hàm - Học vị",
                                            accessorKey: "level",

                                           
                                        },
                                        {
                                            header: "Đơn vị cộng tác",
                                            accessorKey: "unit",

                                          
                                        },
                                        {
                                            header: "Vai trò",
                                            accessorKey: "position",

                                            
                                        },
                                        {
                                            header: "Lý lịch",
                                            accessorKey: "file",

                                            Cell: ({ row }) => {
                                                return <MyButtonViewPDF />;
                                            },
                                        }

                                    ]}
                                />


                                <Button
                                    leftSection={<IconPlus />}
                                    onClick={() => {
                                        disc[1].close();
                                        notifications.show({
                                            message: "Cập nhập thành công",
                                        });
                                    }}>
                                    Cập nhập
                                </Button>
                            </MyButtonModal>
                        </Group>
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_2_2[] = [
    {
        id: 1,
        researchNumber: "RS001",
        researchName: "Nghiên cứu AI trong giáo dục",
        field: "Khoa học máy tính",
        groupName: "Nhóm nghiên cứu AI",
        leader: "Nguyen Van A",
        phoneNumber: "0123456789",
        email: "nguyenvana@example.com",
        estimateCost: "500,000,000 VND",
        estimateTime: "12 tháng",
        file: "ai_research.pdf",
    },
    {
        id: 2,
        researchNumber: "RS002",
        researchName: "Blockchain trong chuỗi cung ứng",
        field: "Công nghệ thông tin",
        groupName: "Nhóm nghiên cứu Blockchain",
        leader: "Le Thi B",
        phoneNumber: "0987654321",
        email: "lethib@example.com",
        estimateCost: "750,000,000 VND",
        estimateTime: "18 tháng",
        file: "blockchain_research.pdf",
    },
    {
        id: 3,
        researchNumber: "RS003",
        researchName: "Công nghệ sinh học trong y học",
        field: "Công nghệ sinh học",
        groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Tran Van C",
        phoneNumber: "0345678912",
        email: "tranvanc@example.com",
        estimateCost: "1,000,000,000 VND",
        estimateTime: "24 tháng",
        file: "biotech_research.pdf",
    },
];

const member: I6_2_2Member[] = [
    {
        teacherNumber: "GV001",
        name: "Nguyen Van A",
        level: "PGS, TS",
        unit: "Khoa Khoa học máy tính",
        position: "Chủ nhiệm",
        file: "nguyenvana_cv.pdf",
    },
    {
        teacherNumber: "GV002",
        name: "Le Thi B",
        level: "GS, TS",
        unit: "Khoa Công nghệ thông tin",
        position: "Thành viên",
        file: "lethib_cv.pdf",
    },
    {
        teacherNumber: "GV003",
        name: "Tran Van C",
        level: "ThS",
        unit: "Khoa Công nghệ sinh học",
        position: "Thành viên",
        file: "tranvanc_cv.pdf",
    },
];
