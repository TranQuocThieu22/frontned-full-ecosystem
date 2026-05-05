"use client";

import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { useDisclosure } from "@mantine/hooks";
import { IconAnalyze, IconEye, IconFile } from "@tabler/icons-react";
import TaskDetailReadEvidenceTable from "./TaskDetailReadEvidenceTable";
import TaskDetailReadRequirementTable from "./TaskDetailReadRequirementTable";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
  taskDetailId: number;
  criteriaCode: string;
  standardCode: string;
}

export default function TaskDetailReadModal({
  taskDetailId,
  criteriaCode,
  standardCode,
}: Props) {
  const disc = useDisclosure(false);

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

  return (
    <CustomButtonModal
      isActionIcon={true}
      modalProps={{
        size: '100%',
        title: "Chi tiết phân công tiêu chí",

      }}
      actionIconProps={{
        actionType: "view",
      }}
      disclosure={disc}
    >
      <CustomTabs
        tabs={[
          {
            label: 'Phân tích tiêu chí',
            leftSection: < IconAnalyze />,
            children: <TaskDetailReadRequirementTable values={query.data} />

          },
          {
            label: 'Dự kiến minh chứng',
            leftSection: < IconFile />,
            children: <TaskDetailReadEvidenceTable
              values={query.data}
              criteriaCode={criteriaCode}
              standardCode={standardCode} />

          },
        ]} />

    </CustomButtonModal>
  );
}
