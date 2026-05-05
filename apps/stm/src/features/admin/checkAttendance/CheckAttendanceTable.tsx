'use client'
import { utils_date_dateToDDMMYYYString, utils_date_getWeekDay } from "@/utils/date";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useMemo, useRef, useState } from "react";
import AttendanceTableButtonModal from "./CheckAttendanceTableButtonModal";
import { ICourseSectionSchedule } from "./interfaces";

dayjs.extend(customParseFormat);

export default function CheckAttendanceTable() {
  const selectedDate = useState<Date | null>(new Date());
  const refSelectedDate = useRef<HTMLInputElement>(null);

  const classScheduleQuery = useCustomReactQuery<ICourseSectionSchedule[]>({
    queryKey: ["CheckAttendanceTable", selectedDate[0]],
    axiosFn: async () => {
      const formattedDate = dayjs(selectedDate[0]).format("YYYY-MM-DD HH:mm:ss.SSS");
      return baseAxios.get(`/CourseSection/GetScheduleByDate?date=${formattedDate}`);
    },
    options: { refetchOnWindowFocus: false },
  });

  const validateInputDate = () => {
    if (!refSelectedDate.current) return true;
    const inputValue = refSelectedDate.current.value;
    const formats = ["dddd DD/MM/YYYY", "dddd D/MM/YYYY", "dddd DD/M/YYYY", "dddd D/M/YYYY"];
    return formats.some((format) => dayjs(inputValue, format, true).isValid());
  };

  useEffect(() => {
    const isValid = validateInputDate();
    if (selectedDate[0] !== null && isValid) {
      classScheduleQuery.refetch();
    }
  }, [selectedDate[0]]);

  const columns = useMemo<CustomColumnDef<ICourseSectionSchedule>[]>(() => [
    { header: "Mã lớp", accessorKey: "courseSection.code" },
    {
      header: "Sĩ số",
      accessorKey: "courseSection.quantityStudentActual",
      size: 120,
    },
    {
      header: "Hiện diện",
      accessorKey: "attendenceNumber",
      size: 160,
    },
    { header: "Môn học", accessorKey: "subjectName" },
    {
      header: "Mã giảng viên",
      accessorFn: (row) =>
        row.courseSectionScheduleLecturer?.map((x) => x.user?.code).join(", "),
      Cell: ({ row }) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.original.courseSectionScheduleLecturer?.map((x) => x.user?.code).join("\n")}
        </div>
      ),
    },
    {
      header: "Tên giảng viên",
      accessorFn: (row) =>
        row.courseSectionScheduleLecturer?.map((x) => x.user?.fullName).join(", "),
      Cell: ({ row }) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.original.courseSectionScheduleLecturer?.map((x) => x.user?.fullName).join("\n")}
        </div>
      ),
    },
    {
      header: "Phòng",
      accessorKey: "address.name",
      size: 120,
    },
    {
      header: "Sức chứa",
      accessorKey: "address.capacity",
      size: 120,
    },
    {
      header: "Ngày",
      accessorFn: (row) =>
        row.startDate ? utils_date_dateToDDMMYYYString(new Date(row.startDate)) : "",
    },
    {
      header: "Thứ",
      accessorFn: (row) =>
        row.startDate ? utils_date_getWeekDay(new Date(row.startDate), "vi") : "",
    },
    {
      header: "Tiết bắt đầu",
      accessorKey: "classPeriodStart",
      size: 150,
    },
    {
      header: "Số tiết",
      accessorFn: (row) =>
        row.classPeriodEnd != null && row.classPeriodStart != null
          ? row.classPeriodEnd - row.classPeriodStart + 1
          : 0,
      size: 120,
    },
    {
      header: "Số phút",
      accessorKey: "totalMinute",
    },
    {
      header: "Trạng thái",
      accessorFn: (row) => displayCSScheduleStatus(row.status),
    },
  ], []);

  return (
    <CustomDataTableAPI
      enableRowNumbers
      columns={columns}
      query={classScheduleQuery}
      exportProps={{ fileName: "diem-danh-buoi-hoc" }}
      renderTopToolbarCustomActions={() => (
        <DateInput
          valueFormat="dddd DD/MM/YYYY"
          label="Lịch học"
          placeholder="Chọn ngày"
          defaultValue={selectedDate[0]}
          onChange={(date) => {
            if (date) selectedDate[1](new Date(date));
          }}
          ref={refSelectedDate}
        />
      )}
      renderRowActions={({ row }) => (
        <AttendanceTableButtonModal csScheduleValues={row.original} />
      )}
    />
  );
}

function displayCSScheduleStatus(status?: number | null) {
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

