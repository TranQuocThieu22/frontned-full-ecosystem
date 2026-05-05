"use client";

import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAnalyze, IconFile } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { EnumCriteriaAssignmentStatus } from "../CriteriaAssignmentStatusBadge";
import { getStatusOptions as taskStatusOptions } from "../CriteriaAssignmentTable03";
import { cleanTDRequirementsAndEvidences } from "./shared/CleanTDRequirements";
import TaskDetailUpdateEvidenceTable from "./TaskDetailUpdateEvidenceTable";
import TaskDetailUpdateRequirementTable from "./TaskDetailUpdateRequirementTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { enum_verificationStatus } from "@/features/admin/ModuleCheckCriteriaAnalysis/CheckCriteriaAnalysisRead";

interface Props {
  taskDetailId: number;
  criteriaCode: string;
  standardCode: string;
  analysisTrackingStatus: number
}

export default function TaskDetailUpdateModal({
  taskDetailId,
  criteriaCode,
  standardCode,
  analysisTrackingStatus
}: Props) {
  const [chosenTaskStatus, setChosenTaskStatus] = useState(
    EnumCriteriaAssignmentStatus.NotStarted
  );

  const disc = useDisclosure(false);
  const [isResetSelectAllowed, setResetSelectAllowed] = useState(true);


  const query = useCustomReactQuery({
    queryKey: ["CriteriaAssignmentUpdateTable", taskDetailId],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetTaskDetailById({
        taskDetailId: taskDetailId,
      }),
    options: {
      enabled: disc[0] && !!taskDetailId,
    },
  });

  useEffect(() => {
    if (!query.data) return;

    if (query.data.analysisStatus && isResetSelectAllowed) {
      setChosenTaskStatus(query.data.analysisStatus);
    }

  }, [query.data]);

  const updateMutation = useCustomReactMutation({
    axiosFn: (values: ITaskDetail) =>
      service_EAQEvaluationPlan.UpdateTaskDetailAnalysisStatus(values),
    mutationType: "update",
  });

  const handleSaveStatus = async (analysisStatus: number) => {
    if (!query.data) return;

    setResetSelectAllowed(true);
    const newTaskDetail: ITaskDetail = {
      ...query.data,
      eaqTaskDetailRequirements: undefined, // Prevent add new requirement wwhen their id = 0
      analysisStatus: analysisStatus,
    };

    const updatedTaskDetail = cleanTDRequirementsAndEvidences(newTaskDetail);

    updateMutation.mutate(updatedTaskDetail);
  };

  return (
    <CustomButtonModal
      isActionIcon
      modalProps={{
        size: "100%",
        title: "Chi tiết phân công tiêu chí"
      }}
      disclosure={disc}
      actionIconProps={{
        disabled: analysisTrackingStatus == enum_verificationStatus.MeetsStandard ? true : false,
        actionType: "update"
      }}
    >
      <Grid ml={8} align="flex-end">
        <CustomSelect
          label="Trạng thái phân tích"
          data={taskStatusOptions}
          w={250}
          isLoading={query.isFetching}
          value={chosenTaskStatus.toString()}
          onChange={(value) => {
            setResetSelectAllowed(false);
            setChosenTaskStatus(Number(value))
          }}
        />
        <CustomButton
          ml={20}
          w={"150px"}
          color="green"
          actionType="save"
          onClick={() => handleSaveStatus(chosenTaskStatus)}
        >
          Lưu
        </CustomButton>
      </Grid>
      <CustomTabs
        tabs={[
          {
            label: 'Phân tích tiêu chí',
            leftSection: < IconAnalyze />,
            children: <TaskDetailUpdateRequirementTable values={query.data} />
          },
          {
            label: 'Dự kiến minh chứng',
            leftSection: < IconFile />,
            children: <TaskDetailUpdateEvidenceTable
              values={query.data}
              criteriaCode={criteriaCode}
              standardCode={standardCode} />
          },
        ]} />
    </CustomButtonModal >
  );
}
