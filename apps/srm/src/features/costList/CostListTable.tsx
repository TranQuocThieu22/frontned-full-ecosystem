"use client";

import ContractFilter from "@/features/costList/ContractFilter";
import CostListExport from "@/features/costList/CostListExport";
import { contractService } from "@/shared/APIs/contractService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export default function CostListTable() {
  const [filterData, setFilterData] = useState<{
    academicYearId?: number;
    startDate?: string;
    endDate?: string;
  } | null>(null);

  const costLists = useCustomReactQuery({
    queryKey: ["costLists", filterData],
    axiosFn: () => contractService.getContractFilter(filterData!),
    options: {
      enabled: filterData !== null,
    }
  })

  const handleFilter = (newFilterData: {
    academicYearId?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    setFilterData(newFilterData);
  };

  const columns = useMemo<MRT_ColumnDef<SRMContract>[]>(() => [
    {
      header: "Mã đề tài",
      accessorKey: "code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "name",
      size: columnSizeObject.name,
    },
    {
      header: "Chủ nhiệm đề tài",
      accessorFn: (row) => {
        const leader = row.srmTopic?.srmTopicMembers?.find(
          (member: any) => member.srmTitle?.isLeader
        );
        return leader?.user?.fullName || "";
      },
    },
    {
      header: "Đơn vị chủ nhiệm",
      accessorKey: "srmTopic.hostOrganization",
    },
    {
      header: "Đơn vị quản lý",
      accessorKey: "srmTopic.managingOrganization",
    },
    {
      header: "Cấp đề tài",
      accessorKey: "srmType.srmLevel.name",
    },
    {
      header: "Loại đề tài",
      accessorKey: "srmType.name",
    },
    {
      header: "Tổng kinh phí (dự đoán)",
      accessorKey: "totalCost",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost || 0),
    },
    {
      header: "Kinh phí TW (dự đoán)",
      accessorKey: "centralBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.centralBudget || 0),
    },
    {
      header: "Kinh phí Tỉnh (dự đoán)",
      accessorKey: "provincialBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.provincialBudget || 0),
    },
    {
      header: "Kinh phí Trường (dự đoán)",
      accessorKey: "universityBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.universityBudget || 0),
    },
    {
      header: "Kinh phí khác (dự đoán)",
      accessorKey: "otherBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.otherBudget || 0),
    },
    {
      header: "Tổng kinh phí (thanh toán)",
      accessorKey: "usedTotalCost",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.usedTotalCost || 0),
    },
    {
      header: "Kinh phí TW (thanh toán)",
      accessorKey: "usedCentralBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.usedCentralBudget || 0),
    },
    {
      header: "Kinh phí Tỉnh (thanh toán)",
      accessorKey: "usedProvincialBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.usedProvincialBudget || 0),
    },
    {
      header: "Kinh phí Trường (thanh toán)",
      accessorKey: "usedUniversityBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.usedUniversityBudget || 0),
    },
    {
      header: "Kinh phí khác (thanh toán)",
      accessorKey: "usedOtherBudget",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.usedOtherBudget || 0),
    },
  ], []);

  return (
    <>
      <ContractFilter
        onFilter={handleFilter}
        isLoading={costLists.isLoading}
      />
      <CustomFieldset
        title="Danh sách kết quả duyệt đề xuất"
      >
        <CustomDataTable
          columns={columns}
          enableRowSelection={true}
          isLoading={costLists.isLoading}
          isError={costLists.isError}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <CostListExport table={table} />
              </>
            )
          }}
          data={costLists.data ?? []}
        />
      </CustomFieldset>
    </>
  );
}