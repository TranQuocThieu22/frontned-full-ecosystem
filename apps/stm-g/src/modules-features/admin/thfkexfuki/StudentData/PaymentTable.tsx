import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { IUserDashboardData } from "@/modules-features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { MantineStyleProp, Mark, Title } from "@mantine/core";
import { MyNumberFormatter } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function PaymentTable({ studentData, styleCount }: { studentData: IUserDashboardData, styleCount: MantineStyleProp }) {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "paymentCode",
        header: "Mã giao dịch"
      },
      {
        accessorKey: "ngay",
        header: "Ngày giao dịch",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(new Date(originalRow.paymentDate!))
        },
      },
      {
        header: "Số tiền",
        accessorKey: "paymentAmount",
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
      // }
      //   },
    ],
    []
  );
  return (
    <>
      <Title m={5} >Thanh toán:  {' '}
        <Mark color="green.9 " style={styleCount}>
          <MyNumberFormatter value={(studentData.payments || []).reduce((sum, p) => sum + (p.paymentAmount || 0), 0)} />
        </Mark>
      </Title>
      <MyDataTable

        enableStickyHeader
        mantineTableContainerProps={{ style: { minHeight: "30vh", maxHeight: "35vh" } }}
        enableRowSelection={true}
        columns={columns}
        enableRowNumbers={true}
        data={studentData.payments || []}
      />
    </>
  )
}
