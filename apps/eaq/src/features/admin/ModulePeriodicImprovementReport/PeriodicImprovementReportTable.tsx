import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { IReport } from "@/shared/interfaces/report/IReport";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import {
  EnumColorSubmissionStatus,
  EnumIconSubmissionStatus,
  EnumLabelSubmissionStatus,
  EnumTaskDetailReportStatus,
} from "./enum_taskDetailReportStatus";
import PeriodicImprovementReportExport from "./PeriodicImprovementReportExport";
import PeriodicImprovementReportSendModal from "./PeriodicImprovementReportSendModal";
import PeriodicImprovementReportViewModal from "./PeriodicImprovementReportViewModal";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

const QUERY_KEY = "taskDetailQuery_PeriodicImprovementReportTable";

function usePeriodicReportData(phaseId?: number) {
  return useCustomReactQuery({
    queryKey: [QUERY_KEY, phaseId],
    axiosFn: async () =>
      service_EAQAnalysis.getEAQTaskDetailReportsByEAQPhaseId({ eaqPhaseId: phaseId, analysisType: analysisTypeEnum.Limitation }),
  });
}

function useTableColumns() {
  return useMemo<MRT_ColumnDef<IReport>[]>(
    () => [
      {
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.code",
        header: "Mã tiêu chí",
      },
      {
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.name",
        header: "Tên tiêu chí",
        size: 400,
      },
      {
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.code",
        header: "Mã hạn chế",
      },
      {
        accessorKey: "eaqTaskDetail.code",
        header: "Mã công việc",
      },
      {
        accessorKey: "eaqTaskDetail.name",
        header: "Tên công việc",
        size: 300,
      },
      {
        accessorKey: "eaqTaskDetail.hostUnit.name",
        header: "Tên đơn vị chủ trì",
      },
      {
        accessorKey: "eaqTaskDetail.supportUnit",
        header: "Tên đơn vị phối hợp",
      },
      {
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.limitationType",
        header: "Loại hạn chế",
      },
      {
        accessorKey: "eaqTaskDetail.user.fullName",
        header: "Nhân sự phụ trách",
      },
      {
        accessorKey: "order",
        header: "Lần báo cáo",
      },
      {
        accessorKey: "reportDate",
        header: "Ngày báo cáo",
        accessorFn: (row) =>
          row.reportDate ? dateUtils.toDDMMYYYY(new Date(row.reportDate)) : "",
      },
      {
        accessorKey: "reportStatus",
        header: "Trạng thái báo cáo",
        Cell: ({ row }) => (
          <CustomEnumBadge
            value={row.original.reportStatus}
            enumLabel={EnumLabelSubmissionStatus}
            enumColor={EnumColorSubmissionStatus}
            enumIcon={EnumIconSubmissionStatus}
          />
        ),
      },
      {
        accessorKey: "submitted",
        header: "Đã nộp",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <CustomThemeIconSquareCheck
              checked={row.original.reportStatus === EnumTaskDetailReportStatus.IsSubmitted}
            />
          </CustomCenterFull>
        ),
        size: 150,
      },
      {
        accessorKey: "eaqTaskDetail.expectedResult",
        header: "Kết quả cải tiến",
        size: 300,
      },
      {
        accessorKey: "isReminded",
        header: "Đã nhắc nhở",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <CustomThemeIconSquareCheck checked={!!row.original.isReminded} />
          </CustomCenterFull>
        ),
        size: 150,
      },
      {
        accessorKey: "reminderLogs",
        header: "Chi tiết nhắc nhở",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <PeriodicImprovementReportViewModal eaqReportId={row.original.id!} />
          </CustomCenterFull>
        ),
        size: 250,
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    []
  );
}

export default function PeriodicImprovementReportTable() {
  const filterStore = useS_Shared_Filter();
  const reportQuery = usePeriodicReportData(filterStore.state.Phase?.id);
  const columns = useTableColumns();

  return (
    <CustomFieldset title="Danh sách báo cáo cải tiến">
      <CustomDataTable
        initialState={{
          columnPinning: { right: ["reminderLogs"] },
        }}
        enableRowSelection
        enableRowNumbers={false}
        columns={columns}
        data={reportQuery.data || []}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <PeriodicImprovementReportSendModal
              eaqReportId={row.original.id!}
              userId={row.original.eaqTaskDetail?.userId!}
              userFullName={row.original.eaqTaskDetail?.user?.fullName}
            />
          </CustomCenterFull>
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            <PeriodicImprovementReportExport table={table} />
          </Group>
        )}
      />
    </CustomFieldset>
  );
}
