"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import {
  SelfAssessmentStatusEnumColor,
  SelfAssessmentStatusEnumIcon,
  SelfAssessmentStatusEnumLabel,
} from "@/shared/constants/enum/SelfAssessmentStatusEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { DisplayVerificationStatus } from "../TrackingProgressSeftAssessment/ComponentShared/DisplayVerificationStatus";
import SelfAssessmentForm04Evaluate from "./SelfAssessmentForm04Evaluate";
import SelfAssessmentForm04ViewOrUpdate from "./SelfAssessmentForm04ViewOrUpdate";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { TextInput } from "@mantine/core";
import { TaskDetailVerificationStatusEnumLabel, TaskDetailVerificationStatusEnumColor, TaskDetailVerificationStatusEnumIcon } from "@/shared/constants/enum/TaskDetailVerificationStatusEnum";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";

export default function SelfAssessmentForm04Table() {
  const standardSetStore = useS_Shared_Filter();
  const queryClient = useQueryClient();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const selfAssessmentForm04List = useCustomReactQuery({
    queryKey: ["selfAssessmentForm04List", standardSetStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: standardSetStore.state.Phase?.id,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã Kế hoạch TDG",
        accessorKey: "eaqTask.eaqEvaluationPlan.code",
      },
      {
        header: "Chương trình đào tạo",
        accessorKey:
          "eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
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
        header: "Nhóm công tác chuyên trách",
        accessorKey: "eaqTask.eaqCouncilGroup.code",
      },
      { header: "Thành viên phụ trách", accessorKey: "user.fullName" },
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
        size: 240,
        accessorFn: (row) => {
          return (
            <CustomEnumBadge
              value={row.selfAssessmentTrackingStatus}
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
        size: 400,
      },
      {
        header: "Nhận xét chi tiết",
        accessorKey: "noteDetail",
        accessorFn: (row) => <SelfAssessmentForm04Evaluate data={row} />,
      },
    ],
    [refreshTrigger]
  );

  const handleUpdate = () => {
    selfAssessmentForm04List.refetch();

    queryClient.invalidateQueries({
      queryKey: ["selfAssessmentStatus"],
    });

    queryClient.refetchQueries({
      queryKey: ["selfAssessmentStatus"],
    });

    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <CustomFieldset title={`Danh sách tiêu chí`}>
      <CustomDataTableAPI
        query={selfAssessmentForm04List}
        columns={columns}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <SelfAssessmentForm04ViewOrUpdate
              data={row.original}
              editMode={false}
              onUpdate={handleUpdate}
            />
            <SelfAssessmentForm04ViewOrUpdate
              data={row.original}
              editMode={true}
              onUpdate={handleUpdate}
            />
          </CustomCenterFull>
        )}
        enableRowSelection={true}
        enableRowNumbers={true}
        enableRowActions={true}
      />
    </CustomFieldset>
  );
}
