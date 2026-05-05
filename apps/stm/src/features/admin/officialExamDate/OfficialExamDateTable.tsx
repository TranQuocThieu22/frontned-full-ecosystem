'use client'
import { IExam } from "@/features/admin/ModuleExam/CRUDExam/Interfaces/ExamViewModel";
import { examService } from "@/shared/APIs/examService";
import { holidayService } from "@/shared/APIs/holidayService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Button, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { MyNumberInput } from "aq-fe-framework/components";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export default function OfficialExamDateTable() {
  const [editedExams, setEditedExams] = useState<IExam[]>([]);

  const examsQuery = useCustomReactQuery({
    queryKey: ["officialExamDate_exams"],
    axiosFn: () => examService.getExamList(),
  });

  const holidaysQuery = useCustomReactQuery({
    queryKey: ["officialExamDate_holidays"],
    axiosFn: () => holidayService.getAll(),
  });

  const checkIsHoliday = (officialExamDate: Date | null) => {
    if (!officialExamDate || !holidaysQuery.data) return false;
    return holidaysQuery.data.some((holiday) =>
      holiday.date && dayjs(officialExamDate).isSame(dayjs(holiday.date), "day"),
    );
  };

  const handleFieldChange = (row: IExam, fieldName: keyof IExam, fieldValue: any) => {
    const normalized = fieldValue === undefined || fieldValue === "" ? null : fieldValue;
    if (normalized === (row as any)[fieldName]) return;

    setEditedExams((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === row.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          [fieldName]: normalized,
        };
        return updated;
      }
      return [...prev, { ...row, [fieldName]: normalized }];
    });
  };

  const columns = useMemo<CustomColumnDef<IExam>[]>(() => [
    {
      header: "Mã khóa thi",
      accessorKey: "code",
    },
    {
      header: "Tên khóa thi",
      accessorKey: "name",
    },
    {
      header: "Tên chương trình",
      accessorKey: "program.name",
    },
    {
      header: "Ngày thi",
      accessorKey: "examDate",
      type: "ddMMyyyy",
    },
    {
      header: "Số lượng tối đa",
      accessorKey: "maxStudent",
    },
    {
      header: "Số lượng đã xếp",
      accessorKey: "courseSectionNumberTotal",
    },
    {
      header: "Số lượng chưa xếp",
      accessorKey: "courseSectionNumber",
    },
    {
      header: "Ngày thi chính thức",
      accessorKey: "officialExamDate",
      Cell: ({ row }) => (
        <DateInput
          placeholder="chọn ngày"
          value={row.original.officialExamDate ? new Date(row.original.officialExamDate as any) : null}
          valueFormat="DD/MM/YYYY"
          onChange={(value) => {
            const iso = value ? new Date(value).toISOString() : null;
            handleFieldChange(row.original, "officialExamDate", iso);
            if (value && checkIsHoliday(new Date(value))) {
              notifications.show({
                title: "Ngày nghỉ",
                message: "Ngày chọn là ngày nghỉ",
                color: "red",
              });
            }
          }}
        />
      ),
    },
    {
      header: "Số tiết thi",
      accessorKey: "classPeriod",
      Cell: ({ row }) => (
        <MyNumberInput
          placeholder="Nhập số tiết"
          defaultValue={row.original.classPeriod ?? 0}
          onBlur={(e) => handleFieldChange(row.original, "classPeriod", Number(e.currentTarget.value))}
        />
      ),
    },
  ], [holidaysQuery.data]);

  const handleSaveButton = async () => {
    if (editedExams.length === 0) return;

    const payload = editedExams.map((exam) => ({
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
      examCourses: exam.examCourses,
    }));

    const response = await baseAxios.post("/Exam/UpdateList", payload);
    if (response.data.isSuccess === 1) {
      await Promise.all([examsQuery.refetch(), holidaysQuery.refetch()]);
      notifications.show({
        title: "Lưu thành công",
        message: "Dữ liệu đã được lưu",
        color: "green",
      });
      setEditedExams([]);
    } else {
      notifications.show({
        title: "Thao tác thất bại",
        message: "Dữ liệu chưa được lưu",
        color: "red",
      });
    }
  };

  return (
    <CustomDataTableAPI
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={examsQuery}
      exportProps={{ fileName: "ngay-thi-chinh-thuc" }}
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
  );
}

