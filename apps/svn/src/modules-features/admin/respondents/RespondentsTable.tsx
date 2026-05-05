"use client";

import { Checkbox, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyDataTable,
  MyFieldset,
  MyFlexColumn,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IRespondentInfoViewModel } from "./interfaces/IRespondentInfoViewModel";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { mockDataRead } from "./mockData";
import RespondentsButtonThaoTac from "./RespondentsButtonThaoTac";

export default function RespondentsTable() {
  const query = useQuery<IRespondentInfoViewModel[]>({
    queryKey: [`RespondentsTable`],
    queryFn: async () => {
      return mockDataRead;
    },
  });

  const columns = useMemo<MRT_ColumnDef<IRespondentInfoViewModel>[]>(
    () => [
      {
        header: "Mã chiến dịch",
        accessorKey: "maChienDich",
      },
      {
        header: "Tên chiến dịch",
        accessorKey: "tenChienDich",
      },
      {
        header: "Ngày bắt đầu",
        accessorKey: "ngayBatDau",
        accessorFn: (row) =>
          utils_date_dateToDDMMYYYString(new Date(row.ngayBatDau!)),
      },
      {
        header: "Ngày kết thúc",
        accessorKey: "ngayKetThuc",

        accessorFn: (row) =>
          utils_date_dateToDDMMYYYString(new Date(row.ngayKetThuc!)),
      },
      {
        header: "Đã khảo sát",
        accessorKey: "daKhaoSat",
        Cell: ({ cell }) => (
          <Checkbox onChange={() => {}} checked={cell.getValue<boolean>()} />
        ),
      },
      {
        header: "Thao tác",
        Cell: ({ cell }) => <RespondentsButtonThaoTac />,
      },
    ],
    []
  );

  return (
    <Paper p="lg">
      <MyFlexColumn>
        <Text
          fw={700}
          fz={{ base: 20, md: 28 }}
          ta="center"
          c="blue"
          mb={{ base: 8, md: "md" }}
        >
          Danh sách phiếu khảo sát của bạn
        </Text>
        <MyFieldset title="Danh sách chiến dịch chuẩn">
          <MyDataTable
            isLoading={query.isLoading}
            isError={query.isError}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => {
              return <MyButton crudType="default">Chọn</MyButton>;
            }}
            columns={columns}
            data={query.data || []}
          />
        </MyFieldset>
      </MyFlexColumn>
    </Paper>
  );
}
