'use client'
import { IExamSection, examSectionService } from "@/shared/APIs/examSectionService";
import { examService } from "@/shared/APIs/examService";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Badge, Flex, Group, Skeleton, Tabs, Text } from "@mantine/core";
import { IconCalendarEvent, IconCalendarX, IconTableExport } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyFieldset, MyFlexColumn, MyFlexRow } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import CandidatesListModal from "./CandidatesListModal";
import LecturersList from "./LecturersList";
import StatusView from "./StatusView";
import { ExamSectionStatus, TAB_CONFIG, TabKey, VIETNAMESE_STATUS_LABELS } from "./types";
;

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
            const params = new URLSearchParams();
            params.append('examId', examId || '');
            if (statusForApi) {
                params.append('status', statusForApi.toString());
            }
            return examSectionService.getExamSectionsByExamId({ param: `${params.toString()}` });
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
                return utils_date_dateToDDMMYYYString(new Date(originalRow?.startDate || ''))
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
            id: "userCount", // Use id instead of accessorKey when using accessorFn
            accessorFn: (row) => {
                console.log('row.studentIds', row.studentIds?.length);
                console.log(Array.isArray(row.studentIds) && row.studentIds.length > 0 ? row.studentIds.length : 0);

                return Array.isArray(row.studentIds) && row.studentIds.length > 0 ? row.studentIds.length : 0

            },
            Cell: ({ row }) => <CandidatesListModal ExamSectiondData={row.original} />,
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: row => VIETNAMESE_STATUS_LABELS[row.status as ExamSectionStatus] ?? "Không xác định",
            Cell: ({ row }) => <StatusView row={row} />
        },
        {
            header: "Phụ trách", accessorKey: "lecturers",
            accessorFn: (row) => {
                return (
                    <Group grow>
                        <LecturersList
                            examSectionData={row}
                            lecturerList={row.lecturers || []}
                        />
                    </Group>
                )
            }
        },
    ], []);
    useEffect(() => {
        if (!examListQuery.data?.length) return;

        // Only set default if not already selected
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
                                Ngày bắt đầu: {utils_date_dateToDDMMYYYString(new Date(selectedExam?.startDate || '')) || "N/A"}
                            </Badge>
                            <Badge
                                variant="light"
                                color="red"
                                size="lg"
                                radius="sm"
                                leftSection={<IconCalendarX size={14} />}
                            >
                                Ngày kết thúc: {utils_date_dateToDDMMYYYString(new Date(selectedExam?.endDate || '')) || "N/A"}
                            </Badge>
                        </Group>
                    </Group>
                </Skeleton>

                <MyFlexRow>
                    <Flex direction="column" mt={10}>
                        <Text fw="500" size="sm">Trạng thái</Text>
                        <Group align="center">
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
                                <Tabs.List
                                    bg="gray.0"
                                    p="xs"
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid var(--mantine-color-gray-3)',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
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

                </MyFlexRow>
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

const mockData: any[] = [
    {
        id: 1,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room1",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh"
    },
    {
        id: 2,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room2",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh"
    },
    {
        id: 3,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room3",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh"
    },
    {
        id: 4,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room4",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Đã kết thúc",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh"
    },
    {
        id: 5,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room5",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Đang diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: ""
    },
    {
        id: 6,
        maMonHoc: "TCC",
        tenMonHoc: "Toán cao cấp",
        nhomThi: "room5",
        ngayThi: "25/06/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh"
    }
];