import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import Form04CurrentSituationContent, { Form04CurrentSituationContentRef, } from "./Form04CurrentSituationContent";
import Form04CurrentSituationRowHistory from "./Form04CurrentSituationRowHistory";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { SectionHeader } from "@/features/admin/ModuleSelfAssessmentForm04/components/SectionHeader";
import { SECTION_CONTENT } from "@/features/admin/ModuleSelfAssessmentForm04/Constants/selfAssessmentTitle";
import ReportHistory from "@/features/admin/ModuleSelfAssessmentForm04/components/ReportHistory";

interface Form04CurrentSituationLayoutProps {
  tabIndex: number;
  setCurrentSituation: (value: ISelfAssessment) => void;
  editMode?: boolean;
  taskDetailId?: number;
}

export type Form04CurrentSituationLayoutRef = {
  save: () => ISelfAssessment | undefined;
};

function Form04CurrentSituationLayout(
  {
    tabIndex,
    setCurrentSituation,
    editMode,
    taskDetailId,
  }: Form04CurrentSituationLayoutProps,
  ref: React.Ref<Form04CurrentSituationLayoutRef>
) {
  const contentRef = useRef<Form04CurrentSituationContentRef>(null);
  const selfAssessmentQuery = useCustomReactQuery({
    queryKey: ["Q_SelfAssessment_content", tabIndex, taskDetailId, 1],
    axiosFn: async () => {
      const response =
        await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
          eaqPhaseId: tabIndex,
          eaqTaskDetailId: taskDetailId,
          selfAssessmentType: SelfAssessmentTypeEnum.CurrentSituation,
        });
      setCurrentSituation(
        response?.data?.data[0] ?? {
          name: "Báo cáo tự đánh góa",
          selfAssessmentType: SelfAssessmentTypeEnum.CurrentSituation,
          eaqPhaseId: tabIndex,
          note: "",
          description: "",
        }
      );
      return response;
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      save: () => contentRef.current?.save(),
    }),
    []
  );

  return (
    <CustomFlexColumn gap={4}>
      <SectionHeader
        title={SECTION_CONTENT.CURRENT_SITUATION.title}
        description={SECTION_CONTENT.CURRENT_SITUATION.description}
      />

      {selfAssessmentQuery.isLoading ? (
        <Skeleton height={400} />
      ) : (
        <ReportHistory
          data={selfAssessmentQuery.data}
          renderItem={(item) => (
            <Form04CurrentSituationRowHistory data={item} />
          )} />
      )}

      <CustomFieldset title={`Nội dung báo cáo hiện tại`} mt={5}>
        <Form04CurrentSituationContent
          ref={contentRef}
          setCurrentSituation={setCurrentSituation}
          value={selfAssessmentQuery.data?.[0] ?? {}}
          selfAssessmentList={selfAssessmentQuery.data ?? []}
          editMode={editMode}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}

export default memo(forwardRef(Form04CurrentSituationLayout));
