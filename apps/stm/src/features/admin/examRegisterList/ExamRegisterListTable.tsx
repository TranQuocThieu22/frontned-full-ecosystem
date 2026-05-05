'use client'
import { ENUM_GENDER, ENUM_RECEIPT_TYPE } from "@/constants/enum/global";
import { examService } from "@/shared/APIs/examService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import { ExamRegistrationListItem } from "./interfaces";

export default function ExamRegisterListTable() {
  const query = useCustomReactQuery<ExamRegistrationListItem[], unknown, ExamRegistrationListItem[]>({
    queryKey: ["examStudents"],
    axiosFn: () =>
      examService.getStudent({
        pageNumber: 0,
        pageSize: 0,
      }),
  });

  const columns = useMemo<CustomColumnDef<ExamRegistrationListItem>[]>(() => [
    {
      header: "Mã học viên",
      accessorKey: "user.code",
    },
    {
      header: "Họ tên",
      accessorKey: "user.fullName",
    },
    {
      header: "Giới tính",
      accessorFn: (row) => (row.user?.gender == null ? "" : ENUM_GENDER[row.user.gender]),
    },
    {
      header: "Ngày sinh",
      accessorFn: (row) =>
        row.user?.dateOfBirth
          ? dateUtils.toDDMMYYYY(
            typeof row.user.dateOfBirth === "string"
              ? row.user.dateOfBirth
              : row.user.dateOfBirth.toISOString(),
          )
          : "",
    },
    {
      header: "Mã khóa thi",
      accessorKey: "exam.code",
    },
    {
      header: "Tên khóa thi",
      accessorKey: "exam.name",
    },
    {
      header: "Đối tượng",
      accessorKey: "doiTuong",
      accessorFn: () => "Học viên",
    },
    {
      header: "Ngày thi",
      accessorKey: "exam.officialExamDate",
      accessorFn: (row) =>
        row.exam?.officialExamDate
          ? dateUtils.toDDMMYYYY(
            typeof row.exam.officialExamDate === "string"
              ? row.exam.officialExamDate
              : row.exam.officialExamDate.toISOString(),
          )
          : "",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    {
      header: "Số điện thoại",
      accessorKey: "user.phoneNumber",
    },
    {
      header: "Loại thu",
      accessorKey: "receiptType",
      accessorFn: (row) =>
        row.receiptType == null ? "" : ENUM_RECEIPT_TYPE[row.receiptType] ?? row.receiptType,
    },
    {
      header: "Số phiếu thu",
      accessorKey: "receiptCode",
    },
    {
      header: "Đã thu",
      accessorKey: "receiptPrice",
    },
    {
      header: "Ghi chú phiếu thu",
      accessorKey: "receiptNote",
    },
    {
      header: "Biên lai chuyển khoản",
      accessorKey: "receiptLink",
      type: "viewFile"
    },
  ], []);

  return (
    <CustomDataTableAPI
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={query}
      exportProps={{ fileName: "danh-sach-dang-ky-khoa-thi" }}
      renderTopToolbarCustomActions={() => (
        <Group>
          {/* TODO: import/export & xác nhận nếu cần sau này */}
        </Group>
      )}
    />
  );
}

