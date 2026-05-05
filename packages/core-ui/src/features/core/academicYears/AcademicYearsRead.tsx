"use client";
import { academicYearService } from "@aq-fe/core-ui/shared/APIs/academicYearService";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AcademicYearExport from "./AcademicYearExport";
import AcademicYearImportButton from "./AcademicYearImport";
import { AcademicYearsCreate } from "./AcademicYearsCreate";
import { AcademicYearsDelete } from "./AcademicYearsDelete";
import { AcademicYearsDeleteList } from "./AcademicYearsDeleteList";
import { AcademicYearsUpdate } from "./AcademicYearsUpdate";


export function AcademicYearsRead() {

  const academicyearsQuery = useCustomReactQuery({
    queryKey: ['academicyearsQuery'],
    axiosFn: () => academicYearService.academicGetAll(),
    options: {
      select: (data) => {
        return data.filter(item => item.id != 0)
      }
    }
  })
  const columns = useMemo<MRT_ColumnDef<AcademicYear>[]>(
    () => [
      { header: "Năm học", accessorKey: "code" },
      { header: "Tên năm học", accessorKey: "name" },
      {
        header: "Ngày bắt đầu năm học",
        accessorKey: "startDate",
        accessorFn: (row) => dateUtils.toDDMMYYYY(row.academicYearStart),
      },
      {
        header: "Ngày kết thúc năm học",
        accessorKey: "endDate",
        accessorFn: (row) => dateUtils.toDDMMYYYY(row.academicYearEnd),
      },
      {
        header: "Ngày bắt đầu năm hành chính",
        accessorKey: "startDateHC",
        accessorFn: (row) => dateUtils.toDDMMYYYY(row.administrativeYearStart),
      },
      {
        header: "Ngày kết thúc năm hành chính",
        accessorKey: "endDateHC",
        accessorFn: (row) => dateUtils.toDDMMYYYY(row.administrativeYearEnd),
      },
      {
        header: "Hiện hành",
        accessorKey: "isCurrent",
        accessorFn: (row) =>
          <CustomCenterFull>
            <CustomThemeIconSquareCheck checked={row.isCurrent} />
          </CustomCenterFull>
      },
      { header: "Ghi chú", accessorKey: "note" },
    ],
    [academicyearsQuery.data]
  );


  return (
    <CustomFlexColumn>
      <CustomDataTable
        isLoading={academicyearsQuery.isLoading}
        isError={academicyearsQuery.isError}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        data={academicyearsQuery.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <Group>
                <AcademicYearsCreate />
                <AcademicYearImportButton loading={academicyearsQuery.isFetching} />
                <AcademicYearExport isLoading={academicyearsQuery.isFetching} table={table} />
                <AcademicYearsDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
              </Group>
            </>
          );
        }}

        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <AcademicYearsUpdate values={row.original} />
              <AcademicYearsDelete values={row.original!} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFlexColumn>
  );
}
const mockData = [
  {
    "startDate": "2024-08-05T00:00:00",
    "endDate": "2025-06-09T00:00:00",
    "startDateHC": "2024-01-01T03:00:00",
    "endDateHC": "2024-12-31T00:00:00",
    "note": "",
    "isCurrent": false,
    "id": 35,
    "code": "2024",
    "name": "N\u0103m 2024 - 2025",
    "concurrencyStamp": "1d104358-c4cb-4c61-81d5-f164b46b9ffc",
    "isEnabled": true,
    "modifiedWhen": "2025-06-20T10:28:39.057",
    "modifiedBy": 19136,
    "modifiedFullName": "Dev H\u1EEFu Lu\u00E2n"
  },

]
