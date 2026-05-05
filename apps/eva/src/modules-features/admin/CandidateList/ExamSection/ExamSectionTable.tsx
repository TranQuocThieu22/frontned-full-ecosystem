import { examSectionService } from "@/shared/APIs/examSectionService";
import { examService } from "@/shared/APIs/examService";
import { Badge, Group, Skeleton } from "@mantine/core";
import { IconCalendarEvent, IconCalendarX } from "@tabler/icons-react";
import { MyCenterFull, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import CandidateList from "../CandidateList";

export default function ExamSectionTable() {
    const [examId, setExamId] = useState<string | undefined>(undefined);
    const examListQuery = useMyReactQuery({
        queryKey: ['examListQuery'],
        axiosFn: async () => examService.getAll()
    });
    const paginationState = useState({ pageIndex: 0, pageSize: 5 });
    const selectedExam = examListQuery.data?.find((exam: any) => exam.id?.toString() === examId);

    const examSectionList = useMyReactQuery({
        queryKey: ['examSectionList', examId, paginationState[0].pageSize, paginationState[0].pageIndex + 1],
        axiosFn: async () => {
            return examSectionService.getExamSectionsByExamId({
                examId: Number(examId)
            });
        },
        options: {
            enabled: !!examId,
            refetchOnWindowFocus: false,
        }
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "subjectCode",

            },
            {
                header: "Tên môn học",
                accessorKey: "subjectName",
                size: 500
            },
            {
                header: "Nhóm thi",
                accessorKey: "group",
                size: 230


            },
            {
                header: "Ngày thi",
                accessorKey: "startDate",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow?.startDate || ''))
                },
            },
            {
                header: "Giờ bắt đầu",
                accessorKey: "startTime",

            },
            {
                header: "Thời gian thi",
                accessorKey: "duration",
                size: 250
            },
            {
                header: "Quy tắc làm tròn điểm",
                accessorKey: "roundRule",
                accessorFn(originalRow) {
                    const rule = quyTacLamTron.find(item => item.id === originalRow.roundRule);
                    return rule ? rule.name : "";
                },

            },
            {
                header: "Ghi chú",
                accessorKey: "note"
            },

            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },

            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",

            // },

        ],
        []
    );
    useEffect(() => {
        if (!examListQuery.data?.length) return;

        // Only set default if not already selected
        if (!examId) {
            setExamId(examListQuery.data[0]?.id?.toString());
        }
    }, [examListQuery.data, examId]);
    return (
        <>
            <Skeleton m={10} visible={examListQuery.isLoading}>
                <Group align="flex-end" >
                    <MySelect
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
            <MyFieldset title="Danh sách ca thi">
                <MyDataTable
                    pagination={paginationState[0]}
                    onPaginationChange={paginationState[1]}
                    isLoading={examSectionList.isLoading}
                    isError={examSectionList.isError}
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    exportAble
                    data={examSectionList.data || []}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <CandidateList data={row.original} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFieldset>

        </>
    )
}
const monHocData = [
    { id: 1, code: '2024T1D1', name: 'CSDLCB - Thi cuối kỳ Đợt 1 năm học 2024 - học kỳ 1' },

];

const kyThiData = [
    {
        "Subject_Code": "CSDLCB",
        "Subject_Name": "Cơ sở dữ liệu cơ bản",
        "Group": "room1",
        "Exam_Date": "25/05/2025",
        "Start_Time": "09:00",
        "Exam_Duration": 90,
        "Grading_Rule": 0.25,
        "Notes": null
    },
    {
        "Subject_Code": "CSDLCB",
        "Subject_Name": "Cơ sở dữ liệu cơ bản",
        "Group": "room2",
        "Exam_Date": "25/05/2025",
        "Start_Time": "09:00",
        "Exam_Duration": 90,
        "Grading_Rule": 0.25,
        "Notes": null
    },
    {
        "Subject_Code": "CSDLCB",
        "Subject_Name": "Cơ sở dữ liệu cơ bản",
        "Group": "room3",
        "Exam_Date": "25/05/2025",
        "Start_Time": "09:00",
        "Exam_Duration": 90,
        "Grading_Rule": 0.25,
        "Notes": null
    },
    {
        "Subject_Code": "CSDLCB",
        "Subject_Name": "Cơ sở dữ liệu cơ bản",
        "Group": "room4",
        "Exam_Date": "25/05/2025",
        "Start_Time": "09:00",
        "Exam_Duration": 90,
        "Grading_Rule": 0.25,
        "Notes": null
    },
    {
        "Subject_Code": "CSDLCB",
        "Subject_Name": "Cơ sở dữ liệu cơ bản",
        "Group": "room5",
        "Exam_Date": "25/05/2025",
        "Start_Time": "09:00",
        "Exam_Duration": 90,
        "Grading_Rule": 0.25,
        "Notes": null
    },
    {
        "Subject_Code": "TCC",
        "Subject_Name": "Toán cao cấp",
        "Group": "room5",
        "Exam_Date": "25/05/2025",
        "Start_Time": "09:00",
        "Exam_Duration": 90,
        "Grading_Rule": 0.25,
        "Notes": null
    }
]
const quyTacLamTron = [
    { id: 1, code: '025', name: '0.25' },
    { id: 2, code: '05', name: '0.5' },
    { id: 3, code: '01', name: '0.1' },
]