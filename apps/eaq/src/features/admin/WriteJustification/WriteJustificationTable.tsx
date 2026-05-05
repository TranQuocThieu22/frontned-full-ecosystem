"use client";
import {
  ReportStatusEnumColor,
  ReportStatusEnumIcon,
  ReportStatusEnumLabel,
  ReportStatusEnum,
} from "@/shared/constants/enum/ReportStatusEnum";
import { TaskDetailReportStatusEnum } from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import {
  TrackingStatusEnumColor,
  TrackingStatusEnumIcon,
  TrackingStatusEnumLabel,
  TrackingStatusEnum,
} from "@/shared/constants/enum/TrackingStatusEnum";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import WriteJustificationDeleteListButton from "./WriteJustificationDeleteListButton";
import WriteJustificationExportButton from "./WriteJustificationExportButton";
import WriteJustificationViewOrUpdateButton from "./WriteJustificationViewOrUpdateButton";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

function useReportData(phaseId?: number) {
  return useCustomReactQuery({
    queryKey: ["requirementQuery", phaseId],
    axiosFn: async () =>
      service_EAQRequirement.GetEAQRequirementsByEAQPhaseId({
        eaqPhaseId: phaseId,
      }),
  });
}
export default function WriteJustificationTable() {
  const filterStore = useS_Shared_Filter();
  const reportQuery = useReportData(filterStore.state.Phase?.id);

  const columns = useMemo<CustomColumnDef<IRequirement>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqCriteria.code",
      },
      {
        header: "Tên tiêu chí",
        accessorKey: "eaqCriteria.name",
        size: columnSizeObject.name,
      },
      {
        header: "Mã yêu cầu",
        accessorKey: "code",
      },
      {
        header: "Tên yêu cầu",
        accessorKey: "name",
        size: columnSizeObject.name,
      },
      {
        header: "Đơn vị chủ trì",
        accessorKey: "hostUnit.name",
        size: columnSizeObject.name,
      },
      {
        header: "Nhân sự phụ trách",
        accessorKey: "user.fullName",
      },
      {
        header: "Đã nộp",
        accessorKey: "submitted",
        type: "squareCheck",
        Cell: ({ row }) => {
          return (
            <CustomCenterFull>
              <CustomThemeIconSquareCheck
                checked={
                  row.original?.reportStatus ===
                  TaskDetailReportStatusEnum.IsSubmitted
                }
              />
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Trạng thái tổng hợp",
        accessorKey: "reportStatus",
        accessorFn: (row) => (
          <CustomEnumBadge
            value={row.reportStatus}
            enumLabel={ReportStatusEnumLabel}
            enumColor={ReportStatusEnumColor}
            enumIcon={ReportStatusEnumIcon}
          />
        ),
      },
      {
        header: "Trạng thái kiểm tra",
        accessorKey: "trackingStatus",
        size: 200,
        accessorFn: (row) => (
          <CustomEnumBadge
            value={row.trackingStatus}
            enumLabel={TrackingStatusEnumLabel}
            enumColor={TrackingStatusEnumColor}
            enumIcon={TrackingStatusEnumIcon}
          />
        ),
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách yêu cầu">
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        enableRowNumbers={false}
        isLoading={reportQuery?.isLoading}
        isError={reportQuery?.isError}
        data={reportQuery?.data ?? []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <WriteJustificationExportButton
                table={table}
                loading={reportQuery?.isLoading}
              />
              <WriteJustificationDeleteListButton
                table={table}
                disabled={table.getSelectedRowModel().rows.length === 0}
              />
            </>
          );
        }}
        renderRowActions={({ row }) => {
          const { reportStatus, trackingStatus } = row.original;

          const isEditDisabled =
            (reportStatus === ReportStatusEnum.submitted &&
              trackingStatus !== TrackingStatusEnum.requiresCorrection) ||
            trackingStatus === TrackingStatusEnum.approved;

          return (
            <CustomCenterFull>
              <WriteJustificationViewOrUpdateButton
                data={row.original}
                viewOnly={true}
              />
              <WriteJustificationViewOrUpdateButton
                data={row.original}
                viewOnly={false}
                disabled={isEditDisabled}
              />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
