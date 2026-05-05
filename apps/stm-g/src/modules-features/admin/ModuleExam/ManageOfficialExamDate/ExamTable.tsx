'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MyNumberInput } from "aq-fe-framework/components";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IExam, IHoliday } from "./Interfaces/ExamViewModel";

export default function ExamTable() {
    const queryClient = useQueryClient();

    const { data: exams, isLoading, isError } = useQuery<IExam[]>({
        queryKey: [`MOfficialExamDate_AllExams`],
        queryFn: async () => {
            const response = await baseAxios.get("/Exam/GetExam");
            return response.data.data;
        },
    });

    const AllHolidays = useQuery<IHoliday[]>({
        queryKey: [`MOfficialExamDate_AllHolidays`],
        queryFn: async () => {
            const response = await baseAxios.get("/Holiday/GetAll");
            return response.data.data;
        },
    });

    // Stores the full edited rows (instead of a dictionary)
    const [editedExams, setEditedExams] = useState<IExam[]>([]);

    const checkIsHoliday = (officialExamDate: Date | null) => {
        if (!officialExamDate || officialExamDate === null || !AllHolidays.data) return false;

        return AllHolidays.data.some(holiday =>
            dayjs(officialExamDate).isSame(dayjs(holiday.date), 'day')
        );
    }

    // Handle changes for any field
    const handleFieldChange = (row: IExam, fieldName: keyof IExam, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
            fieldValue = null
        }

        if (fieldValue === row[fieldName]) {
            return;
        }

        setEditedExams((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                const updatedExams = [...prev];
                updatedExams[existingIndex] = {
                    ...updatedExams[existingIndex],
                    [fieldName]: fieldValue
                };
                return updatedExams;
            } else {
                return [...prev, {
                    ...row,
                    [fieldName]: fieldValue
                }];
            }
        });
    };

    const columns = useMemo<MRT_ColumnDef<IExam>[]>(() => [
        {
            header: "Mã khóa thi",
            accessorKey: "code",
        },
        {
            header: "Tên khóa thi",
            accessorKey: "name"
        },
        {
            header: "Tên chương trình",
            accessorKey: "program.name"
        },
        {
            header: "Ngày thi",
            accessorKey: "examDate",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.examDate!))
        },
        {
            header: "Số lượng tối đa",
            accessorKey: "maxStudent"
        }, {
            header: "Số lượng đã xếp",
            accessorKey: "courseSectionNumberTotal"
        }, {
            header: "Số lượng chưa xếp",
            accessorKey: "courseSectionNumber"
        },
        {
            header: "Ngày thi chính thức",
            accessorKey: "officialExamDate",
            Cell: ({ row }) => {
                return <DateInput
                    placeholder="chọn ngày"
                    defaultValue={row.original.officialExamDate ? new Date(row.original.officialExamDate) : undefined}
                    onChange={(value) => {
                        handleFieldChange(row.original, "officialExamDate", value ? new Date(value).toISOString() : null)
                        if (checkIsHoliday(new Date(value!)) === true) {
                            notifications.show({
                                title: "Ngày nghỉ",
                                message: "Ngày chọn là ngày nghỉ",
                                color: "red"
                            })
                        }
                    }}
                />
            }
        },
        {
            header: "Số tiết thi",
            accessorKey: "classPeriod",
            Cell: ({ row }) => {
                return <MyNumberInput
                    placeholder="Nhập số tiết"
                    defaultValue={row.original.classPeriod ?? 0}
                    onBlur={(e) => handleFieldChange(row.original, "classPeriod", Number(e.currentTarget.value))}
                />
            }
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedBy",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return U0FormatToDateTimetring(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], [AllHolidays.data]);

    const handleSaveButton = async () => {
        const updatedExams = editedExams.map((exam) => ({
            id: exam.id,
            code: exam.code,
            name: exam.name,
            concurrencyStamp: exam.concurrencyStamp,
            isEnabled: exam.isEnabled,
            programId: exam.programId,
            examDate: exam.examDate,
            roomTypeId: exam.roomTypeId,
            status: exam.status,
            startRegistrationDate: exam.startRegistrationDate,
            endRegistrationDate: exam.endRegistrationDate,
            maxStudent: exam.maxStudent,
            branchId: exam.branchId,
            skillCenterId: exam.skillCenterId,
            officialExamDate: exam.officialExamDate,
            classPeriod: exam.classPeriod,
            examCourses: exam.examCourses
        }));

        let response = await baseAxios.post("/Exam/UpdateList", updatedExams);
        if (response.data.isSuccess === 1) {
            queryClient.invalidateQueries({ queryKey: ["MOfficialExamDate_AllExams"] });
            queryClient.invalidateQueries({ queryKey: ["MOfficialExamDate_AllHolidays"] });
            notifications.show({
                title: "Lưu thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
            setEditedExams([]);
        }
        if (response.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
        }
    };

    if (isLoading) return "Đang tải dữ liệu...";
    if (isError) return "Không có dữ liệu...";

    return (
        <>
            <MyDataTable
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                    columnPinning: {
                        right: ["officialExamDate", "classPeriod"]
                    }
                }}
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={exams!}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button
                            color="blue"
                            onClick={handleSaveButton}
                            disabled={editedExams.length === 0}
                        >
                            Lưu
                        </Button>
                        <Button color="green">Import</Button>
                        <Button color="teal">Export</Button>
                    </Group>
                )}
            />
        </>
    );
}



