import { Stack, Text } from "@mantine/core";
import { memo } from "react";
import Form04CurrentSituationContent from "./Form04CurrentSituationContent";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";

interface Form04CurrentSituationLayoutProps {
  tabIndex: number;
  taskDetailId?: number;
}

function Form04CurrentSituationLayout({
  tabIndex,
  taskDetailId,
}: Form04CurrentSituationLayoutProps) {
  const SelfAssessmentQuery = useCustomReactQuery({
    queryKey: ["SelfAssessmentQuery_Content", tabIndex, 1],
    axiosFn: async () => {
      const response = await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
        eaqPhaseId: tabIndex,
        selfAssessmentType: 1,
        eaqTaskDetailId: taskDetailId,
      });
      return response;
    },
  });

  return (
    <CustomFlexColumn gap={4}>
      <Stack gap={2}>
        <Text size="md" fw={500}>
          1. Mô tả hiện trạng
        </Text>
        <Text mb="md" size="sm">
          (Căn cứ yêu cầu của tiêu chí, mô tả hoạt động của cơ sở đào tạo có CTĐT được đánh giá kèm
          theo các thông tin minh chứng để chứng minh mức độ đạt được của tiêu chí)
        </Text>
      </Stack>

      <Form04CurrentSituationContent
        value={SelfAssessmentQuery.data?.[0] ?? {}}
        taskDetailId={taskDetailId ?? 0}
        selfAssessmentId={SelfAssessmentQuery.data?.[0]?.id ?? 0}
      />
    </CustomFlexColumn>
  );
}

export default memo(Form04CurrentSituationLayout);
