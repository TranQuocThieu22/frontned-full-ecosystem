import { IExam, IUserDashboardData } from "@/modules-features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { MantineStyleProp, Mark, Title } from "@mantine/core";
import { MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ExamTable({ studentData, styleCount }: { studentData: IUserDashboardData, styleCount: MantineStyleProp }) {
  const columns = useMemo<MRT_ColumnDef<IExam>[]>(
    () => [
      {
        accessorKey: "examName",
        header: "Tên khóa thi"
      },
      {
        accessorKey: "examDate",
        header: "Ngày thi",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(new Date(originalRow.examDate!))
        },
      },
      {
        accessorKey: "result",
        header: "Kết quả"
      },
      {
        accessorKey: "totalPoint",
        header: "Điểm tổng kết"
      },
      // {
      //   accessorKey: "trangThai",
      //   header: "Trạng thái",
      //   accessorFn(originalRow) {
      //     return GetTrangThai(originalRow.trangThai!).text;
      //   },
      // },
      // {
      //   accessorKey: "nguoiCapNhat",
      //   header: "Người cập nhật"
      // },
      // {
      //   accessorKey: "ngayCapNhat",
      //   header: "Ngày cập nhật",
      //   accessorFn(originalRow) {
      //     return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!))
      //   },
      // }
    ],
    []
  );
  return (
    <>
      <Title m={5} >Khóa thi:  {' '}
        <Mark color="green.9 " style={styleCount}>
          {(studentData.exam?.totalCount || 0)}
        </Mark>
      </Title>

      <MyDataTable
        enableStickyHeader
        mantineTableContainerProps={{ style: { maxHeight: "35vh" } }}
        enableRowSelection={true}
        columns={columns}
        enableRowNumbers={true}
        data={studentData?.exam?.exams || []}
      />
    </>
  )
}
