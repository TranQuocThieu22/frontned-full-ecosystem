"use client";

import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import {
  TaskDetailReportStatusEnum,
  TaskDetailReportStatusEnumColor,
  TaskDetailReportStatusEnumLabel,
  TaskDetailReportStatusEnumStatus,
} from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { IReport } from "@/shared/interfaces/report/IReport";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Center } from "@mantine/core";
import { useMemo } from "react";
import QaReportTrackingExport from "./QualityAssuranceImplementationReportExport";
import QaReportTrackingReminderDetails from "./QualityAssuranceImplementationReportReminderDetails";
import QaReportTrackingSendReminders from "./QualityAssuranceImplementationReportSendReminders";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function QualityAssuranceImplementationReportTable() {
  const filterStore = useS_Shared_Filter();

  const TaskQueryDetailReportQuery = useCustomReactQuery({
    queryKey: ["TaskQueryDetailReport", filterStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.getEAQTaskDetailReportsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: analysisTypeEnum.Requirement,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const columns = useMemo<CustomColumnDef<IReport>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
      },
      {
        header: "Mã yêu cầu",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.code",
      },
      {
        header: "Tên yêu cầu",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.name",
        size: columnSizeObject.name,
      },
      {
        header: "Mã công việc",
        accessorKey: "eaqTaskDetail.code",
      },
      {
        header: "Nội dung công việc",
        accessorKey: "eaqTaskDetail.name",
        size: columnSizeObject.description,
      },
      {
        header: "Tên đơn vị chủ trì",
        accessorKey: "eaqTaskDetail.hostUnit.name",
      },
      {
        header: "Nhân sự phụ trách",
        accessorKey: "eaqTaskDetail.user.fullName",
      },
      {
        header: "Tên đơn vị phối hợp",
        accessorKey: "eaqTaskDetail.supportUnit",
      },
      {
        header: "Lần báo cáo",
        accessorKey: "order",
      },
      {
        header: "Ngày hết hạn",
        accessorKey: "reportDate",
        accessorFn: (row) => (row.reportDate ? dateUtils.toDDMMYYYY(row.reportDate) : ""),
      },
      {
        header: "Trạng thái báo cáo",
        accessorKey: "reportStatus",
        accessorFn: (row) => (
          <CustomEnumBadge
            value={row.reportStatus}
            enumLabel={TaskDetailReportStatusEnumLabel}
            enumColor={TaskDetailReportStatusEnumColor}
            enumIcon={TaskDetailReportStatusEnumStatus}
          />
        ),
      },
      {
        header: "Đã nộp",
        accessorKey: "submitted",
        accessorFn: (row) => (
          <Center>
            <CustomThemeIconSquareCheck
              checked={row.reportStatus == TaskDetailReportStatusEnum.IsSubmitted}
            />
          </Center>
        ),
      },
      {
        header: "Đã nhắc nhở",
        accessorKey: "isReminded",
        type: "squareCheck",
      },
      {
        header: "Công việc đã thực hiện",
        accessorKey: "result",
        size: 500
      },
      {
        accessorKey: "reminderDetails",
        header: "Chi tiết nhắc nhở",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <QaReportTrackingReminderDetails eaqReportId={row.original.id!} />
          </CustomCenterFull>
        ),
        size: 250,
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách công việc">
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <QaReportTrackingExport table={table} />
            </>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <QaReportTrackingSendReminders
                values={{
                  eaqPhaseId: filterStore.state.Phase?.id || 0,
                  eaqReportId: row.original.id,
                  userId: row.original.eaqTaskDetail?.userId || 0,
                }}
              />
            </CustomCenterFull>
          );
        }}
        data={TaskQueryDetailReportQuery?.data || []}
      />
    </CustomFieldset>
  );
}
