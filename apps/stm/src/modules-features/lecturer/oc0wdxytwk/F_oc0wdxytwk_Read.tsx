"use client";

import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ICourseSectionSchedule } from "@/interfaces/CourseSectionSchedule";
import { Box } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import F_oc0wdxytwk_attendanceTake from "./F_oc0wdxytwk_attendanceTake";

export default function F_oc0wdxytwk_Read() {
  // const selectedDate = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const refSelectedDate = useRef<HTMLInputElement>(null);

  const authenStore = useStore_Authenticate();

  const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

  const totalDate = getTodayInfo();

  const scheduleQuery = useQuery<ICourseSectionSchedule[]>({
    queryKey: ["F_oc0wdxytwk_Read", authenStore.state.userId],
    queryFn: async () => {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD HH:mm:ss.SSS");
      const DATE_PARAM = `date=${formattedDate}`;
      // const LECTURER_PARAM = `LecturerId=${1075}`;
      const LECTURER_PARAM = `LecturerId=${authenStore.state.userId}`;
      const response = await baseAxios.get(`/CourseSection/GetScheduleByDate?${DATE_PARAM}&${LECTURER_PARAM}`);
      const result = response.data.data;
      return result;
    },
    enabled: !!authenStore.state,
    refetchOnWindowFocus: false,
  });

  const validateInputDate = () => {
    if (refSelectedDate.current) {
      const inputValue = refSelectedDate.current.value;
      const formats = ["dddd DD/MM/YYYY", "dddd D/MM/YYYY", "dddd DD/M/YYYY", "dddd D/M/YYYY"];
      const isValid = formats.some((format) => dayjs(inputValue, format, true).isValid());
      if (!isValid) {
        return false;
      }
      return true;
    }
  };

  const columns = useMemo<MRT_ColumnDef<ICourseSectionSchedule>[]>(
    () => [
      { header: "Mã lớp", accessorKey: "courseSection.code" },
      { header: "Sĩ số", accessorKey: "courseSection.quantityStudentActual" },
      { header: "Hiện diện", accessorKey: "attendenceNumber" },
      { header: "Module", accessorKey: "subjectName" },
      {
        header: "Mã giáo viên",
        accessorKey: "maGiaoVien",
        accessorFn: (row) => {
          return authenStore.state.code;
        },
      },
      {
        header: "Giảng viên",
        accessorKey: "lecturer",
        accessorFn: (row) => {
          return authenStore.state.fullName;
        },
      },
      { header: "Phòng", accessorKey: "address.code" },
      //   { header: "Tên lớp", accessorKey: "courseSection.name" },
      { header: "Sức chứa", accessorKey: "address.capacity" },
      {
        header: "Ngày",
        accessorKey: "ngay",
        accessorFn: (row) => (row.startDate ? utils_date_dateToDDMMYYYString(new Date(row.startDate)) : "Không hợp lệ"),
      },
      { header: "Tiết bắt đầu", accessorKey: "classPeriodStart" },
      {
        header: "Số tiết",
        accessorKey: "soTiet",
        accessorFn: (row) => (row.classPeriodEnd ?? 0) - (row.classPeriodStart ?? 0),
      },
      { header: "Số phút", accessorKey: "totalMinute" },
      {
        header: "Thứ",
        accessorKey: "thu",
        accessorFn: (row) => {
          if (!row.startDate) {
            console.warn("Lỗi: row.startDate bị undefined hoặc null!", row);
            return "Không hợp lệ";
          }

          const date = new Date(row.startDate);
          if (isNaN(date.getTime())) {
            console.warn("Lỗi: row.startDate không phải là ngày hợp lệ!", row);
            return "Không hợp lệ";
          }

          const index = date.getDay();
          console.log("row.startDate:", row.startDate, "=> daysOfWeek[index]:", daysOfWeek[index]);
          return daysOfWeek[index];
        },
      },
      { header: "Trạng thái", accessorKey: "status" },

      //   {
      //     header: "Ngày cập nhật",
      //     accessorKey: "ngayCapNhat",
      //     accessorFn: (originalRow) =>
      //       originalRow.ngayCapNhat ? utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : "",
      //   },
      //   { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
    ],
    [authenStore.state]
  );
  useEffect(() => {
    let isValid = validateInputDate();
    if (selectedDate !== null && isValid) {
      scheduleQuery.refetch();
    }
  }, [selectedDate]);
  if (scheduleQuery.isLoading) return "Đang tải dữ liệu...";
  if (scheduleQuery.isError) return "Có lỗi xảy ra!";

  return (
    <>
      <Box style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <DateInput
          valueFormat="dddd DD/MM/YYYY"
          label="Chọn ngày"
          placeholder="Chọn ngày"
          defaultValue={selectedDate}
          // value={selectedDate}
          onChange={(date) => {
            setSelectedDate(new Date(date!));
          }}
          ref={refSelectedDate}
        />
      </Box>
      <MyFieldset title="Danh sách lịch dạy trong ngày">
        <MyDataTable
          enableRowSelection
          columns={columns}
          enableRowNumbers
          data={scheduleQuery.data || []}
          renderRowActions={({ row }) => {
            return (
              <MyCenterFull>
                <F_oc0wdxytwk_attendanceTake courseData={row.original} totalDate={totalDate} />
              </MyCenterFull>
            );
          }}
        />
      </MyFieldset>
    </>
  );
}

const getTodayInfo = () => {
  const today = new Date();
  const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const formattedDate = today.toLocaleDateString("vi-VN"); // Định dạng ngày tháng theo Tiếng Việt
  const totalDate = `${dayOfWeek}, ${formattedDate}`;
  return totalDate;
};
