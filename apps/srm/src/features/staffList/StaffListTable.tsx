"use client";

import { contractService } from "@/shared/APIs/contractService";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { Badge } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import MemberFilter from "./MemberFilter";
import StaffListExport from "./StaffListExport";

export default function StaffListTable() {
  const [filterData, setFilterData] = useState<{
    academicYearId?: number;
    startDate?: string;
    endDate?: string;
  } | null>(null);

  const staffLists = useCustomReactQuery({
    queryKey: ["staffLists", filterData],
    axiosFn: () => contractService.getMemberFilter(filterData!),
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

  const columns = useMemo<MRT_ColumnDef<SRMTopicMember>[]>(() => [
    {
      header: "Mã viên chức",
      accessorKey: "user.code",
    },
    {
      header: "Họ tên",
      accessorKey: "user.fullName",
      size: columnSizeObject.name
    },
    {
      header: "Vai trò thực hiện đề tài",
      accessorKey: "srmTitle.name",
    },
    {
      header: "Mã đề tài",
      accessorKey: "srmTopic.code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "srmTopic.registerName",
      size: columnSizeObject.name
    },
    {
      header: "Chủ nhiệm đề tài",
      accessorKey: "leaderName",
      accessorFn: (row) => row.srmTitle?.isLeader ? row.user?.fullName : ""
    },
    {
      header: "Đơn vị chủ nhiệm",
      accessorKey: "srmTopic.hostOrganization",
      size: columnSizeObject.name
    },
    {
      header: "Đơn vị quản lý",
      accessorKey: "srmTopic.managingOrganization",
      size: columnSizeObject.name
    },
    {
      header: "Cấp đề tài",
      accessorKey: "srmTopic.srmType.srmLevel.name",
    },
    {
      header: "Loại đề tài",
      accessorKey: "srmTopic.srmType.name",
    },
    {
      header: "Tổng kinh phí (dự đoán)",
      accessorKey: "srmTopic.totalCost",
      accessorFn: (row) => currencyUtils.formatWithSuffix(row.srmTopic?.totalCost || 0)
    },
    {
      header: "Thời gian thực hiện",
      accessorKey: "srmTopic.duration",
    },
    {
      header: "Từ tháng/năm",
      accessorKey: "srmTopic.fromDate",
      accessorFn: (row) => {
        if (!row.srmTopic?.fromDate) return "";
        const date = new Date(row.srmTopic?.fromDate);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      header: "Đến tháng/năm",
      accessorKey: "srmTopic.toDate",
      accessorFn: (row) => {
        if (!row.srmTopic?.toDate) return "";
        const date = new Date(row.srmTopic?.toDate);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      header: "Trạng thái thực hiện",
      accessorKey: "srmTopic.srmContract.executionStatus",
      accessorFn: (row) => <Shared_ContractExecuteStatusBadge value={row.srmTopic?.srmContract?.executionStatus!} />,
      size: 240
    },
    {
      header: "Kết luận của hội đồng nghiệm thu",
      accessorKey: "srmTopic.srmEvaluationTopic.srmConclusion.name",
      accessorFn(row) {
        return <Badge
          w="100%"
          variant="light"
          color={row.srmTopic?.srmEvaluationTopic?.srmConclusion?.color || "gray"}
          radius="sm"
        >
          {row.srmTopic?.srmEvaluationTopic?.srmConclusion?.name}
        </Badge>
      },
      size: 240,
    },
  ], []);

  return (
    <>
      <MemberFilter
        onFilter={handleFilter}
        isLoading={staffLists.isLoading}
      />
      <CustomFieldset
        title="Danh sách kết quả duyệt đề xuất"
      >

        <CustomDataTable
          columns={columns}
          enableRowSelection={true}
          enableRowNumbers={true}
          isLoading={staffLists.isLoading}
          isError={staffLists.isError}
          initialState={{
            columnPinning: {
              right: ['srmTopic.srmEvaluationTopic.srmConclusion.name'],
            },
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <StaffListExport table={table} />
              </>
            )
          }}
          data={staffLists.data || []}
        />
      </CustomFieldset>
    </>
  );
}
