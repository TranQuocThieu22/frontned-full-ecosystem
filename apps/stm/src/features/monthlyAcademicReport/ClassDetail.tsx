import { Grid, Group, Stack, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ClassDetail() {
    const disc = useDisclosure();
    const columns = useMemo<MRT_ColumnDef<StudentPerformance>[]>(
        () => [
            {
                accessorKey: "studentId",
                header: "Mã học sinh",
            },
            {
                accessorKey: "fullName",
                header: "Họ và tên HS",
            },
            {
                accessorKey: "parentPhoneNumber",
                header: "SĐT Phụ huynh",
            },
            {
                accessorKey: "studentStatus",
                header: "Trạng thái HS",
            },
            {
                accessorKey: "studentNotes",
                header: "Ghi chú chung HS",
                size: 300
            },
            {
                accessorKey: "b1_attendanceStatus",
                header: "Điểm Danh B1",
            },
            {
                accessorKey: "b1_initialScore",
                header: "Điểm gốc BTVN B1",
                // You might want to format numbers if needed, e.g., Cell: ({ cell }) => cell.getValue<number>().toFixed(1)
            },
            {
                accessorKey: "b1_homeworkScores",
                header: "Điểm sửa BTVN B1",
            },
            {
                accessorKey: "b1_notes",
                header: "Nhận xét B1",
            },
            {
                accessorKey: "b1_teacherNotes",
                header: "Ghi chú bù GV B1",
                size: 300
            },
            {
                accessorKey: "b1_ticker",
                header: "Thưởng Ticker B1",
            },
            {
                accessorKey: "b2_attendanceStatus",
                header: "Điểm Danh B2",
            },
            {
                accessorKey: "b2_initialScore",
                header: "Điểm gốc BTVN B2",
            },
            {
                accessorKey: "b2_homeworkScores",
                header: "Điểm sửa BTVN B2",
            },
            {
                accessorKey: "b2_notes",
                header: "Nhận xét B2",
            },
            {
                accessorKey: "b2_teacherNotes",
                header: "Ghi chú bù GV B2",
                size: 300
            },
            {
                accessorKey: "b2_ticker",
                header: "Thưởng Ticker B2",
            },
            {
                accessorKey: "b3_attendanceStatus",
                header: "Điểm Danh B3",
            },
            {
                accessorKey: "b3_initialScore",
                header: "Điểm gốc BTVN B3",
            },
            {
                accessorKey: "b3_homeworkScores",
                header: "Điểm sửa BTVN B3",
            },
            {
                accessorKey: "b3_notes",
                header: "Nhận xét B3",
            },
            {
                accessorKey: "b3_teacherNotes",
                header: "Ghi chú bù GV B3",
                size: 300
            },
            {
                accessorKey: "b3_ticker",
                header: "Thưởng Ticker B3",
            },
            {
                accessorKey: "b4_attendanceStatus",
                header: "Điểm Danh B4",
            },
            {
                accessorKey: "b4_initialScore",
                header: "Điểm gốc BTVN B4",
            },
            {
                accessorKey: "b4_homeworkScores",
                header: "Điểm sửa BTVN B4",
            },
            {
                accessorKey: "b4_notes",
                header: "Nhận xét B4",
            },
            {
                accessorKey: "b4_teacherNotes",
                header: "Ghi chú bù GV B4",
                size: 300
            },
            {
                accessorKey: "b4_ticker",
                header: "Thưởng Ticker B4",
            },
            {
                accessorKey: "totalInformationTicker",
                header: "Tổng Ticket tháng",
            },
            {
                accessorKey: "monthlyTestScore",
                header: "Kiểm tra tháng",
            },
            {
                accessorKey: "attendedClasses",
                header: "Số buổi đi học",
            },
            {
                accessorKey: "missedClassesCCG",
                header: "Số buổi CCG",
            },
            {
                accessorKey: "averageHomeworkScore",
                header: "Trung bình BTVN",
            },
            {
                accessorKey: "summary",
                header: "Tổng hợp",
                // If you want to render the multiline string with line breaks
                Cell: ({ cell }) => <div style={{ whiteSpace: 'pre-wrap' }}>{cell.getValue<string>()}</div>,
            },
            {
                accessorKey: "level",
                header: "Mức độ",
            },
        ],
        []
    );

    return (
        <MyButtonModal
            label="Xem chi tiết"
            title="Tổng hợp tháng"
            disclosure={disc}
            modalSize="90%">
            <Grid>
                <Grid.Col span={6}>
                    <Stack gap="md">
                        <Text w={600} size="xl" color="blue.8" mb="sm">
                            {classInfo.title}
                        </Text>

                        <Grid gutter="md">
                            <Grid.Col span={6}>
                                <Group gap="xs" align="center">
                                    <Text size="sm" w={500} color="gray.7" style={{ minWidth: "120px" }}>
                                        Ngày khai giảng:
                                    </Text>
                                    <Text size="sm" w={500} color="dark.8">
                                        {classInfo.startDate}
                                    </Text>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Group gap="xs" align="center">
                                    <Text size="sm" w={500} color="gray.7" style={{ minWidth: "80px" }}>
                                        Phòng học:
                                    </Text>
                                    <Text size="sm" w={500} color="dark.8">
                                        {classInfo.room}
                                    </Text>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Group gap="xs" align="center">
                                    <Text size="sm" w={500} color="gray.7" style={{ minWidth: "80px" }}>
                                        Giáo viên:
                                    </Text>
                                    <Text size="sm" w={500} color="dark.8">
                                        {classInfo.instructor}
                                    </Text>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Group gap="xs" align="center">
                                    <Text size="sm" w={500} color="gray.7" style={{ minWidth: "80px" }}>
                                        Trợ giảng:
                                    </Text>
                                    <Text size="sm" w={500} color="dark.8">
                                        {classInfo.assistants.join(", ")}
                                    </Text>
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Table
                        striped
                        highlightOnHover
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th >Phân loại</Table.Th>
                                <Table.Th >Số lượng</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {studentSummary.map((item) => (
                                <Table.Tr key={item.id}>
                                    <Table.Td >{item.status}</Table.Td>
                                    <Table.Td >{item.quantity}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Grid.Col>
            </Grid>

            <MyFieldset title="Danh sách phản hồi" >
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={studentPerformanceData!}

                />
            </MyFieldset >
        </MyButtonModal>
    );
} const classInfo = {
    title: "Báng tổng hợp kết quả học tập tháng 5/2024",
    startDate: "21/02/2024",
    room: "P402 - Cầu Giấy",
    instructor: "Giáo Xuân Trường",
    assistants: ["Trình Quý Phát", "Nguyễn Thanh Thảo"]
};

const studentSummary = [
    {
        id: 1,
        status: "Đang học",
        quantity: 27,
    },
    {
        id: 2,
        status: "Học sinh mới",
        quantity: 2,
    },
    {
        id: 3,
        status: "Nghỉ hẳn",
        quantity: 1,
    },
    {
        id: 4,
        status: "Chuyển vào",
        quantity: 0,
    },
    {
        id: 5,
        status: "Chuyển đi",
        quantity: 1,
    },
];

interface StudentPerformance {
    studentId: string;
    fullName: string;
    parentPhoneNumber: string;
    studentStatus: string;
    studentNotes: string;

    // Semester B1 (Học Kì B1)
    b1_attendanceStatus: string; // Điểm Danh B1
    b1_initialScore: number; // Điểm gốc BTVN B1
    b1_homeworkScore: number; // Điểm BTVN B1
    b1_notes: string; // Nhận xét B1
    b1_teacherNotes: string; // Ghi chú GV B1
    b1_ticker: number; // Ticker B1

    // Semester B2 (Học Kì B2)
    b2_attendanceStatus: string; // Điểm Danh B2
    b2_initialScore: number; // Điểm gốc BTVN B2
    b2_homeworkScore: number; // Điểm BTVN B2
    b2_notes: string; // Nhận xét B2
    b2_teacherNotes: string; // Ghi chú GV B2
    b2_ticker: number; // Ticker B2

    // Semester B3 (Học Kì B3)
    b3_attendanceStatus: string; // Điểm Danh B3
    b3_initialScore: number; // Điểm gốc BTVN B3
    b3_homeworkScore: number; // Điểm BTVN B3
    b3_notes: string; // Nhận xét B3
    b3_teacherNotes: string; // Ghi chú GV B3
    b3_ticker: number; // Ticker B3

    // Semester B4 (Học Kì B4)
    b4_attendanceStatus: string; // Điểm Danh B4
    b4_initialScore: number; // Điểm gốc BTVN B4
    b4_homeworkScore: number; // Điểm BTVN B4
    b4_notes: string; // Nhận xét B4
    b4_teacherNotes: string; // Ghi chú GV B4
    b4_ticker: number; // Ticker B4

    totalInformationTicker: number; // Tổng thông (This column seems to be a total 'ticker' or count)

    // Monthly Check (Kiểm tra hàng tháng)
    monthlyTestScore: number; // Kiểm tra tháng
    attendedClasses: number; // Số buổi đi học
    missedClassesCCG: number; // Số buổi CCG (Likely 'Course Completion Guide' or similar)
    averageHomeworkScore: number; // Trung bình BTVN

    // Summary (Tổng hợp) - This is a complex string, keeping it as string for now
    summary: string;
    level: string; // Mức độ
}

const studentPerformanceData: StudentPerformance[] = [
    {
        studentId: "CG23-01030",
        fullName: "Nguyễn Ngọc Trang Anh",
        parentPhoneNumber: "0974681998",
        studentStatus: "Đang học",
        studentNotes: "Chưa làm bài tập thường xuyên",

        b1_attendanceStatus: "Đi học",
        b1_initialScore: 6,
        b1_homeworkScore: 6,
        b1_notes: "Thiếu bài bổ",
        b1_teacherNotes: "", // Ghi chú GV B1 - Assuming this is the 'ticker' value
        b1_ticker: 1,

        b2_attendanceStatus: "Đi học",
        b2_initialScore: 8,
        b2_homeworkScore: 8,
        b2_notes: "Thiếu bài",
        b2_teacherNotes: "", // Ghi chú GV B2
        b2_ticker: 1,

        b3_attendanceStatus: "Đi học",
        b3_initialScore: 6.5,
        b3_homeworkScore: 6.5,
        b3_notes: "Thiếu bài bổ sung",
        b3_teacherNotes: "", // Ghi chú GV B3
        b3_ticker: 1,

        b4_attendanceStatus: "Đi học",
        b4_initialScore: 6.5,
        b4_homeworkScore: 6.5,
        b4_notes: "Sai dấu tt",
        b4_teacherNotes: "", // Ghi chú GV B4
        b4_ticker: 1,
        totalInformationTicker: 4,

        monthlyTestScore: 7.5,
        attendedClasses: 4,
        missedClassesCCG: 1,
        averageHomeworkScore: 6.63,
        summary: "\"Chuyên cần: 4/4\nKhông làm & CCG: 1/4\nTB điểm BTVN: 6.625\nĐiểm kiểm tra: 7.5\"",
        level: "Mức 1",
    },
    {
        studentId: "CG24-01159",
        fullName: "Nguyễn Quốc Minh Châu",
        parentPhoneNumber: "0964252508",
        studentStatus: "Đang học",
        studentNotes: "", // Appears empty

        b1_attendanceStatus: "Đi học",
        b1_initialScore: 8.5,
        b1_homeworkScore: 8.5,
        b1_notes: "Tỉ tỉ tiêu ý",
        b1_teacherNotes: "",
        b1_ticker: 1,

        b2_attendanceStatus: "Đi học",
        b2_initialScore: 9.5,
        b2_homeworkScore: 9.5,
        b2_notes: "Rất tốt",
        b2_teacherNotes: "",
        b2_ticker: 1,

        b3_attendanceStatus: "Đi học",
        b3_initialScore: 9,
        b3_homeworkScore: 9,
        b3_notes: "Xuất sắc",
        b3_teacherNotes: "",
        b3_ticker: 1,

        b4_attendanceStatus: "Đi học",
        b4_initialScore: 9,
        b4_homeworkScore: 9,
        b4_notes: "Tốt",
        b4_teacherNotes: "",
        b4_ticker: 1,
        totalInformationTicker: 4,

        monthlyTestScore: 9.0,
        attendedClasses: 4,
        missedClassesCCG: 0,
        averageHomeworkScore: 9.0,
        summary: "\"Chuyên cần: 4/4\nKhông làm & CCG: 0/4\nTB điểm BTVN: 9.0\nĐiểm kiểm tra: 9.0\"",
        level: "Mức 1",
    },
    {
        studentId: "CG23-00895",
        fullName: "Phạm Ngô Khánh Diệp",
        parentPhoneNumber: "0969170494",
        studentStatus: "Đang học",
        studentNotes: "", // Appears empty

        b1_attendanceStatus: "Đi học",
        b1_initialScore: 6.5,
        b1_homeworkScore: 7,
        b1_notes: "Thiếu bài ít sơ đầu",
        b1_teacherNotes: "",
        b1_ticker: 1,

        b2_attendanceStatus: "Đi học",
        b2_initialScore: 6,
        b2_homeworkScore: 6,
        b2_notes: "Hoàn thành",
        b2_teacherNotes: "",
        b2_ticker: 1,

        b3_attendanceStatus: "Đi học",
        b3_initialScore: 7.5,
        b3_homeworkScore: 7.5,
        b3_notes: "Cần cải thiện",
        b3_teacherNotes: "",
        b3_ticker: 1,

        b4_attendanceStatus: "Đi học",
        b4_initialScore: 7,
        b4_homeworkScore: 7,
        b4_notes: "Khá tốt",
        b4_teacherNotes: "",
        b4_ticker: 1,
        totalInformationTicker: 4,

        monthlyTestScore: 7.0,
        attendedClasses: 4,
        missedClassesCCG: 0,
        averageHomeworkScore: 6.75,
        summary: "\"Chuyên cần: 4/4\nKhông làm & CCG: 0/4\nTB điểm BTVN: 6.75\nĐiểm kiểm tra: 7.0\"",
        level: "Mức 2",
    },
];