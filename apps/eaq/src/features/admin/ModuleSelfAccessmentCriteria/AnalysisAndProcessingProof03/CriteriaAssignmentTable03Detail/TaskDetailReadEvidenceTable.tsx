"use client";

import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface Props {
  values?: ITaskDetail;
  criteriaCode: string;
  standardCode: string;
}

export default function TaskDetailReadEvidenceTable({
  values,
  criteriaCode,
  standardCode,
}: Props) {
  const standardSetStore = useS_Shared_Filter();

  const taskDetailEvidencesQuery = useCustomReactQuery({
    queryKey: ["EvidencesByStandardSetId"],
    axiosFn: async () =>
      service_EAQEvaluationPlan.TaskDetailEvidenceGetAll({}),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
      select: (data: ITaskDetailEvidence[]) => {
        const evidenceLookup = new Map(data.map(item => [item.id, item.eaqExpectedEvidenceCode]))
        return {
          raw: data,
          lookup: evidenceLookup
        }
      }
    },
  });


  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã Tiêu chuẩn",
        size: 200,
        accessorFn: () => standardCode
      },
      {
        header: "Mã Tiêu chí",
        size: 200,
        accessorFn: () => criteriaCode
      },
      {
        header: "Mã Minh chứng",
        accessorKey: "eaqExpectedEvidenceCode",
        size: 200,
      },
      {
        header: "Tên Minh chứng",
        accessorKey: "eaqExpectedEvidenceName",
        size: 350,
      },
      {
        header: "Trực thuộc minh chứng",
        accessorFn: (row) => {
          // Now this is an O(1) operation instead of O(n)
          return row.eaqTaskDetailEvidenceId ? taskDetailEvidencesQuery.data?.lookup.get(row.eaqTaskDetailEvidenceId) ?? "—" : '-'
        },
        size: 280,
      },
      {
        header: "Số - ngày ban hành - thời điểm khảo sát",
        accessorKey: "eaqExpectedEvidenceDate",
        size: 380,
      },
      { header: "Nơi ban hành", accessorKey: "eaqExpectedEvidenceUnitRelease" },
      { header: "Ghi chú", accessorKey: "eaqExpectedEvidenceNote", size: 380 },
    ],
    [values, taskDetailEvidencesQuery.data]
  );

  return (
    <CustomFieldset title="Danh sách yêu cầu">
      <CustomFlexColumn>
        <CustomDataTable
          enableRowNumbers
          isLoading={taskDetailEvidencesQuery.isLoading}
          isError={taskDetailEvidencesQuery.isError}
          data={values?.eaqTaskDetailEvidences || []}
          columns={columns}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
