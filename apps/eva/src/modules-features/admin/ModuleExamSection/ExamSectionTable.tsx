'use client'

import { IExamSection, examSectionService } from "@/shared/APIs/examSectionService";
import { examService } from "@/shared/APIs/examService";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Badge, Flex, Group, Skeleton, Tabs, Text } from "@mantine/core";
import { IconCalendarEvent, IconCalendarX, IconTableExport } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import CandidatesListModal from "./CandidatesListModal";

// Export enum as requested
export enum ExamSectionStatus {
    UPCOMING = 1,
    ONGOING = 2,
    FINISHED = 3,
}

// Tab configuration with cleaner mapping
export const TAB_CONFIG = {
    UPCOMING: { value: ExamSectionStatus.UPCOMING, label: "Sắp diễn ra" },
    ONGOING: { value: ExamSectionStatus.ONGOING, label: "Đang diễn ra" },
    FINISHED: { value: ExamSectionStatus.FINISHED, label: "Đã kết thúc" },
    ALL: { value: null, label: "Tất cả" },
} as const;

export type TabKey = keyof typeof TAB_CONFIG;

export const VIETNAMESE_STATUS_LABELS: Record<ExamSectionStatus, string> = {
    [ExamSectionStatus.UPCOMING]: "Sắp diễn ra",
    [ExamSectionStatus.ONGOING]: "Đang diễn ra",
    [ExamSectionStatus.FINISHED]: "Đã kết thúc",
};

export default function ExamSectionTable() {
    const [tabValue, setTabValue] = useState<TabKey>("UPCOMING");
    const [examId, setExamId] = useState<string | undefined>(undefined);
    const statusForApi = TAB_CONFIG[tabValue].value;
    const examListQuery = useMyReactQuery({
        queryKey: ['examListQuery'],
        axiosFn: async () => examService.getAll()
    });
    const selectedExam = examListQuery.data?.find((exam: any) => exam.id?.toString() === examId);
    const examSectionList = useMyReactQuery({
        queryKey: ['examSectionList', examId, statusForApi],
        axiosFn: async () => {
            return examSectionService.getExamSectionsByExamId({ examId: Number(examId) || 0 });
        },
    });

    const columns = useMemo<MRT_ColumnDef<IExamSection>[]>(() => [
        { header: "Mã môn học", accessorKey: "subjectCode" },
        { header: "Tên môn học", accessorKey: "subjectName" },
        { header: "Nhóm thi", accessorKey: "group" },
        {
            header: "Ngày thi",
            accessorKey: "startDate",
            accessorFn(originalRow) {
                return dateUtils.toDDMMYYYY(new Date(originalRow?.startDate || ''))
            },
        },
        { header: "Giờ bắt đầu", accessorKey: "startTime" },
        { header: "Thời gian thi", accessorKey: "duration" },
        {
            header: "Quy tắc làm tròn điểm",
            accessorKey: "roundRule",
            accessorFn(originalRow) {
                const rule = quyTacLamTron.find(item => item.id === originalRow.roundRule);
                return rule ? rule.name : "";
            },
        },
        { header: "Ghi chú", accessorKey: "note" },
        {
            header: "Số lượng",
            id: "userCount",
            accessorFn: (row) => Array.isArray(row.studentIds) ? row.studentIds.length : 0,
            Cell: ({ row }) => <CandidatesListModal ExamSectiondData={row.original} />,
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: row => VIETNAMESE_STATUS_LABELS[row.status as ExamSectionStatus] ?? "Không xác định",
        },
    ], []);
    useEffect(() => {
        if (!examListQuery.data?.length) return;
        if (!examId) {
            setExamId(examListQuery.data[0]?.id?.toString());
        }
    }, [examListQuery.data, examId]);

    return (
        <MyFlexColumn>
            <Flex direction="column">
                <Skeleton visible={examListQuery.isLoading}>
                    <Group align="flex-end" >
                        <CustomSelect
                            w={400}
                            label="Chọn kỳ thi"
                            data={
                                examListQuery.data
                                    ? examListQuery.data.map((exam: any) => ({
                                        value: exam.id?.toString() || "",
                                        label: `${exam.code} - ${exam.name}` || "Unnamed Exam"
                                    }))
                                    : []
                            }
                            value={examId}
                            onChange={(value) => {
                                if (value) {
                                    setExamId(value);
                                }
                            }}
                            searchable={false}
                            clearable={false}
                        />
                        <Group pb="8px" gap="md">
                            <Badge
                                variant="light"
                                color="green"
                                size="lg"
                                radius="sm"
                                leftSection={<IconCalendarEvent size={14} />}
                            >
                                Ngày bắt đầu: {dateUtils.toDDMMYYYY(new Date(selectedExam?.startDate || '')) || "N/A"}
                            </Badge>
                            <Badge
                                variant="light"
                                color="red"
                                size="lg"
                                radius="sm"
                                leftSection={<IconCalendarX size={14} />}
                            >
                                Ngày kết thúc: {dateUtils.toDDMMYYYY(new Date(selectedExam?.endDate || '')) || "N/A"}
                            </Badge>
                        </Group>
                    </Group>
                </Skeleton>

                <Flex direction="column" mt={10}>
                    <Text fw="500" size="sm">Trạng thái</Text>
                    <Group>
                        <Tabs
                            variant="pills"
                            mt={2}
                            value={tabValue}
                            onChange={(value) => {
                                if (value && value in TAB_CONFIG) {
                                    setTabValue(value as TabKey);
                                }
                            }}
                        >
                            <Tabs.List bg="gray.0" p="xs" style={{ borderRadius: '8px', border: '1px solid var(--mantine-color-gray-3)' }}>
                                {Object.entries(TAB_CONFIG).map(([key, config]) => (
                                    <Tabs.Tab
                                        key={key}
                                        value={key}
                                        fw={500}
                                        c={tabValue === key ? "white" : "gray.7"}
                                        style={{
                                            borderRadius: '6px',
                                            transition: 'all 0.2s ease',
                                        }}
                                        styles={{
                                            tab: {
                                                '&[dataActive]': {
                                                    backgroundColor: 'var(--mantine-color-blue-6)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                },
                                                '&:hover:not([dataActive])': {
                                                    backgroundColor: 'var(--mantine-color-gray-1)',
                                                }
                                            }
                                        }}
                                    >
                                        {config.label}
                                    </Tabs.Tab>
                                ))}
                            </Tabs.List>
                        </Tabs>
                    </Group>
                </Flex>
            </Flex>

            <MyFieldset title="Danh sách ca thi">
                <MyDataTable
                    isLoading={examSectionList.isLoading}
                    isError={examSectionList.isError}
                    enableRowSelection
                    enableRowNumbers
                    columns={columns}
                    data={examSectionList.data || []}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                        </Group>
                    )}
                />
            </MyFieldset>
        </MyFlexColumn>
    );
}
const quyTacLamTron = [
    { id: 1, code: '025', name: '0.25' },
    { id: 2, code: '05', name: '0.5' },
    { id: 3, code: '01', name: '0.1' },
]