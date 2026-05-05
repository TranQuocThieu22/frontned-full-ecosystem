import {
  SelfAssessmentStatusEnumColor,
  SelfAssessmentStatusEnumIcon,
  SelfAssessmentStatusEnumLabel,
} from "@/shared/constants/enum/SelfAssessmentStatusEnum";
import { TaskDetailVerificationStatusEnum, TaskDetailVerificationStatusEnumColor, TaskDetailVerificationStatusEnumIcon, TaskDetailVerificationStatusEnumLabel } from "@/shared/constants/enum/TaskDetailVerificationStatusEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Center } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import EvalCriteriaFormPrintButton from "./EvalCriteriaFormPrintPDFButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function EvalCriteriaFormTable() {
  const [evalCriterias, setEvalCriterias] = useState<ITaskDetail[]>([]);

  const filterStore = useS_Shared_Filter();

  const evalCriteriaQuery = useCustomReactQuery({
    queryKey: ["EvalCriteriaRead", filterStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  useEffect(() => {
    if (evalCriteriaQuery.data) {
      // Lọc các tiêu chí có trạng thái đạt yêu cầu
      const evalCriterias = evalCriteriaQuery.data.filter(
        (item) => item.selfAssessmentTrackingStatus === TaskDetailVerificationStatusEnum.MeetsStandard
      );

      setEvalCriterias(evalCriterias);
    }
  }, [evalCriteriaQuery.data]);

  const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã kế hoạch TDG",
        accessorKey: "eaqTask.eaqEvaluationPlan.code",
      },
      {
        header: "Chương trình đào tạo",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
        size: columnSizeObject.name
      },
      {
        header: "Mã giai đoạn",
        accessorKey: "eaqTask.eaqEvaluationPlan.eaqPhase.code",
      },
      {
        header: "Mã Tiêu chuẩn",
        accessorKey: "eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã Tiêu chí",
        accessorKey: "eaqCriteria.code",
      },
      {
        header: "Tên Tiêu chí",
        accessorKey: "eaqCriteria.name",
        size: 500
      },
      {
        header: "Nhóm công tác chuyên trách",
        accessorKey: "eaqTask.eaqCouncilGroup.name",
      },
      {
        header: "Thành viên phụ trách",
        accessorKey: "user.fullName"
      },
      {
        header: "Tự đánh giá",
        accessorKey: "selfAssessmentStatus",
        accessorFn(row) {
          return (
            <CustomEnumBadge
              value={row.selfAssessmentStatus}
              enumLabel={SelfAssessmentStatusEnumLabel}
              enumColor={SelfAssessmentStatusEnumColor}
              enumIcon={SelfAssessmentStatusEnumIcon}
            />
          );
        },
      },
      {
        header: "Trạng thái kiểm tra",
        accessorKey: "selfAssessmentVerificationStatus",
        accessorFn(row) {
          return (
            <CustomEnumBadge
              value={row.selfAssessmentTrackingStatus ?? 1}
              enumLabel={TaskDetailVerificationStatusEnumLabel}
              enumColor={TaskDetailVerificationStatusEnumColor}
              enumIcon={TaskDetailVerificationStatusEnumIcon}
            />
          );
        },
      },
      {
        header: "Nhận xét chung",
        accessorKey: "selfAssessmentReview",
        size: 600
      },
    ],
    []
  );

  return (
    <CustomFieldset title={"Danh sách tiêu chí"}>
      <CustomDataTable
        isLoading={evalCriteriaQuery.isLoading}
        isError={evalCriteriaQuery.isError}
        columns={columns}
        data={evalCriterias || []}
        enableRowSelection
        enableColumnFilters
        enableRowNumbers
        renderRowActions={({ row }) => (
          <Center>
            <EvalCriteriaFormPrintButton values={row.original} />
          </Center>
        )}
      />
    </CustomFieldset>
  );
}
