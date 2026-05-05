'use client'
import { examSectionService } from "@/shared/APIs/examSectionService";
import { examService } from "@/shared/APIs/examService";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Badge, Flex, Group, Skeleton, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarEvent, IconCalendarX, IconTableExport } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyFieldset, MyFlexColumn, MyFlexRow } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { TAB_CONFIG, TabKey } from "../ModuleExamSection/ExamSectionTable";
import { IExamScheduleInfoViewModel } from "./interfaces/InfoInterface";
import UserListModal from "./UserListModal";

export default function ExamSectionTable() {
    const [tabValue, setTabValue] = useState<TabKey>("UPCOMING");
    const [examId, setExamId] = useState<string | undefined>(undefined);
    const statusForApi = TAB_CONFIG[tabValue].value;
    const examListQuery = useMyReactQuery({
        queryKey: ['examListQuery'],
        axiosFn: async () => examService.getAll()
    });
    const dis = useDisclosure();

    // Get selected exam details
    const selectedExam = examListQuery.data?.find((exam: any) => exam.id?.toString() === examId);

    // API call that reacts to both examId and tabValue changes
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

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã môn học", accessorKey: "maMonHoc" },
        { header: "Tên môn học", accessorKey: "tenMonHoc" },
        { header: "Nhóm thi", accessorKey: "nhomThi" },
        { header: "Ngày thi", accessorKey: "ngayThi" },
        { header: "Giờ bắt đầu", accessorKey: "gioBatDau" },
        { header: "Thời gian thi", accessorKey: "thoiGianThi" },
        { header: "Số câu cần chấm", accessorKey: "soCauCanCham" },
        { header: "Số câu đã chấm", accessorKey: "soCauDaCham" },
        { header: "Số câu chưa chấm", accessorKey: "soCauChuaCham" },
        {
            header: "Giám khảo", accessorKey: "giamKhao",
            accessorFn: (row) => {
                return (
                    <Group grow>
                        <UserListModal examSectionData={row} examinerData={row.giamKhao || ""} />
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
                    <Flex direction="column" mt={10}>
                        <Text fw="500" size="sm">Loại câu hỏi</Text>
                        <Group align="center">
                            <CustomSelect
                                data={
                                    [
                                        { value: "1", label: "Tự luận" },
                                        { value: "2", label: 'Nói' }
                                    ]
                                }
                                defaultValue={"1"}
                                // onChange={(value) => {
                                //     if (value) {
                                //         setExamId(value);
                                //     }
                                // }}
                                searchable={false}
                                clearable={false}
                                styles={{
                                    input: {
                                        borderRadius: '8px',
                                        border: '1px solid var(--mantine-color-gray-3)',
                                        backgroundColor: 'var(--mantine-color-gray-0)',
                                        height: '50px',
                                        fontWeight: 500,
                                        '&:focus': {
                                            borderColor: 'var(--mantine-color-blue-6)',
                                            backgroundColor: 'white',
                                        }
                                    },
                                    wrapper: {
                                        '& .mantineSelectDropdown': {
                                            borderRadius: '8px',
                                            border: '1px solid var(--mantine-color-gray-3)',
                                        }
                                    }
                                }}
                            />
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
                    data={mockData || []}
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


const mockData: IExamScheduleInfoViewModel[] = [
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