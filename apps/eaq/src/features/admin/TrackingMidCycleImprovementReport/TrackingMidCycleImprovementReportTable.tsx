import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";

import {
  ReportStatusEnum,
  ReportStatusEnumColor,
  ReportStatusEnumIcon,
  ReportStatusEnumLabel,
} from "@/shared/constants/enum/ReportStatusEnum";
import {
  TrackingStatusEnum,
  TrackingStatusEnumColor,
  TrackingStatusEnumIcon,
  TrackingStatusEnumLabel,
} from "@/shared/constants/enum/TrackingStatusEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import { EnumTaskDetailReportStatus } from "../ModulePeriodicImprovementReport/enum_taskDetailReportStatus";
import TrackingMidCycleImprovementReportCheck from "./TrackingMidCycleImprovementReportCheck";
import TrackingMidCycleImprovementReportExport from "./TrackingMidCycleImprovementReportExport";
import TrackingMidCycleImprovementReportViewDetail from "./TrackingMidCycleImprovementReportViewDetail";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function TrackingMidCycleImprovementReportTable() {
  const filterStore = useS_Shared_Filter();

  const limitationQuery = useCustomReactQuery({
    queryKey: ["limitationQuery", filterStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQLimitation.getLimitationsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
  });

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
        type: "squareCheck",
        Cell: ({ row }) => {
          return (
            <CustomCenterFull>
              <CustomThemeIconSquareCheck
                checked={row.original?.reportStatus === EnumTaskDetailReportStatus.IsSubmitted}
              />
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Trạng thái tổng hợp",
        accessorKey: "reportStatus",
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
        accessorKey: "trackingStatus",
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

  return (
    <CustomFieldset title="Danh sách hạn chế">
      <CustomDataTable
        enableRowNumbers={true}
        enableRowSelection={true}
        isLoading={limitationQuery.isLoading}
        isError={limitationQuery.isError}
        data={limitationQuery.data || []}
        columns={columns}
        renderTopToolbarCustomActions={({ table }) => {
          return <TrackingMidCycleImprovementReportExport table={table} />;
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <TrackingMidCycleImprovementReportViewDetail data={row.original} />

              <TrackingMidCycleImprovementReportCheck initValues={row.original} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
