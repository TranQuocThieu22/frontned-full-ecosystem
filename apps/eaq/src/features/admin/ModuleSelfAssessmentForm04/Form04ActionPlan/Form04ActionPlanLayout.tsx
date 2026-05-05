"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { Accordion, Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { forwardRef, memo } from "react";
import Form04ActionPlanContent, { Form04ActionPlanContentRef, } from "./Form04ActionPlanContent";
import Form04ActionPlanRow from "./Form04ActionPlanRow";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { SectionHeader } from "@/features/admin/ModuleSelfAssessmentForm04/components/SectionHeader";
import { SECTION_CONTENT } from "@/features/admin/ModuleSelfAssessmentForm04/Constants/selfAssessmentTitle";
import ReportHistory from "@/features/admin/ModuleSelfAssessmentForm04/components/ReportHistory";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";

interface Form04ActionPlanLayoutProps {
  tabIndex: number;
  eaqTaskDetailId: number;
  status?: number;
  editMode?: boolean;
}

function Form04ActionPlanLayout(
  { tabIndex, status, eaqTaskDetailId, editMode }: Form04ActionPlanLayoutProps,
  ref: React.Ref<Form04ActionPlanContentRef>
) {
  const Q_SelfAssessment = useCustomReactQuery({
    queryKey: [
      "Q_SelfAssessment_Form04ActionPlanLayout",
      tabIndex,
      eaqTaskDetailId,
      SelfAssessmentTypeEnum.ActionPlan,
    ],
    axiosFn: async () => {
      const response =
        await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
          eaqPhaseId: tabIndex,
          selfAssessmentType: SelfAssessmentTypeEnum.ActionPlan,
          eaqTaskDetailId: eaqTaskDetailId,
        });
      return response;
    },
  });

  if (Q_SelfAssessment.isLoading) {
    return <Skeleton height={600} />;
  }

  return (
    <CustomFlexColumn gap={4}>
      <SectionHeader
        title={SECTION_CONTENT.ACTION_PLAN.title}
        description={SECTION_CONTENT.ACTION_PLAN.description}
      />
      {Q_SelfAssessment.isLoading ? (
        <Skeleton height={400} />
      ) : (
        <ReportHistory
          data={Q_SelfAssessment.data}
          renderItem={(item) => (
            <Form04ActionPlanRow data={item} />
          )}
        />
      )}
      <CustomFieldset title={`Nội dung báo cáo hiện tại`}>
        <Form04ActionPlanContent
          ref={ref}
          eaqSelfAssessmentId={Q_SelfAssessment.data?.[0]?.id ?? 0}
          initialActionPlan={Q_SelfAssessment.data?.[0]?.eaqActions ?? []}
          eaqPhaseId={tabIndex}
          eaqTaskDetailId={eaqTaskDetailId}
          editMode={editMode}
        // status={status}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}

export default memo(
  forwardRef<Form04ActionPlanContentRef, Form04ActionPlanLayoutProps>(
    Form04ActionPlanLayout
  )
);
