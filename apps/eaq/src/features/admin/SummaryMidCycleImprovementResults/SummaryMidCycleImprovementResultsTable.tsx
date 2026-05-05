import {
  ReportStatusEnumColor,
  ReportStatusEnumIcon,
  ReportStatusEnumLabel,
  ReportStatusEnum,
} from "@/shared/constants/enum/ReportStatusEnum";
import {
  TrackingStatusEnumColor,
  TrackingStatusEnumIcon,
  TrackingStatusEnumLabel,
  TrackingStatusEnum,
} from "@/shared/constants/enum/TrackingStatusEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import SummaryMidCycleImprovementResultsDeleteList from "./SummaryMidCycleImprovementResultsDeleteList";
import TrackingMidCycleImprovementReportExport from "./SummaryMidCycleImprovementResultsExport";
import SummaryMidCycleImprovementResultsViewOrUpdate from "./SummaryMidCycleImprovementResultsViewOrUpdate";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";

function useReportData(phaseId?: number) {
  return useCustomReactQuery({
    queryKey: ["limitationQuery", phaseId],
    axiosFn: async () =>
      service_EAQLimitation.getLimitationsByEAQPhaseId({ eaqPhaseId: phaseId }),
  });
}
export default function SummaryMidCycleImprovementResultsTable() {
  const filterStore = useS_Shared_Filter();
  const reportQuery = useReportData(filterStore.state.Phase?.id);

  const columns = useMemo<CustomColumnDef<ILimitation>[]>(
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
        header: "Mã hạn chế",
        accessorKey: "code",
      },
      {
        header: "Hạn chế",
        accessorKey: "name",
        size: columnSizeObject.name,
      },
      {
        header: "Đơn vị chủ trì",
        accessorKey: "hostUnit.name",
      },
      {
        header: "Nhân sự phụ trách",
        accessorKey: "user.fullName",
      },
      {
        header: "Đã nộp",
        accessorKey: "submitted",
        Cell: ({ row }) => {
          return (
            <CustomCenterFull>
              <CustomThemeIconSquareCheck
                checked={
                  row.original?.reportStatus === ReportStatusEnum.submitted
                }
              />
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Trạng thái tổng hợp",
        accessorKey: 'reportStatus',
        type: "statusBadge",
        statusBadgeProps: {
          enumColor: ReportStatusEnumColor,
          enumLabel: ReportStatusEnumLabel,
          enumIcon: ReportStatusEnumIcon,
          enumObject: ReportStatusEnum
        },
      },
      {
        header: "Trạng thái kiểm tra",
        accessorKey: 'trackingStatus',
        type: "statusBadge",
        statusBadgeProps: {
          enumLabel: TrackingStatusEnumLabel,
          enumColor: TrackingStatusEnumColor,
          enumIcon: TrackingStatusEnumIcon,
          enumObject: TrackingStatusEnum
        },
        size: 200,
      },
    ],
    []
  );
  const isDisable = (reportStatus: number | undefined, trackingStatus: number | undefined) => {
    const isSumitted = reportStatus === ReportStatusEnum.submitted
    const isRequiresCorrection = trackingStatus !== TrackingStatusEnum.requiresCorrection
    if (isSumitted && isRequiresCorrection) return true
    else if (trackingStatus === TrackingStatusEnum.approved) return true
    return false
  }
  return (
    <CustomFieldset title="Danh sách hạn chế">
      <CustomDataTableAPI
        enableRowNumbers={false}
        enableRowSelection={true}
        isLoading={reportQuery?.isLoading}
        isError={reportQuery?.isError}
        query={reportQuery}
        columns={columns}
        // exportProps={{
        //   fileName: 'Danh sách bái cáo cải tiến giữa chu kỳ'
        // }}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows = table
            .getSelectedRowModel()
            .rows.map((row) => row.original);
          return (
            <>
              <TrackingMidCycleImprovementReportExport table={table} />
              <SummaryMidCycleImprovementResultsDeleteList
                table={table}
                disabled={selectedRows.length === 0}
              />
            </>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <SummaryMidCycleImprovementResultsViewOrUpdate
                data={row.original}
                viewOnly={true}
              />
              <SummaryMidCycleImprovementResultsViewOrUpdate
                data={row.original}
                disabled={isDisable(row.original.reportStatus, row.original.trackingStatus)}
              />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
