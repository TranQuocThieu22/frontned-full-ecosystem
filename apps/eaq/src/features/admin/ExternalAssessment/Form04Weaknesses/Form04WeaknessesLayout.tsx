import { Grid, Stack, Text } from "@mantine/core";
import { memo } from "react";
import CutomTypography from "../CustomTypography";
import ShareExternalAssessmentEvaluate from "../ShareExternalAssessmentEvaluate";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Form04WeaknessesLayoutProps {
  tabIndex: number;
  taskDetailId?: number;
}

function Form04WeaknessesLayout({ tabIndex, taskDetailId }: Form04WeaknessesLayoutProps) {
  const SelfAssessmentQuery = useCustomReactQuery({
    queryKey: ["SelfAssessmentQuery_Form04WeaknessesLayout", tabIndex],
    axiosFn: async () => {
      const response = await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
        eaqPhaseId: tabIndex,
        selfAssessmentType: 3,
        eaqTaskDetailId: taskDetailId,
      });
      return response;
    },
  });
  return (
    <CustomFlexColumn gap={4}>
      <Stack gap={2}>
        <Text size="md" fw={500}>
          3. Điểm tồn tại và khuyến nghị
        </Text>
        <Text mb="md" size="sm">
          (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu chí và các khuyến
          nghị cải tiến cần thiết)
        </Text>
      </Stack>

      <Grid columns={12}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <CustomFieldset title={`Nội dung báo cáo hiện tại`}>
            <CutomTypography
              h="40vh"
              htmlContent={SelfAssessmentQuery.data?.[0]?.description ?? ""}
              selfAssessmentId={SelfAssessmentQuery.data?.[0]?.id ?? 0}
              selfAssessmentType={3}
            />
          </CustomFieldset>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ShareExternalAssessmentEvaluate
            taskDetailId={taskDetailId ?? 0}
            selfAssessmentType={3}
          />
        </Grid.Col>
      </Grid>
    </CustomFlexColumn>
  );
}

export default memo(Form04WeaknessesLayout);
