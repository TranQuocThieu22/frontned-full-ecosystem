import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { memo } from "react";
import Form04StrengthsRow from "./Form04StrengthsRow";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { SectionHeader } from "@/features/admin/ModuleSelfAssessmentForm04/components/SectionHeader";
import { SECTION_CONTENT } from "@/features/admin/ModuleSelfAssessmentForm04/Constants/selfAssessmentTitle";
import ReportHistory from "@/features/admin/ModuleSelfAssessmentForm04/components/ReportHistory";

interface Form04StrengthsLayoutProps {
  tabIndex: number;
  setStrengths: (value: ISelfAssessment) => void;
  strengths: ISelfAssessment;
  taskDetailId?: number;
  editMode?: boolean;
}

function Form04StrengthsLayout({
  tabIndex,
  setStrengths,
  strengths,
  taskDetailId,
  editMode,
}: Form04StrengthsLayoutProps) {
  const Q_SelfAssessment = useCustomReactQuery({
    queryKey: [
      "Q_SelfAssessment_Form04StrengthsLayout",
      tabIndex,
      taskDetailId,
      SelfAssessmentTypeEnum.Strength,
    ],
    axiosFn: async () => {
      const response =
        await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
          eaqPhaseId: tabIndex,
          eaqTaskDetailId: taskDetailId,
          selfAssessmentType: SelfAssessmentTypeEnum.Strength,
        });
      setStrengths(
        response.data.data[0] || {
          name: "Báo cáo tự đánh giá",
          selfAssessmentType: SelfAssessmentTypeEnum.Strength,
          status: 2,
          eaqEvidenceIds: [],
          eaqPhaseId: tabIndex,
          note: "",
          description: "",
        }
      );
      return response;
    },
  });

  if (Q_SelfAssessment.isLoading) {
    return <Skeleton height={600} />;
  }

  return (
    <CustomFlexColumn gap={4}>
      <SectionHeader
        title={SECTION_CONTENT.STRENGTHS.title}
        description={SECTION_CONTENT.STRENGTHS.description}
      />
      {Q_SelfAssessment.isLoading ? (
        <Skeleton height={400} />
      ) : (
        <ReportHistory data={Q_SelfAssessment.data}
          renderItem={(item) => (
            <Form04StrengthsRow data={item} />
          )}
        />
      )}
      <CustomFieldset title={`Nội dung báo cáo hiện tại`}>
        <CustomRichTextEditor
          value={strengths?.description ?? ""}
          onChange={(val: string) => {
            setStrengths({ ...strengths, description: val });
          }}
          readOnly={!editMode}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}

export default memo(Form04StrengthsLayout);
