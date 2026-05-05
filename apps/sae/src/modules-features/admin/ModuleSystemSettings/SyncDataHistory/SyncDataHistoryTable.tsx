'use client'

import { service_aq } from "@/api/services/service_aq";
import { AQSyncDataHistory } from "@/interfaces/aq";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function SyncDataHistoryTable() {
  const aqSyncQuery = useCustomReactQuery({
    queryKey: ["aqSyncQuery"],
    axiosFn: () => service_aq.getAQSyncDataHistory({})
  });

  const columns = useMemo<MRT_ColumnDef<AQSyncDataHistory>[]>(() => [
    { header: "Năm học - học kì", accessorKey: "planName" },
    { header: "Số lượng sinh viên đã đánh giá", accessorKey: "studentCount", size: 230 },
    {
      header: "Đã chuyển", accessorKey: "isSuccess",
      accessorFn(row) {
        return <CustomCheckbox checked={row.isSuccess} readOnly />
      },
    },
    {
      header: "Ngày chuyển", accessorKey: "syncDate",
      accessorFn(row) {
        return dateUtils.toDDMMYYYY(new Date());
      },
    },
  ], [])

  // if (aqSyncQuery.isLoading) return "Loading...";
  // if (aqSyncQuery.isError) return "Không có dữ liệu...";

  return (
    <CustomFlexColumn>
      <CustomDataTable
        isLoading={aqSyncQuery.isLoading}
        isError={aqSyncQuery.isError}
        initialState={{
          pagination: { pageIndex: 0, pageSize: 10 },
          columnVisibility: { modifiedFullName: false, modifiedBy: false },
        }}
        enableRowSelection={false}
        enableRowNumbers={true}
        columns={columns}
        data={aqSyncQuery.data || []}
      >

      </CustomDataTable>
    </CustomFlexColumn>
  )
}
