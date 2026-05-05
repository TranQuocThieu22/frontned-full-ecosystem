"use client";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Anchor, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ExistingEvidenceComparisonDeleteButton from "./ExistingEvidenceComparisonDeleteButton";
import ExistingEvidenceComparisonUpdateModal from "./ExistingEvidenceComparisonUpdateModal";
import ExistingEvidenceComparisonViewModal from "./ExistingEvidenceComparisonViewModal";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function RecordResultsCollectRealWorldEvidenceRead() {
  const phaseStore = useS_Shared_Filter();

  const taskDetailEvidencesQuery = useCustomReactQuery({
    queryKey: ["EvidencesByStandardSetId", phaseStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailEvidencesByEAQPhaseId({
        eaqPhaseId: phaseStore.state.Phase?.id,
      }),
    options: {
      enabled: !!phaseStore.state.Phase,
    },
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(() => [
    {
      header: "Mã Minh chứng",
      accessorKey: "eaqExpectedEvidenceCode",
      size: 100
    },
    {
      header: "Tên Minh chứng",
      accessorKey: "eaqExpectedEvidenceName",
      size: 380
    },
    {
      header: "Chương trình đào tạo",
      accessorKey: "eaqTaskDetail.eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
      size: 400
    },
    {
      header: "Mã giai đoạn",
      accessorKey: "eaqTaskDetail.eaqTask.eaqEvaluationPlan.eaqPhase.code"
    },
    {
      header: "Mã MC Trực thuộc (Cha)",
      accessorFn: row => {
        const id = row.eaqTaskDetailEvidenceId;
        const val = taskDetailEvidencesQuery.data?.find(item => item.id === id)?.eaqExpectedEvidenceCode;
        return val || <Text size="xs" c="dimmed">Không có dữ liệu</Text>;
      }
    },
    { header: "Số - Ngày ban hành", accessorKey: "eaqExpectedEvidenceDate" },
    { header: "Đơn vị ban hành", accessorKey: "eaqExpectedEvidenceUnitRelease" },
    {
      header: "Hiệu lực từ ngày",
      accessorFn: row => {
        const date = row.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate;
        return date
          ? dateUtils.toDDMMYYYY(new Date(date))
          : <Text size="xs" c="dimmed">Không có thông tin</Text>;
      }
    },
    {
      header: "Hiệu lực đến ngày",
      accessorFn: row => {
        const date = row.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate;
        return date
          ? dateUtils.toDDMMYYYY(new Date(date))
          : <Text size="xs" c="dimmed">Không có thông tin</Text>;
      }
    },
    {
      header: "File đính kèm",
      accessorFn: row => {
        const path = row.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFilePath;
        return path
          ? <CustomCenterFull>
            <CustomButtonViewFileAPI filePath={path} />
          </CustomCenterFull>
          : <Text size="xs" c="dimmed">Không có dữ liệu</Text>;
      }
    },
    {
      header: "Link liên kết",
      size: 300,
      accessorFn: row => {
        const link = row.eaqEvidence?.eaqEvidenceCurrentVersion?.link;

        return link
          ? <Anchor truncate href={link} target="_blank">
            <Text truncate maw={200}>
              {link}
            </Text>
          </Anchor>
          : <Text size="xs" c="dimmed">Không có dữ liệu</Text>;
      }
    },
    { header: "Ghi chú", accessorKey: "eaqExpectedEvidenceNote", size: 600 },
  ], [taskDetailEvidencesQuery.data]);

  return (
    <CustomFieldset title="Danh sách minh chứng dự kiến">
      <CustomDataTable
        isError={taskDetailEvidencesQuery.isError}
        isLoading={taskDetailEvidencesQuery.isLoading}
        columns={columns}
        data={taskDetailEvidencesQuery.data || []}

        renderRowActions={({ row }) => (
          <CustomFlexRow gap={6}>
            <ExistingEvidenceComparisonViewModal values={row.original} />
            <ExistingEvidenceComparisonUpdateModal values={row.original} />
            <ExistingEvidenceComparisonDeleteButton
              taskDetailEvidenceId={row.original.id}
              code={row.original.eaqExpectedEvidenceCode || ""}
              note={row.original.eaqExpectedEvidenceNote || ""}
            />
          </CustomFlexRow>
        )}
      />
    </CustomFieldset>
  );
}
