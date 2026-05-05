import { ICertificateArchive, IUserDashboardData } from "@/features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { MantineStyleProp, Mark, Title } from "@mantine/core";
import { MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CetificateTable({ studentData, styleCount }: { studentData: IUserDashboardData, styleCount: MantineStyleProp }) {
  const columns = useMemo<MRT_ColumnDef<ICertificateArchive>[]>(
    () => [
      {
        accessorKey: "certificate",
        header: "Chứng chỉ"
      },
      {
        accessorKey: "ngay",
        header: "Ngày cấp",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(new Date(originalRow.decisionDate!))
        },
      },
      {
        accessorKey: "certificateNumber",
        header: "Số văn bằng"
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
      <Title m={5} >Danh sách chứng chỉ đạt được:  {' '}
        <Mark color="green.9 " style={styleCount}>
          {(studentData.certificate?.totalCount || 0)}
        </Mark>
      </Title>

      <MyDataTable
        enableStickyHeader
        mantineTableContainerProps={{ style: { minHeight: "30vh", maxHeight: "35vh" } }}
        enableRowSelection={true}
        columns={columns}
        enableRowNumbers={true}
        data={studentData.certificate?.certificateArchieves || []}
      />
    </>
  )
}
