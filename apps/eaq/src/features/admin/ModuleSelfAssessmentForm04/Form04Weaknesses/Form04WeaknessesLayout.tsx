import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { Accordion, Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { memo } from "react";
import Form04WeaknessesRow from "./Form04WeaknessesRow";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { SectionHeader } from "@/features/admin/ModuleSelfAssessmentForm04/components/SectionHeader";
import { SECTION_CONTENT } from "@/features/admin/ModuleSelfAssessmentForm04/Constants/selfAssessmentTitle";
import ReportHistory from "@/features/admin/ModuleSelfAssessmentForm04/components/ReportHistory";

interface Form04WeaknessesLayoutProps {
  tabIndex: number;
  weaknesses: ISelfAssessment;
  setWeaknesses: (value: ISelfAssessment) => void;
  taskDetailId?: number;
  editMode?: boolean;
}

function Form04WeaknessesLayout({
  tabIndex,
  weaknesses,
  setWeaknesses,
  taskDetailId,
  editMode,
}: Form04WeaknessesLayoutProps) {
  const Q_SelfAssessment = useCustomReactQuery({
    queryKey: ["Q_SelfAssessment_Form04WeaknessesLayout", tabIndex, taskDetailId, SelfAssessmentTypeEnum.Weakness],
    axiosFn: async () => {
      const response =
        await service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
          eaqPhaseId: tabIndex,
          eaqTaskDetailId: taskDetailId,
          selfAssessmentType: SelfAssessmentTypeEnum.Weakness,
        });
      setWeaknesses(
        response.data.data[0] || {
          name: "Báo cáo tự đánh giá",
          selfAssessmentType: SelfAssessmentTypeEnum.Weakness,
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
      <Stack gap={2}>
        <SectionHeader
          title={SECTION_CONTENT.WEAKNESSES.title}
          description={SECTION_CONTENT.WEAKNESSES.description}
        />
      </Stack>
      {Q_SelfAssessment.isLoading ? (
        <Skeleton height={400} />
      ) : (
        <ReportHistory
          data={Q_SelfAssessment.data}
          renderItem={(item) => (
            <Form04WeaknessesRow data={item} />
          )}
        />
      )}
      <CustomFieldset title={`Nội dung báo cáo hiện tại`}>
        <CustomRichTextEditor
          value={weaknesses?.description ?? ""}
          onChange={(val: string) => {
            setWeaknesses({ ...weaknesses, description: val });
          }}
          readOnly={!editMode}
        />
      </CustomFieldset>
    </CustomFlexColumn>
  );
}

export default memo(Form04WeaknessesLayout);
