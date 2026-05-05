import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Progress, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { SchoolStatisticsReportFacultyInfoViewModel } from "./interfaces/ISchoolStatisticsReportViewModel";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonPrintTablePDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintTablePDF";
import SchoolStatisticsReportExport from "@/modules-features/admin/ModuleStatisticsReport/SchoolStatisticsReport/SchoolStatisticsReportExport";
import EvaluationScoreboardExport from "@/shared/features/EvaluationScoreboardExport";
import SchoolReportConfirmStudentPoint from "@/shared/features/ReportConfirmStudentPoint";

export default function SchoolStatisticsReportTable({
  data,
}: {
  data?: SchoolStatisticsReportFacultyInfoViewModel[];
}) {
  const permissionStore = usePermissionStore();
  const columns = useMemo<
    MRT_ColumnDef<SchoolStatisticsReportFacultyInfoViewModel>[]
  >(
    () => [
      {
        accessorKey: "facultyName",
        header: "Khoa",
        enableSorting: true,
        accessorFn: (row) => <Text m={4}>{row.facultyName}</Text>,
      },
      {
        accessorKey: "facultTotalCount",
        header: "Tổng số lượng",
        enableSorting: true,
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "facultyOverFiftyPointCount",
        header: "Số sinh viên lớn hơn 50 điểm",
        enableSorting: true,
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Tỉ lệ",
        enableSorting: false,
        accessorFn: (row) => {
          const total = row.facultTotalCount || 1;
          const over50 = row.facultyOverFiftyPointCount || 0;
          const percent = (over50 / total) * 100;
          return percent;
        },
        Cell: ({ cell }) => {
          const percent = cell.getValue<number>();
          const progressColor = percent < 50 ? "red" : "green";
          return <Progress h={20} value={percent} color={progressColor} />;
        },
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const printConfig = {
    fields: [
      { header: "Khoa", fieldName: "facultyName" },
      { header: "Tổng số lượng", fieldName: "facultTotalCount" },
      {
        header: "Số sinh viên lớn hơn 50 điểm",
        fieldName: "facultyOverFiftyPointCount",
      },
      { header: "Tỉ lệ", fieldName: "rateName" },
    ],
    title: `Ngày in: ${new Date().toLocaleDateString()}`,
  };

  return (
    <CustomDataTable

      renderTopToolbarCustomActions={({ table }) => {
        const facultyIds = table.getSelectedRowModel().rows.map((row) => row.original.facultyId ?? 0)
        return (
          <>
            {permissionStore.state.currentPermissionPage?.isPrint && (
              <CustomButtonPrintTablePDF
                printConfig={printConfig}
                data={data || []}
              />
            )}
            <EvaluationScoreboardExport facultyIds={facultyIds ? facultyIds : []} />
            {/* <SchoolReportConfirmStudentPoint /> */}
            {/* <SchoolStatisticsReportExport facultyIds={facultyIds} /> */}
          </>)
      }}
      columns={columns}
      data={data || []}
      getRowId={(item) => item.facultyId?item.facultyId?.toString() : ''}
      enableRowNumbers
      enableRowSelection
      enableColumnFilters
      enableGlobalFilter
      enablePagination
      rowActionSize={180}
    />
  );
}
