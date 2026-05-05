"use client";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";


import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function ExpectedEvidenceTab({
  standardId,
  criteriaId,
  values,
}: {
  standardId?: string;
  criteriaId?: string;
  values?: ITaskDetail;
}) {
  const useS_StandardSet = useS_Shared_Filter();
  const evidencesQuery = useCustomReactQuery({
    queryKey: ["ExpectedEvidenceTab_EvidencesByStandardSetId"],
    axiosFn: async () => service_EAQEvaluationPlan.GetEAQTaskDetailEvidencesByEAQPhaseId({
      eaqPhaseId: useS_StandardSet.state?.Phase?.id,
    }),
  });
  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã Tiêu chuẩn",
        Cell: () => {
          return standardId;
        },
        size: 120,
      },
      {
        header: "Mã Tiêu chí",
        Cell: () => {
          return criteriaId;
        },
        size: 120,
      },
      {
        header: "Mã Minh chứng",
        accessorKey: "eaqExpectedEvidenceCode",
      },
      {
        header: "Tên Minh chứng",
        accessorKey: "eaqExpectedEvidenceName",
        size: 350,
      },
      {
        header: "Trực thuộc minh chứng",
        // accessorKey: "eaqEvidence.referenceEvidenceId",
        accessorFn: (row) => {
          return evidencesQuery.data?.find(
            (item) => item.id === row.eaqTaskDetailEvidenceId
          )?.eaqExpectedEvidenceCode;
        },
      },
      {
        header: "Số - ngày ban hành - thời điểm khảo sát",
        accessorKey: "eaqExpectedEvidenceDate",
        size: 280,
      },
      { header: "Nơi ban hành", accessorKey: "eaqExpectedEvidenceUnitRelease" },
      { header: "Ghi chú", accessorKey: "eaqExpectedEvidenceNote", size: 300 },
    ],
    [values, evidencesQuery.data]
  );

  return (
    <CustomFieldset title="Danh sách yêu cầu">
      <CustomDataTable
        columns={columns}
        data={values?.eaqTaskDetailEvidences || []}
        enableRowSelection
      />
    </CustomFieldset>
  );
}
