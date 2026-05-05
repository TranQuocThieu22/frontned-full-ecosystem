import {
  ReportStatusEnumColor,
  ReportStatusEnumIcon,
  ReportStatusEnumLabel,
} from "@/shared/constants/enum/ReportStatusEnum";
import { TaskDetailReportStatusEnum } from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import {
  TrackingStatusEnumColor,
  TrackingStatusEnumIcon,
  TrackingStatusEnumLabel,
} from "@/shared/constants/enum/TrackingStatusEnum";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import TrackingJustificationCheckButton from "./TrackingJustificationCheckButton";
import TrackingJustificationExportButton from "./TrackingJustificationExportButton";
import TrackingJustificationViewButton from "./TrackingJustificationViewButton";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function TrackingJustificationTable() {
  const filterStore = useS_Shared_Filter();

  const requirementQuery = useCustomReactQuery({
    queryKey: ["requirementQuery", filterStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQRequirement.GetEAQRequirementsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
  });

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
                checked={row.original?.reportStatus === TaskDetailReportStatusEnum.IsSubmitted}
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
        enableRowNumbers={true}
        isLoading={requirementQuery.isLoading}
        isError={requirementQuery.isError}
        data={requirementQuery?.data || []}
        rowActionSize={200}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <TrackingJustificationExportButton
                table={table}
                loading={requirementQuery.isLoading}
              />
            </>
          );
        }}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <TrackingJustificationViewButton data={row.original} />
            <TrackingJustificationCheckButton value={row.original} />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
