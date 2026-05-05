"use client";

import EvaluationScoreboardExport from "@/shared/features/EvaluationScoreboardExport";
import ReportConfirmStudentPoint from "@/shared/features/ReportConfirmStudentPoint";
import { CustomButtonPrintTablePDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintTablePDF";
import { CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { Text } from "@mantine/core";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { FacultyStatisticsReportStudentInfoViewModel } from "./interfaces/IFacultyStatisticsReportViewModel";
import FacultyStatisticsReportResetButton from "@/modules-features/admin/ModuleStatisticsReport/FacultyStatisticsReport/FacultyStatisticsReportResetButton";
interface Props extends SafeOmitType<CustomDataTableProps<FacultyStatisticsReportStudentInfoViewModel>, "columns"> {
  falcutyId?: number
  studentTotalCount?: number
}
export default function FacultyStatisticsReportTable({
  data,
  falcutyId,
  studentTotalCount,
  ...rest
}: Props) {
  const permissionStore = usePermissionStore();
  console.log(data);

  const columns = useMemo<MRT_ColumnDef<FacultyStatisticsReportStudentInfoViewModel>[]>(
    () => [
      {
        accessorKey: "studentCode",
        header: "Mã sinh viên",
        enableSorting: true,
      },
      {
        accessorKey: "studentName",
        header: "Tên sinh viên",
        enableSorting: true,
        accessorFn: (row) => <Text m={4}>{row.studentName}</Text>,
      },
      {
        accessorKey: "studentRankingPoint",
        header: "Điểm của sinh viên",
        enableSorting: true,
        mantineTableHeadCellProps: {
          align: "center",
        },
        mantineTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "rateName",
        header: "Xếp loại",
        enableSorting: true,
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
      { header: "Mã sinh viên", fieldName: "studentCode" },
      { header: "Tên sinh viên", fieldName: "studentName" },
      { header: "Điểm của sinh viên", fieldName: "studentRankingPoint" },
      { header: "Xếp loại", fieldName: "rateName" },
    ],
    title: `Ngày in: ${new Date().toLocaleDateString()}`,
  };
  const studentIdsSelectionState = useState<MRT_RowSelectionState>({})
  return (
    <>
      <CustomDataTable
        columns={columns}
        getRowId={(row) => row.studentId?.toString()}
        enableRowSelection
        data={data || []}
        enableRowNumbers
        onRowSelectionChange={studentIdsSelectionState[1]}
        enableColumnFilters
        enableGlobalFilter
        enablePagination
        rowActionSize={180}
        renderTopToolbarCustomActions={() => (
          <>
            {permissionStore.state.currentPermissionPage?.isPrint && (
              <CustomButtonPrintTablePDF
                printConfig={printConfig}
                data={data || []}
              />
            )}
            {/* <FacultyStatisticsReportExport facultyIds={[falcutyId!]} /> */}
            <EvaluationScoreboardExport
              studentIds={Object.keys(studentIdsSelectionState[0]).map(Number)} facultyIds={falcutyId ? [falcutyId] : []}
            />
            {permissionStore.state.isSuperAdmin && (
              <>
                <ReportConfirmStudentPoint studentTotalCount={studentTotalCount} facultyId={falcutyId} studentIds={Object.keys(studentIdsSelectionState[0]).map(Number)} />
                <FacultyStatisticsReportResetButton />
              </>
            )}
          </>
        )}
        {...rest}
        state={{ rowSelection: studentIdsSelectionState[0], ...rest.state }}
      />
    </>
  );
}
