"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { Group, Text } from "@mantine/core";
import { memo } from "react";
import { SECTION_CONTENT } from "../Constants/selfAssessmentTitle";
import LoadingSkeleton from "../../TrackingProgressSeftAssessment/ComponentShared/LoadingSkeleton";
import SelfAccessmentCommentTable from "./Comment/CommentTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";

interface Props {
  phaseId?: number;
  taskDetailId?: number;
}

function SelfEvaluationLayout({ phaseId, taskDetailId }: Props) {
  const Q_SelfAssessment = useCustomReactQuery({
    queryKey: ["Self_Assessment_Type5_List", phaseId, taskDetailId],
    axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
      eaqPhaseId: phaseId,
      eaqTaskDetailId: taskDetailId,
      selfAssessmentType: SelfAssessmentTypeEnum.SelfEvaluation,
    })
  });

  return (
    <>
      <Text mt="md" fw={500} data-assessment>
        {SECTION_CONTENT.SELF_EVALUATION.title}
      </Text>
      <Text mb="xs" size="sm">
        {SECTION_CONTENT.SELF_EVALUATION.description}
      </Text>
      <CustomFieldset mt="xs" title="Nội dung báo cáo hiện tại">
        {Q_SelfAssessment.isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Group gap={10}>
            <Text fw={500}>Tự đánh giá</Text>
            <CustomCheckbox
              ml="sm"
              label="Đạt"
              checked={Q_SelfAssessment.data?.[0]?.status === 1}
              readOnly
            />
            <CustomCheckbox
              ml="xl"
              label="Không đạt"
              checked={Q_SelfAssessment.data?.[0]?.status === 2}
              readOnly
            />
          </Group>
        )}
      </CustomFieldset>
      <CustomFieldset mt={10} title="Danh sách nhận xét">
        <SelfAccessmentCommentTable
          openQuery={true}
          eaqSelfAssessmentId={Q_SelfAssessment.data?.[0]?.id}
          eaqSelfAssessmentType={5}
        />
      </CustomFieldset>
    </>
  );
}

export default memo(SelfEvaluationLayout);
