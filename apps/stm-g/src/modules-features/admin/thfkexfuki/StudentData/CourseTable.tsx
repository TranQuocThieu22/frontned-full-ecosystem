import { ICourse, IUserDashboardData } from "@/modules-features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { MantineStyleProp, Mark, Title } from "@mantine/core";
import { MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CourseTable({ studentData, styleCount }: { studentData: IUserDashboardData, styleCount: MantineStyleProp }) {
  const columns = useMemo<MRT_ColumnDef<ICourse>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Mã giao dịch"
      },
      {
        accessorKey: "courseName",
        header: "Tên khóa học"
      },
      {
        accessorKey: "courseTimeClusters",
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
        accessorKey: "attendance",
        header: "Hiện diện"
      },
      {
        accessorKey: "status",
        header: "Trạng thái"
      },
      {
        accessorKey: "result",
        header: "kết quả"
      },
      {
        accessorKey: "totalPoint",
        header: "Điểm tổng"
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
      <Title m={5} >Khóa học:  {' '}
        <Mark color="green.9 " style={styleCount}>
          {(studentData.course?.totalCount || 0)}
        </Mark>
      </Title>

      <MyDataTable
        enableStickyHeader
        mantineTableContainerProps={{ style: { maxHeight: "35vh" } }}
        enableRowSelection={true}
        columns={columns}
        enableRowNumbers={true}
        data={studentData?.course?.courses || []}
      />
    </>
  )
}
