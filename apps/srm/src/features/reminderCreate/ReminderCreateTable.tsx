"use client";
import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { ContractExecuteStatusBadgeProps } from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import ReminderCreateAssignButton from "./ReminderCreateAssignButton";
import ReminderCreateReportTable from "./ReminderCreateReport/ReminderCreateReportTable";

export default function ReminderCreateTable() {
  const academicYearStore = useAcademicYearStore();
  const columns = useMemo<CustomColumnDef<SRMContract>[]>(
    () => [
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
        accessorKey: "leader",
        accessorFn(row) {
          return row.srmTopic?.srmTopicMembers?.filter(
            (item) => item?.srmTitle?.isLeader === true
          ).map(item => item.user?.fullName)
        },
        type: "list"
      },
      {
        header: "Ngày có hiệu lực hợp đồng",
        accessorKey: "signingDate",
        type: "ddMMyyyy",
      },
      {
        header: "Thời gian thực hiện",
        accessorKey: "duration",
      },
      {
        header: "Từ tháng/năm",
        accessorKey: "fromDate",
        type: "MMyyyy",
      },
      {
        header: "Đến tháng/năm",
        accessorKey: "toDate",
        type: "MMyyyy",
      },
      {
        header: "Loại hình đề tài",
        accessorKey: "srmType.name",
      },
      {
        header: "Lĩnh vực",
        accessorKey: "field",
        accessorFn(originalRow) {
          return originalRow?.srmTopic?.srmArea?.name;
        },
      },
      {
        header: "Số lần báo cáo",
        accessorKey: "reportCount",
        accessorFn: (row) => row?.srmContractReportHistories?.length,
      },
      {
        header: "Danh sách ngày báo cáo",
        accessorKey: "srmContractReportHistories",
        accessorFn: (row) =>
          row?.srmContractReportHistories
            ?.map((item) => dateUtils.toDDMMYYYY(item.reportDate)),
        type: "list"
      },
      {
        header: "Trạng thái thực hiện",
        accessorKey: "executionStatus",
        type: "statusBadge",
        statusBadgeProps: ContractExecuteStatusBadgeProps
      },
    ],
    []
  );

  const contractQuery = useCustomReactQuery({
    queryKey: ["contractQuery", academicYearStore?.state?.academicYear?.id],
    axiosFn: () => {
      return contractService.GetAllByAcademicYear({
        AcademicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
      });
    },
    options: {
      enabled: !!academicYearStore?.state?.academicYear,
    },
  });

  return (
    <CustomFieldset title="Danh sách đề tài">
      <CustomDataTableAPI
        columns={columns}
        enableRowSelection={true}
        hiddenColumns={['srmContractReportHistories']}
        pinningRightColumns={['executionStatus']}
        enableRowNumbers={false}
        query={contractQuery}
        exportProps={{
          fileName: "Danh sách đề tài",
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows = table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original);
          return (
            <Group>
              <ReminderCreateAssignButton table={table} data={selectedRows} />
            </Group>
          );
        }}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <ReminderCreateReportTable
              contractReportHistory={row?.original?.srmContractReportHistories}
              contract={row.original}
              loading={contractQuery.isLoading}
            />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
