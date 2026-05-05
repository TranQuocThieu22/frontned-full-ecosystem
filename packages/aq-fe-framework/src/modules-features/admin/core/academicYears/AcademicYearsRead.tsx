"use client";
import { academicYearService } from "@/APIs/academicYearService";
import { MyCenterFull, MyDataTable } from "@/components";
import { CustomThemeIconSquareCheck, MyFlexColumn } from "@/core";
import { useMyReactQuery } from "@/hooks";
import { IAcademicYear } from "@/interfaces/IAcademicYear";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { utils_date } from "../../../../utils-v2";
import AcademicYearExport from "./AcademicYearExport";
import AcademicYearImport from "./AcademicYearImport";
import { AcademicYearsCreate } from "./AcademicYearsCreate";
import { AcademicYearsDelete } from "./AcademicYearsDelete";
import { AcademicYearsDeleteList } from "./AcademicYearsDeleteList";
import { AcademicYearsUpdate } from "./AcademicYearsUpdate";


export function AcademicYearsRead() {

  const academicyearsQuery = useMyReactQuery({
    queryKey: ['academicyearsQuery'],
    axiosFn: () => academicYearService.academicGetAll(),
    options: {
      select: (data) => {
        return data.filter(item => item.id != 0)
      }
    }
  })
  const columns = useMemo<MRT_ColumnDef<IAcademicYear>[]>(
    () => [
      { header: "Năm học", accessorKey: "code" },
      { header: "Tên năm học", accessorKey: "name" },
      {
        header: "Ngày bắt đầu năm học",
        accessorKey: "startDate",
        accessorFn: (row) => utils_date.toDDMMYYYY(row.academicYearStart),
      },
      {
        header: "Ngày kết thúc năm học",
        accessorKey: "endDate",
        accessorFn: (row) => utils_date.toDDMMYYYY(row.academicYearEnd),
      },
      {
        header: "Ngày bắt đầu năm hành chính",
        accessorKey: "startDateHC",
        accessorFn: (row) => utils_date.toDDMMYYYY(row.administrativeYearStart),
      },
      {
        header: "Ngày kết thúc năm hành chính",
        accessorKey: "endDateHC",
        accessorFn: (row) => utils_date.toDDMMYYYY(row.administrativeYearEnd),
      },
      {
        header: "Hiện hành",
        accessorKey: "isCurrent",
        accessorFn: (row) =>
          <MyCenterFull>
            <CustomThemeIconSquareCheck checked={row.isCurrent} />
          </MyCenterFull>
      },
      { header: "Ghi chú", accessorKey: "note" },
    ],
    [academicyearsQuery.data]
  );


  return (
    <MyFlexColumn>
      <MyDataTable
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
                <AcademicYearImport />
                <AcademicYearExport isLoading={academicyearsQuery.isFetching} table={table} />
                <AcademicYearsDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
              </Group>
            </>
          );
        }}

        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <AcademicYearsUpdate values={row.original} />
              <AcademicYearsDelete values={row.original!} />
            </MyCenterFull>
          );
        }}
      />
    </MyFlexColumn>
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
