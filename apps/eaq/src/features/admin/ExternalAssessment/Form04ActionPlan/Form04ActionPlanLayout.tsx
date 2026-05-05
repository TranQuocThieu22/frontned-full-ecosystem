"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { Grid, Stack, Text } from "@mantine/core";
import { memo } from "react";
import Form04ActionPlanContent from "./Form04ActionPlanContent";
import ShareExternalAssessmentEvaluate from "../ShareExternalAssessmentEvaluate";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Form04ActionPlanLayoutProps {
  tabIndex: number;
  eaqTaskDetailId: number;
}

function Form04ActionPlanLayout({ tabIndex, eaqTaskDetailId }: Form04ActionPlanLayoutProps) {
  const Q_SelfAssessment = useCustomReactQuery({
    queryKey: ["Q_SelfAssessment_Form04ActionPlanLayout", tabIndex],
    axiosFn: async () => {
      const response = await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
        eaqPhaseId: tabIndex,
        selfAssessmentType: 4,
        eaqTaskDetailId: eaqTaskDetailId,
      });
      return response;
    },
  });
  return (
    <CustomFlexColumn gap={4}>
      <Stack gap={2}>
        <Text size="md" fw={500}>
          4. Kế hoạch hành động
        </Text>
        <Text mb="md" size="sm">
          (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu chí và các khuyến
          nghị cải tiến cần thiết)
        </Text>
      </Stack>

      <Grid columns={12}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <CustomFieldset title="Nội dung báo cáo hiện tại">
            <Form04ActionPlanContent
              actionPlan={Q_SelfAssessment.data?.[0]?.eaqActions ?? []}
              eaqSelfAssessmentId={Q_SelfAssessment.data?.[0]?.id}
              taskDetailId={eaqTaskDetailId}
            />
          </CustomFieldset>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ShareExternalAssessmentEvaluate
            taskDetailId={eaqTaskDetailId ?? 0}
            selfAssessmentType={4}
          />
        </Grid.Col>
      </Grid>
    </CustomFlexColumn>
  );
}

export default memo(Form04ActionPlanLayout);
