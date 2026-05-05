'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString, utils_date_getWeekDay } from "@/utils/date";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import AttendanceTableButtonModal from "./AttendanceTableButtonModal";
import { ICourseSectionSchedule } from "./interface";

dayjs.extend(customParseFormat);

export default function CourseSectionScheduleTable() {
    const selectedDate = useState<Date | null>(new Date());
    const refSelectedDate = useRef<HTMLInputElement>(null);

    const AllClassSchedule = useQuery<ICourseSectionSchedule[]>({
        queryKey: [`CheckAttendanceTable`],
        queryFn: async () => {
            const formattedDate = dayjs(selectedDate[0]).format('YYYY-MM-DD HH:mm:ss.SSS');
            const response = await baseAxios.get(`/CourseSection/GetScheduleByDate?date=${formattedDate}`);
            return response.data.data
        },
        refetchOnWindowFocus: false,
    })

    const validateInputDate = () => {
        if (refSelectedDate.current) {
            const inputValue = refSelectedDate.current.value;
            const formats = ['dddd DD/MM/YYYY', 'dddd D/MM/YYYY', 'dddd DD/M/YYYY', 'dddd D/M/YYYY'];
            const isValid = formats.some(format => dayjs(inputValue, format, true).isValid());
            if (!isValid) {
                return false;
            }
            return true;
        }
    }

    useEffect(() => {
        let isValid = validateInputDate();
        if (selectedDate[0] !== null && isValid) {
            AllClassSchedule.refetch();
        }
    }, [selectedDate]);

    const columns = useMemo<MRT_ColumnDef<ICourseSectionSchedule>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "courseSection.code",
        },
        {
            header: "Sĩ số",
            accessorKey: "courseSection.quantityStudentActual",
            size: 120
        },
        {
            header: "Hiện diện",
            accessorKey: "attendenceNumber",
            size: 160
        },
        {
            header: "môn học",
            accessorKey: "subjectName",
        },
        {
            header: "Mã giảng viên",
            accessorFn(originalRow) {
                return originalRow.courseSectionScheduleLecturer?.map(x => x.user?.code!).join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionScheduleLecturer?.map(x => x.user?.code!).join("\n")}
                        </div>
                    </>
                )
            }
        },
        {
            header: "Tên giảng viên",
            accessorFn(originalRow) {
                return originalRow.courseSectionScheduleLecturer?.map(x => x.user?.fullName!).join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.courseSectionScheduleLecturer?.map(x => x.user?.fullName!).join("\n")}
                        </div>
                    </>
                )
            }
        },
        {
            header: "Phòng",
            accessorKey: "address.name",
            size: 120
        },
        {
            header: "Sức chứa",
            accessorKey: "address.capacity",
            size: 120
        },
        {
            header: "Ngày",
            accessorKey: "classDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.startDate!));
            },

        },
        {
            header: "Thứ",
            accessorFn(originalRow) {
                return utils_date_getWeekDay(new Date(originalRow.startDate!), "vi");
            },
        },
        {
            header: "Tiết bắt đầu",
            accessorKey: "classPeriodStart",
            size: 150
        },
        {
            header: "Số tiết",
            accessorFn(originalRow) {
                return originalRow.classPeriodEnd! - originalRow.classPeriodStart! + 1;
            },
            size: 120
        },
        {
            header: "Số phút",
            accessorKey: "totalMinute"
        },
        {
            header: "Trạng thái",
            accessorFn(originalRow) {
                return DisplayCSScheduleStatus(originalRow.status!);
            },
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
            },
        }
    ], []);

    return (
        <MyDataTable
            columns={columns}
            data={AllClassSchedule.data! || []}
            renderTopToolbarCustomActions={() => {
                return (
                    <>
                        <DateInput
                            valueFormat="dddd DD/MM/YYYY"
                            label="Lịch học"
                            placeholder="Chọn ngày"
                            defaultValue={selectedDate[0]}
                            onChange={(date,) => {
                                selectedDate[1](new Date(date!));
                            }}
                            ref={refSelectedDate}
                        />
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <AttendanceTableButtonModal csScheduleValues={row.original!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

const DisplayCSScheduleStatus = (status: number) => {
    switch (status) {
        case 1:
            return "Đang học";
        case 2:
            return "Đã kết thúc";
        case 3:
            return "Đã hủy";
        default:
            return "Chưa có trạng thái";
    }
}