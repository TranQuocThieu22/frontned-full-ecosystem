"use client";

import { Flex, Stack, Text } from "@mantine/core";
import { memo } from "react";
import ShareExternalAssessmentEvaluate from "../ShareExternalAssessmentEvaluate";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";

interface Form04SelfEvaluationLayoutProps {
  tabIndex: number;
  taskDetailId: number;
}

function Form04SelfEvaluationLayout({ tabIndex, taskDetailId }: Form04SelfEvaluationLayoutProps) {
  const SelfAssessmentQuery = useCustomReactQuery({
    queryKey: ["SelfAssessmentQuery_SelfEvaluation", tabIndex],
    axiosFn: async () => {
      const response = await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
        eaqPhaseId: tabIndex,
        selfAssessmentType: 5,
        eaqTaskDetailId: taskDetailId,
      });
      return response;
    },
  });

  return (
    <CustomFlexColumn gap={4} style={{ minHeight: "600px" }}>
      <Stack gap={2}>
        <Text size="md" fw={500}>
          5. Tự đánh giá
        </Text>
        <Text mb="md" size="sm">
          (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu chí và các khuyến
          nghị cải tiến cần thiết)
        </Text>
      </Stack>

      <Flex direction="column" gap="md">
        <CustomFieldset title="Nội dung báo cáo hiện tại">
          <Text fw={500}>Tự đánh giá</Text>
          <Flex gap={10}>
            <CustomCheckbox label="Đạt" checked={SelfAssessmentQuery.data?.[0]?.status == 1} readOnly />
            <CustomCheckbox
              label="Không đạt"
              checked={SelfAssessmentQuery.data?.[0]?.status == 2}
              readOnly
            />
          </Flex>
        </CustomFieldset>
        <ShareExternalAssessmentEvaluate
          taskDetailId={taskDetailId ?? 0}
          selfAssessmentType={5}
          eaqSelfAssessmentId={SelfAssessmentQuery.data?.[0]?.id ?? 0}
          enableCreateButton
          isUpdate
        />
      </Flex>
    </CustomFlexColumn>
  );
}

export default memo(Form04SelfEvaluationLayout);
