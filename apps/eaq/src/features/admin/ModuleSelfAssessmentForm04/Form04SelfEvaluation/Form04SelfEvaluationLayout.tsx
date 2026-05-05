"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Box, Flex, Group, Skeleton, Stack, Text, } from "@mantine/core";
import { memo, useEffect } from "react";
import Form04ActionPlanRow from "./Form04SelfEvaluationRow";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

interface Form04SelfEvaluationLayoutProps {
  tabIndex: number;
  evaluation?: ISelfAssessment;
  setEvaluation: (value: ISelfAssessment) => void;
  taskDetailId?: number;
  editMode?: boolean;
}

function Form04SelfEvaluationLayout({
  tabIndex,
  evaluation,
  setEvaluation,
  taskDetailId,
  editMode,
}: Form04SelfEvaluationLayoutProps) {
  const Q_SelfAssessment = useCustomReactQuery({
    queryKey: [
      "Q_SelfAssessment_Form04SelfEvaluation",
      tabIndex,
      taskDetailId,
      SelfAssessmentTypeEnum.SelfEvaluation,
    ],
    axiosFn: async () => {
      const response =
        await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
          eaqPhaseId: tabIndex,
          eaqTaskDetailId: taskDetailId,
          selfAssessmentType: SelfAssessmentTypeEnum.SelfEvaluation,
        });
      setEvaluation(response.data.data[0]!);
      return response;
    },
  });

  useEffect(() => {
    if (Q_SelfAssessment.data?.[0]?.status == 1) {
      setEvaluation({ ...evaluation, status: 1 });
    } else if (Q_SelfAssessment.data?.[0]?.status == 2) {
      setEvaluation({ ...evaluation, status: 2 });
    }
  }, [Q_SelfAssessment.data]);

  if (Q_SelfAssessment.isLoading) {
    return <Skeleton height={600} />;
  }

  return (
    <CustomFlexColumn gap={4} style={{ minHeight: "600px" }}>
      <Stack gap={2}>
        <Text size="md" fw={500}>
          5. Tự đánh giá
        </Text>
        <Text mb="md" size="sm">
          (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu
          chí và các khuyến nghị cải tiến cần thiết)
        </Text>
      </Stack>
      {Q_SelfAssessment.isLoading ? (
        <Skeleton height={400} />
      ) : (
        <Accordion className="border">
          <Accordion.Item value="3">
            <Accordion.Control>
              <Group
                className={`ml-1 border-l-4 border-l-[var(--mantine-color-blue-4)] px-2 w-fit bg-[var(--mantine-color-blue-1)]`}
              >
                <Text fw={600} color="var(--mantine-color-blue-9)">
                  Lịch sử báo cáo
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Box
                h={"452px"}
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                <Accordion
                  style={{ overflow: "auto" }}
                  variant="contained"
                  defaultValue="1"
                >
                  {Q_SelfAssessment.data?.map((item) => (
                    <Form04ActionPlanRow
                      key={item.id?.toString() ?? "1"}
                      data={item}
                    />
                  ))}
                </Accordion>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
      <CustomFieldset title={`Nội dung báo cáo hiện tại`}>
        <Box>
          <Text fw={500}>Tự đánh giá</Text>
          <Flex gap={10}>
            <CustomCheckbox
              label="Đạt"
              checked={evaluation?.status == 1}
              onChange={() => setEvaluation({ ...evaluation, status: 1 })}
              disabled={!editMode}
            />
            <CustomCheckbox
              label="Không đạt"
              checked={evaluation?.status == 2}
              onChange={() => setEvaluation({ ...evaluation, status: 2 })}
              disabled={!editMode}
            />
          </Flex>
        </Box>
      </CustomFieldset>
    </CustomFlexColumn>
  );
}

export default memo(Form04SelfEvaluationLayout);
