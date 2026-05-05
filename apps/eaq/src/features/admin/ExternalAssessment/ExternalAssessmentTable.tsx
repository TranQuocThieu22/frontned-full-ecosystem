"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import {
  SelfAssessmentStatusEnumColor,
  SelfAssessmentStatusEnumIcon,
  SelfAssessmentStatusEnumLabel,
} from "@/shared/constants/enum/SelfAssessmentStatusEnum";
import ExternalAssessmentEvaluate from "./ExternalAssessmentEvaluate";
import ExternalAssessmentViewOrUpdate from "./ExternalAssessmentViewOrUpdate";
import ExternalAssessmentPrintPDF from "./ExternalAssessmentPrintPDF";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function ExternalAssessmentTable() {
  const standardSetStore = useS_Shared_Filter();

  const ExternalAssessmentQuery = useCustomReactQuery({
    queryKey: ["selfAssessmentForm04List", standardSetStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: standardSetStore.state.Phase?.id,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã Chương trình",
        accessorKey: "eaqTask.eaqEvaluationPlan.code",
      },
      {
        header: "Chương trình đào tạo",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
        size: 250,
      },
      {
        header: "Mã giai đoạn",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.code",
      },
      { header: "Mã Tiêu chuẩn", accessorKey: "eaqCriteria.eaqStandard.code" },
      { header: "Mã tiêu chí", accessorKey: "eaqCriteria.code" },
      { header: "Tên tiêu chí", accessorKey: "eaqCriteria.name", size: 600 },
      {
        header: "Tự đánh giá",
        size: 240,
        accessorFn: (row) => (
          <CustomEnumBadge
            value={row.selfAssessmentStatus}
            enumLabel={SelfAssessmentStatusEnumLabel}
            enumColor={SelfAssessmentStatusEnumColor}
            enumIcon={SelfAssessmentStatusEnumIcon}
          />
        ),
      },
      {
        header: "ĐGN đã nhận xét",
        accessorKey: "isExternalCheck",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <CustomThemeIconSquareCheck checked={row.original.isExternalCheck} />
          </CustomCenterFull>
        ),
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách tiêu chí">
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        isLoading={false}
        isError={false}
        renderTopToolbarCustomActions={({ table }) => {
          return <></>;
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <ExternalAssessmentEvaluate data={row.original} />
              <ExternalAssessmentViewOrUpdate data={row.original} />
              <ExternalAssessmentPrintPDF data={row.original} />
            </CustomCenterFull>
          );
        }}
        data={ExternalAssessmentQuery.data || []}
      />
    </CustomFieldset>
  );
}
