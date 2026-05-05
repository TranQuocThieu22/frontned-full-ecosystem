import { Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MyButtonModal, MyDataTable, MyFieldset, MyFlexColumn } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import EssayGradingExam from './Essay/EssayGradingExam';
import { ExamEntry } from './ExamList';
import SpeechGradingExam from './Speech/SpeechGradingExam';

export default function PendingQuestionList({ QuestionDataType }: { QuestionDataType: ExamEntry }) {
    const disc = useDisclosure()
    const query = useQuery<StudentGradeEntry[]>({
        queryKey: [`StudentGradeEntry`],
        queryFn: async () => mockData
    })
    const columns = useMemo<MRT_ColumnDef<StudentGradeEntry>[]>(
        () => [
            {
                header: "Mã thí sinh",
                accessorKey: "code",
            },
            {
                header: "Họ tên",
                accessorKey: "fullName",
            },
            {
                header: "Câu hỏi",
                accessorKey: "question",
            },
            {
                header: "Kiểu chấm",
                accessorKey: "gradingType",
                accessorFn: (row) => {
                    return row.gradingType === GradingType.Suggestion ? "Gợi ý chấm" : "Rubric";
                }
            },
            {
                header: "Điểm",
                accessorKey: "score",
            },
        ],
        []
    );

    return (
        <MyButtonModal
            modalSize={"80%"}
            disclosure={disc}
            title={'Chi tiết loại câu hỏi'}
            label="Chấm bài"
        >
            <MyFlexColumn>

                <Table withColumnBorders withRowBorders striped highlightOnHover>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td><Text fw={700}>Môn thi</Text></Table.Td>
                            <Table.Td>CSDLCB - Cơ sở dữ liệu cơ bản</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td><Text fw={700}>Nhóm thi</Text></Table.Td>
                            <Table.Td>room1</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td><Text fw={700}>Ngày thi</Text></Table.Td>
                            <Table.Td>25/05/2025</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td><Text fw={700}>Giờ thi</Text></Table.Td>
                            <Table.Td>09:00</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td><Text fw={700}>Thời gian làm bài</Text></Table.Td>
                            <Table.Td>90 phút</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td><Text fw={700}>Loại câu hỏi</Text></Table.Td>
                            <Table.Td>Tự luận</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <MyFieldset title="Danh sách loại câu hỏi cần chấm theo nhóm thi" >
                    <MyDataTable
                        enableRowSelection={false}
                        columns={columns}
                        enableRowNumbers={true}
                        data={query.data!}
                        exportAble={true}
                        renderRowActions={({ row }) => {
                            if (QuestionDataType.questionType === 1) {
                                return <EssayGradingExam QuestionData={row.original} />;
                            }
                            return <SpeechGradingExam QuestionData={row.original} />;
                        }}
                    />
                </MyFieldset >
            </MyFlexColumn>
        </MyButtonModal>
    )
}


enum GradingType {
    Suggestion = 1, // "Gợi ý chấm"
    Rubric = 2
}

export interface StudentGradeEntry {
    code?: string;
    fullName?: string;
    question?: string;
    gradingType?: GradingType; // Now strictly number enum
    score?: number;
}

const mockData: StudentGradeEntry[] = [
    {
        "code": "SV00001",
        "fullName": "Tô Lanh",
        "question": "Trừ khóa chọn trong truy vấn SQL là gì?",
        "gradingType": GradingType.Suggestion,
        "score": 0.5
    },
    {
        "code": "SV00002",
        "fullName": "Tô Nhanh",
        "question": "Trừ khóa chọn trong truy vấn SQL là gì?",
        "gradingType": GradingType.Suggestion,
        "score": 0.5
    },
    {
        "code": "SV00003",
        "fullName": "Tô Mau",
        "question": "Trừ khóa chọn trong truy vấn SQL là gì?",
        "gradingType": GradingType.Suggestion,
        "score": 0.5
    },
    {
        "code": "SV00004",
        "fullName": "Tô Lẹ",
        "question": "Trừ khóa chọn trong truy vấn SQL là gì?",
        "gradingType": GradingType.Rubric,
        "score": 0.5
    }
]
