'use client'
import { ENUM_GENDER } from "@/constants/enum/global";
import { courseStudentService, type CourseGetStudent } from "@/shared/APIs/courseStudentService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useMemo } from "react";

export default function CourseRegistrationListTable() {
  const query = useCustomReactQuery({
    queryKey: ["courseStudentService.getStudent"],
    axiosFn: () =>
      courseStudentService.getStudent({
        pageNumber: 0,
        pageSize: 0,
      }),
  });

  const columns = useMemo<CustomColumnDef<CourseGetStudent>[]>(() => [
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
      accessorFn: (row) => (row.user?.gender != null ? ENUM_GENDER[row.user.gender] : ""),
    },
    {
      header: "Ngày sinh",
      accessorFn: (row) =>
        row.user?.dateOfBirth ? dateUtils.toDDMMYYYY(row.user.dateOfBirth) : "",
    },
    {
      header: "Số điện thoại",
      accessorKey: "user.phoneNumber",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    {
      header: "Đối tượng",
      accessorFn: () => "Học viên",
    },
    {
      header: "Mã khóa học",
      accessorKey: "courseTimeCluster.course.code",
    },
    {
      header: "Tên khóa học",
      accessorKey: "courseTimeCluster.course.name",
    },
    {
      header: "Cụm thời gian",
      accessorKey: "courseTimeCluster.timeCluster.name",
    },
    {
      header: "Chi nhánh",
      accessorKey: "courseTimeCluster.course.branch.name",
    },
    {
      header: "Loại thu",
      accessorKey: "receiptType",
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
      accessorKey: "note",
    },
    {
      header: "Biên lai chuyển khoản",
      accessorKey: "receiptLink",
      Cell: () => <CustomButton variant="subtle">Xem</CustomButton>,
    },
  ], []);

  return (
    <CustomDataTableAPI
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={query}
      exportProps={{ fileName: "danh-sach-dang-ky-khoa-hoc" }}
    />
  );
}

