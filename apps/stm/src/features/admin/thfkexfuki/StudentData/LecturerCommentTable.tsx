import { ILecturerReview, IUserDashboardData } from "@/features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { MantineStyleProp, Mark, Title } from "@mantine/core";
import { MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function LecturerCommentTable({ studentData, styleCount }: { studentData: IUserDashboardData, styleCount: MantineStyleProp }) {
  const columns = useMemo<MRT_ColumnDef<ILecturerReview>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Ngày",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(new Date(originalRow.date!))
        },
      },
      {
        accessorKey: "courseName",
        header: "Tên khóa học"
      },

      {
        accessorKey: "timeCluster",
        header: "Cụm thời gian"
      },
      {
        accessorKey: "studyDate",
        header: "Ngày khai giảng",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(new Date(originalRow.studyDate!))
        },
      },
      {
        accessorKey: "cLass",
        header: "Lớp"
      },
      {
        accessorKey: "lecturer",
        header: "Giảng viên"
      },
      {
        accessorKey: "review",
        header: "Nhận xét"
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
      <Title m={5} >Nhận xét của giảng viên:  {' '}
        <Mark color="green.9 " style={styleCount}>
          {(studentData.lecturerReview?.totalCount || 0)}
        </Mark>
      </Title>
      <MyDataTable
        enableStickyHeader
        mantineTableContainerProps={{ style: { maxHeight: "35vh" } }}
        enableRowSelection={true}
        columns={columns}
        enableRowNumbers={true}
        data={studentData?.lecturerReview?.lecturerReviews || []}
      />

    </>
  )
}
