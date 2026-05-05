import { Box, Flex, Paper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlignLeft2 } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from 'aq-fe-framework/components';
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import TickerRepositoryCreateOrUpdate from './TickerRepositoryCreateOrUpdate';
import TickerRepositoryDelete from './TickerRepositoryDelete';
import TickerRepositoryDeleteList from './TickerRepositoryDeleteList';

export default function TickerRepositoryTable() {

  const form = useForm<any>({
    initialValues: {},
  });

  const query = useQuery<I_SupplyImportTable[]>({
    queryKey: ["supplyImportMockDataQuery"],
    queryFn: async () => {
      return supplyImportMockData ?? [];
    },
  });


  const columns = useMemo<MRT_ColumnDef<I_SupplyImportTable>[]>(() => [
    {
      header: "Thời gian nạp",
      accessorFn: row => row.importTime
        ? utils_date_dateToDDMMYYYString(new Date(row.importTime)) + " " + row.importTime.split(" ")[1]
        : "",
      id: "importTime"
    },
    { header: "Số lượng nạp", accessorKey: "quantity" },
    { header: "Người thực hiện", accessorKey: "executor" },
    { header: "Ghi chú", accessorKey: "note" },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "importTime", header: "Thời gian nạp" },
      { fieldName: "quantity", header: "Số lượng nạp" },
      { fieldName: "executor", header: "Người thực hiện" },
      { fieldName: "note", header: "Ghi chú" },
    ]
  };


  return (
    <>
      <Paper mb={25}>
        <Flex p={25} align={"center"}>
          <Box pr={15}><IconAlignLeft2 size={20} /></Box>
          <Text pr={15} fw={700} fz={20}>Tổng số ticker tồn kho:</Text>
          <Text fw={700} fz={25}>253</Text>
        </Flex>
      </Paper>
      <MyFieldset title={"Danh sách lượt nạp ticker"}>
        <MyDataTable
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          data={query.data || []}
          enableRowSelection
          enableColumnFilters
          enableRowNumbers
          renderTopToolbarCustomActions={({ table }) => (
            <>
              <TickerRepositoryCreateOrUpdate />
              <AQButtonExportData
                objectName={"Danhsachluotnapticker"}
                data={query.data || []}
                exportConfig={exportConfig}
              />
              <TickerRepositoryDeleteList
                values={table
                  .getSelectedRowModel()
                  .flatRows.flatMap((item) => item.original)}
              />
            </>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <TickerRepositoryCreateOrUpdate data={row.original} />
              <TickerRepositoryDelete
                id={row.original.id}
                label={row.original.id.toString()}
              />
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </>
  )
}

export interface I_SupplyImportTable {
  id: number;
  importTime: string;       // Thời gian nạp, yyyy-MM-dd HH:mm:ss
  quantity: number;         // Số lượng nạp
  executor: string;         // Người thực hiện
  note?: string;            // Ghi chú
}

export const supplyImportMockData: I_SupplyImportTable[] = [
  {
    id: 1,
    importTime: "2025-07-14 10:30:00",
    quantity: 500,
    executor: "Nguyễn Văn A (QLDT)",
    note: '“Nhập đợt 3/2025 từ nhà cung cấp ABC.”',
  },
  {
    id: 2,
    importTime: "2025-07-01 09:00:00",
    quantity: 100,
    executor: "Hệ thống tự động",
    note: '“Nạp theo cấu hình hàng tháng (Tháng 7).”',
  },
  {
    id: 3,
    importTime: "2025-06-20 14:15:00",
    quantity: 300,
    executor: "Trần Thị B (QLDT)",
    note: '“Nhập bổ sung khẩn cấp.”',
  },
  {
    id: 4,
    importTime: "2025-06-01 09:00:00",
    quantity: 100,
    executor: "Hệ thống tự động",
    note: '“Nạp theo cấu hình hàng tháng (Tháng 6).”',
  },
  {
    id: 5,
    importTime: "2025-05-10 11:00:00",
    quantity: 200,
    executor: "Nguyễn Văn A (QLDT)",
    note: '“Nhập đợt 2/2025.”',
  },
];
