import { Badge, Checkbox, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { IconCalendar, IconCalendarEvent, IconUser } from '@tabler/icons-react';
import { useQuery } from "@tanstack/react-query";
import { MyDataTable, MyFieldset, MyFlexColumn, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import PendingQuestionList from "./PendingQuestionList";

export default function ExamList() {
    const [suject, setSuject] = useState<string | undefined>("1");
    const query = useQuery<ExamEntry[]>({
        queryKey: [`ExamList`],
        queryFn: async () => mockData
    })



    const columns = useMemo<MRT_ColumnDef<ExamEntry>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "code",
            },
            {
                header: "Tên môn học",
                accessorKey: "name",
            },
            {
                header: "Nhóm thi",
                accessorKey: "examRoom",
            },
            {
                header: "Ngày thi",
                accessorKey: "examDate",
            },
            {
                header: "Giờ bắt đầu",
                accessorKey: "startTime",
            },
            {
                header: "Thời gian thi",
                accessorKey: "examDuration",
            },
            {
                header: "Loại câu hỏi",
                accessorKey: "questionType",
                accessorFn: (row) => {
                    return row.questionType === 1 ? "Tự luận" : "Nói";
                }
            },
            {
                header: "Số câu cần chấm",
                accessorKey: "questionsToGrade",
            },
            {
                header: "Số câu đã chấm",
                accessorKey: "questionsGraded",
            },
            {
                header: "Số câu chưa chấm",
                accessorKey: "questionsUngraded",
            },
            {
                header: "Hoàn thành",
                accessorKey: "completed",
                accessorFn: (row) => <Checkbox defaultChecked={row.completed}></Checkbox>,
            },
        ],
        []
    );




    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyFlexColumn>
            <Paper shadow="sm" p="lg" radius="md" withBorder mb="lg">
                <Stack gap="md">
                    {/* Examiner Info */}
                    <Group align="center" gap="sm">
                        <IconUser size={20} color="var(--mantine-color-blue-6)" />
                        <Text size="lg" fw={600} c="blue">
                            Giám khảo:
                        </Text>
                        <Badge variant="light" color="blue" size="lg">
                            Tô A Báo
                        </Badge>
                    </Group>

                    <Divider />

                    {/* Exam Period Selection */}
                    <MySelect
                        w="100%"
                        size="md"
                        label="Chọn kỳ thi"
                        data={[
                            { value: "1", label: "Z2024T1D1 - Thi cuối học kỳ Đợt 1 năm học 2024 - học kỳ 1" },
                            { value: "2", label: "Z2024T1D2 - Thi cuối học kỳ Đợt 2 năm học 2024 - học kỳ 1" },
                        ]}
                        value={suject}
                        onChange={(value) => setSuject(value ?? undefined)}
                    />

                    {/* Date Range */}
                    <Group justify="space-between" grow>
                        <Paper p="sm" radius="sm" bg="green.0" withBorder>
                            <Group align="center" gap="xs">
                                <IconCalendar size={18} color="var(--mantine-color-green-6)" />
                                <Text size="sm" fw={500} c="green.8">
                                    Ngày bắt đầu:
                                </Text>
                                <Text size="sm" fw={700} c="green.9">
                                    20/03/2025
                                </Text>
                            </Group>
                        </Paper>

                        <Paper p="sm" radius="sm" bg="red.0" withBorder>
                            <Group align="center" gap="xs">
                                <IconCalendarEvent size={18} color="var(--mantine-color-red-6)" />
                                <Text size="sm" fw={500} c="red.8">
                                    Ngày kết thúc:
                                </Text>
                                <Text size="sm" fw={700} c="red.9">
                                    27/03/2025
                                </Text>
                            </Group>
                        </Paper>
                    </Group>
                </Stack>
            </Paper>
            <MyFieldset title="Danh sách loại câu hỏi cần chấm theo nhóm thi" >
                <MyDataTable
                    enableRowSelection={false}
                    columns={columns}
                    enableRowNumbers={true}
                    data={query.data!}
                    exportAble={true}
                    renderRowActions={({ row }) => {
                        return (
                            <PendingQuestionList QuestionDataType={row.original} />
                        )
                    }}
                />
            </MyFieldset >
        </MyFlexColumn>
    )
}


const mockData: ExamEntry[] = [
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room1",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 1,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": true
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room2",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 1,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room3",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 1,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room4",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 1,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room5",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 1,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "TCC",
        "name": "Toán cao cấp",
        "examRoom": "room5",
        "examDate": "25/06/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 1,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room1",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 2,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room2",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 2,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room3",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 2,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room4",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 2,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "CSDLCB",
        "name": "Cơ sở dữ liệu cơ bản",
        "examRoom": "room5",
        "examDate": "25/05/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 2,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    },
    {
        "code": "TCC",
        "name": "Toán cao cấp",
        "examRoom": "room5",
        "examDate": "25/06/2025",
        "startTime": "09:00",
        "examDuration": 90,
        "questionType": 2,
        "questionsToGrade": 20,
        "questionsGraded": 11,
        "questionsUngraded": 9,
        "completed": false
    }
]

enum QuestionType {
    TuLuan = 1, // This translates to "Essay" or "Written"
    Noi = 2         // This translates to "Matching"
}

export interface ExamEntry {
    code?: string;
    name?: string;
    examRoom?: string;
    examDate?: string; // You might consider parsing this to a Date object in your application
    startTime?: string; // You might consider combining with examDate and parsing to a Date object
    examDuration?: number; // Assuming this is in minutes
    questionType?: QuestionType | string; // Using the enum for known types, or string for flexibility
    questionsToGrade?: number;
    questionsGraded?: number;
    questionsUngraded?: number;
    completed?: boolean;
}
