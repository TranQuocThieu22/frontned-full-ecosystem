"use client";
import { Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import FeatAcademicYearsCreate from "./FeatAcademicYearsCreate";
import FeatAcademicYearsDelete from "./FeatAcademicYearsDelete";
import FeatAcademicYearsDeleteList from "./FeatAcademicYearsDeleteList";
import FeatAcademicYearsUpdate from "./FeatAcademicYearsUpdate";

export interface FeatAcademicYearsRead {
  id?: number;
  code?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  startDateHC?: Date;
  endDateHC?: Date;
  isEnabled?: boolean;
  isCurrent?: boolean;
  concurrencyStamp?: string;
  note?: string;
}

export default function FeatAcademicYearsRead() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });
  const form = useForm<FeatAcademicYearsRead>({
    initialValues: {},
  });

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Query to fetch the mock data
  const query = useQuery<any[]>({
    queryKey: ["F_ukagvjhxgy_Read"],
    queryFn: async () => {

      return mockData;
    },
  });

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { header: "Năm học", accessorKey: "code" },
      { header: "Tên năm học", accessorKey: "name" },
      {
        header: "Ngày bắt đầu năm học",
        accessorKey: "startDate",
        accessorFn: (row) => formatDate(row.startDate),
      },
      {
        header: "Ngày kết thúc năm học",
        accessorKey: "endDate",
        accessorFn: (row) => formatDate(row.endDate),
      },
      {
        header: "Ngày bắt đầu năm hành chính",
        accessorKey: "startDateHC",
        accessorFn: (row) => formatDate(row.startDateHC),
      },
      {
        header: "Ngày kết thúc năm hành chính",
        accessorKey: "endDateHC",
        accessorFn: (row) => formatDate(row.endDateHC),
      },
      {
        header: "Hiện hành",
        accessorKey: "isCurrent",
        accessorFn: (row) => <Checkbox checked={row.isCurrent} onChange={() => { }}></Checkbox>,
      },
      { header: "Ghi chú", accessorKey: "note" },
    ],
    [query.data]
  );

  if (query.isLoading) return "Loading...";

  return (
    <MyFlexColumn>
      <MyDataTable
        enableRowSelection={true}
        enableRowNumbers={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <Group>
                <FeatAcademicYearsCreate />
                <MyButton crudType="import" />
                <MyButton crudType="export" />

                <FeatAcademicYearsDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

              </Group>
            </>
          );
        }}
        columns={columns}
        data={query.data || []}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <FeatAcademicYearsUpdate values={row.original} />
              <FeatAcademicYearsDelete values={row.original!} />
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