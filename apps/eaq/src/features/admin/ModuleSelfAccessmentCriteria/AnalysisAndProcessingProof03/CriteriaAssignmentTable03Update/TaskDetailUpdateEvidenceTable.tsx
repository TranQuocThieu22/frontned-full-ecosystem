"use client";

import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TaskDetailUpdateEvidenceCreateUpdateButton from "./TaskDetailUpdateEvidenceCreateUpdateButton";
import TaskDetailUpdateEvidenceDeleteButton from "./TaskDetailUpdateEvidenceDeleteButton";
import TaskDetailUpdateEvidenceDeleteListButton from "./TaskDetailUpdateEvidenceDeleteListButton";
import TaskDetailUpdateEvidenceImportButton from "./TaskDetailUpdateEvidenceImportButton";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
  values?: ITaskDetail;
  criteriaCode: string;
  standardCode: string;
}

export default function TaskDetailUpdateEvidenceTable({
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
    },
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã Tiêu chuẩn",
        size: 120,
        accessorFn: () => {
          return standardCode;
        },
      },
      {
        header: "Mã Tiêu chí",
        size: 120,
        accessorFn: () => {
          return criteriaCode;
        },
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
        accessorFn(row) {
          return taskDetailEvidencesQuery.data?.find(
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
    [values, taskDetailEvidencesQuery.data]
  );

  const exportConfig = {
    fields: [
      {
        header: "Mã Tiêu chuẩn",
        fieldName: "standardCode",

      },
      {
        header: "Mã Tiêu chí",
        fieldName: "criteriaCode",

      },
      {
        header: "Mã Minh chứng",
        fieldName: "eaqExpectedEvidenceCode",
      },
      {
        header: "Tên Minh chứng",
        fieldName: "eaqExpectedEvidenceName",
      },
      {
        header: "Trực thuộc minh chứng",
        fieldName: "eaqTaskDetailEvidenceId",
        formatFunction(value: any, row: ITaskDetailEvidence) {
          return taskDetailEvidencesQuery.data?.find(
            (item) => item.id === row.eaqTaskDetailEvidenceId
          )?.eaqExpectedEvidenceCode || "";
        },
      },
      {
        header: "Số - ngày ban hành - thời điểm khảo sát",
        fieldName: "eaqExpectedEvidenceDate",
      },
      { header: "Nơi ban hành", fieldName: "eaqExpectedEvidenceUnitRelease" },
      { header: "Ghi chú", fieldName: "eaqExpectedEvidenceNote" },

    ]
  }

  return (
    <CustomFieldset title="Danh sách yêu cầu">
      <CustomFlexColumn>
        <CustomDataTable
          enableRowSelection
          enableRowNumbers
          isLoading={taskDetailEvidencesQuery.isLoading}
          isError={taskDetailEvidencesQuery.isError}
          data={values?.eaqTaskDetailEvidences || []}
          columns={columns}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <TaskDetailUpdateEvidenceCreateUpdateButton
                values={row.original as ITaskDetailEvidence}
                taskDetail={values}
              />
              <TaskDetailUpdateEvidenceDeleteButton
                code={row.original.eaqExpectedEvidenceCode ?? ""}
                id={row.original.id}
                values={values}
              />
            </CustomCenterFull>
          )}
          renderTopToolbarCustomActions={({ table }) => {
            // Get selected rows from table of destructured object
            const selectedRows =
              table
                .getSelectedRowModel()
                .flatRows.map((item) => item.original) || [];

            return (
              <Group>
                <TaskDetailUpdateEvidenceCreateUpdateButton
                  taskDetail={values}
                />

                <TaskDetailUpdateEvidenceImportButton taskDetail={values} />

                <AQButtonExportData
                  objectName="Danh_sach_yeu_cau"
                  data={values?.eaqTaskDetailEvidences || []}
                  exportConfig={exportConfig}
                />

                <TaskDetailUpdateEvidenceDeleteListButton
                  evidences={selectedRows}
                  values={values}
                />
              </Group>
            );
          }}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
