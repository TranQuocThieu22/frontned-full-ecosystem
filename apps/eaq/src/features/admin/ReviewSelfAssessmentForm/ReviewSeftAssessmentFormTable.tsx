import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import {
  SelfAssessmentStatusEnumColor,
  SelfAssessmentStatusEnumIcon,
  SelfAssessmentStatusEnumLabel,
} from "@/shared/constants/enum/SelfAssessmentStatusEnum";
import {
  TaskDetailVerificationStatusEnumColor,
  TaskDetailVerificationStatusEnumIcon,
  TaskDetailVerificationStatusEnumLabel
} from "@/shared/constants/enum/TaskDetailVerificationStatusEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import ViewCommentButton from "./ViewCommentButton";
import PrintPDFButton from "./PrintPDFButton";
import ReviewSelfAssessmentViewDetail from "./ReviewSelfAssessmentViewDetail";
import VerificationButton from "./VerificationButton";

export default function ReviewSeftAssessmentFormTable() {
  const standardSetStore = useS_Shared_Filter();

  const taskDetailListQuery = useCustomReactQuery({
    queryKey: ["Task_Detail_List", standardSetStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: standardSetStore.state.Phase?.id,
      }),
  });

  const columns = useMemo<CustomColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã Kế hoạch TĐG",
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
        size: 500,
      },
      {
        header: "Nhóm công tác chuyên trách",
        accessorKey: "eaqTask.eaqCouncilGroup.code",
      },
      {
        header: "Thành viên phụ trách",
        accessorKey: "user.fullName",
      },
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
        header: "Trạng thái kiểm tra",
        accessorKey: "selfAssessmentTrackingStatus",
        size: 300,
        Cell: ({ row }) => {
          const status = row.original.selfAssessmentTrackingStatus;
          return <CustomEnumBadge
            value={status ? status : 1}
            enumLabel={TaskDetailVerificationStatusEnumLabel}
            enumColor={TaskDetailVerificationStatusEnumColor}
            enumIcon={TaskDetailVerificationStatusEnumIcon}
          />
        }
      },
      {
        header: "Nhận xét chung",
        accessorKey: "selfAssessmentReview",
        size: 500,
      },
      {
        header: "Nhận xét chi tiết",
        accessorKey: "noteDetail",
        accessorFn: (row) => <ViewCommentButton data={row} />,
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách tiêu chí">
      <CustomDataTable
        isLoading={taskDetailListQuery.isLoading}
        isError={taskDetailListQuery.isError}
        data={taskDetailListQuery.data || []}
        enableRowSelection
        enableRowNumbers
        columns={columns}
        enableRowActions
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <ReviewSelfAssessmentViewDetail
              phaseId={row.original.eaqTask?.eaqEvaluationPlan?.eaqPhaseId}
              taskDetailId={row.original?.id}
            />
            <VerificationButton taskDetail={row.original} />
            <PrintPDFButton values={row.original} />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
