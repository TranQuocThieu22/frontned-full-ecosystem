"use client";

import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumColorProcessingStatus, EnumIconProcessingStatus, EnumLabelProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useMemo } from "react";
import StopHandleUpdate from "./StopHandleUpdate";

export default function StopHandleTable() {
  const academicYearStore = useAcademicYearStore();
  const contractDetailQuery = useCustomReactQuery({
    queryKey: ['contractDetailQuery', academicYearStore.state.academicYear?.id],
    axiosFn: () => contractSuspendService.GetAllByAcademicYear({
      academicYearId: academicYearStore.state.academicYear?.id ?? 0,
    }),
    options: {
      enabled: !!academicYearStore.state.academicYear?.id
    }
  })
  const columns = useMemo<CustomColumnDef<SRMContractSuspend>[]>(() => [
    {
      header: "Mã đề tài",
      accessorKey: "srmContract.code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "srmContract.name",
      size: columnSizeObject.name,
    },
    {
      header: "Chủ nhiệm đề tài",
      accessorKey: "custom_leaderName",
      accessorFn: (row) => row.srmContract?.srmTopic?.srmTopicMembers?.
        filter(item => item.srmTitle?.isLeader == true).map(item => item.user?.fullName).join(", ")
    },
    {
      header: "Số hợp đồng",
      accessorKey: "srmContract.contractNumber",
    },
    {
      header: "Thời gian thực hiện",
      accessorKey: "srmContract.duration",
    },
    {
      header: "Từ tháng/ năm",
      accessorKey: "srmContract.fromDate",
      type: 'MMyyyy'
    },
    {
      header: "Đến tháng/ năm",
      accessorKey: "srmContract.toDate",
      type: 'MMyyyy'
    },
    {
      header: "Lý do hủy",
      accessorKey: "reason",
      size: columnSizeObject.description,
    },
    {
      header: "Trạng thái thực hiện",
      accessorKey: "srmContract.executionStatus",
      size: 240,
      accessorFn: (row) => converterUtils.getLabelByValue(EnumLabelContractExecutionStatus, row.srmContract?.executionStatus),
      Cell: ({ row }) => (
        <Shared_ContractExecuteStatusBadge value={row?.original?.srmContract?.executionStatus ?? 0} />
      )
    },
    {
      header: "File tờ trình xin tạm dừng/ đình chỉ",
      accessorKey: "attachmentDetail",
      type: "viewFile"
    },
    {
      header: "Trạng thái xử lý",
      accessorKey: "processingStatus",
      size: 240,
      accessorFn: (row) => converterUtils.getLabelByValue(EnumLabelProcessingStatus, row.processingStatus),
      Cell: ({ row }) => (
        <CustomEnumBadge
          value={row?.original?.processingStatus}
          enumLabel={EnumLabelProcessingStatus}
          enumColor={EnumColorProcessingStatus}
          enumIcon={EnumIconProcessingStatus}
        />
      )
    },
    {
      header: "Tóm tắt xử lý",
      accessorKey: "processingSummary",
      size: columnSizeObject.description
    },
    {
      header: "File xử lý yêu cầu tạm dừng/ đình chỉ",
      accessorKey: "processingAttachmentPath",
      type: "viewFile"
    }
  ], []);

  return (
    <CustomFieldset
      title="Danh sách yêu cầu điều chỉnh"
    >
      <CustomDataTableAPI
        columns={columns}
        query={contractDetailQuery}
        enableRowSelection={true}
        enableRowNumbers={true}
        exportProps={{
          fileName: "Danh sách yêu cầu điều chỉnh"
        }}
        renderRowActions={({ row }) => {
          return <CustomCenterFull>
            <StopHandleUpdate values={row.original} />
          </CustomCenterFull>
        }}
        pinningRightColumns={['processingStatus']}
      />
    </CustomFieldset>
  );
}