import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Box, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRef, useState } from "react";
import { Form04ActionPlanContentRef } from "./Form04ActionPlan/Form04ActionPlanContent";
import Form04ActionPlanLayout from "./Form04ActionPlan/Form04ActionPlanLayout";
import Form04CurrentSituationLayout, {
  Form04CurrentSituationLayoutRef,
} from "./Form04CurrentSituation/Form04CurrentSituationLayout";
import Form04SelfEvaluationLayout from "./Form04SelfEvaluation/Form04SelfEvaluationLayout";
import Form04StrengthsLayout from "./Form04Strengths/Form04StrengthsLayout";
import Form04WeaknessesLayout from "./Form04Weaknesses/Form04WeaknessesLayout";
import { useCustomScrollSpy } from "./useCustomScrollSpy";
import { NAVIGATION_ITEMS, SELF_ASSESSMENT_TYPES } from "@/features/admin/ModuleSelfAssessmentForm04/Constants/selfAssessment";
import { useSelfAssessmentSubmit } from "@/features/admin/ModuleSelfAssessmentForm04/Hooks/useSelfAssessmentSubmit";
import { SelfAssessmentNavigation } from "@/features/admin/ModuleSelfAssessmentForm04/components/SelfAssessmentNavigation";

interface SelfAssessmentForm04ViewOrUpdateProps {
  data: ITaskDetail;
  editMode?: boolean;
  onUpdate?: () => void;
}

export default function SelfAssessmentForm04ViewOrUpdate({
  data,
  editMode,
  onUpdate,
}: SelfAssessmentForm04ViewOrUpdateProps) {
  const disclosure = useDisclosure();
  const form = useForm({
    initialValues: {},
  });
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null
  );

  const scrollRef = (element: HTMLDivElement | null) => {
    if (element) {
      setScrollContainer(element);
    }
  };

  const { activeId } = useCustomScrollSpy({
    root: scrollContainer,
    selector: "[id]",
    offset: 20,
  });

  const [, setCurrentSituation] = useState<ISelfAssessment>();
  const [strengths, setStrengths] = useState<ISelfAssessment>();
  const [weaknesses, setWeaknesses] = useState<ISelfAssessment>();
  const [evaluation, setEvaluation] = useState<ISelfAssessment>();

  const actionPlanRef = useRef<Form04ActionPlanContentRef>(null);
  const currentSituationRef = useRef<Form04CurrentSituationLayoutRef>(null);

  const mutationUpdateSelfAssessment = useSelfAssessmentSubmit(data, onUpdate, disclosure[1].close);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const currentScrollTop = scrollContainer.scrollTop;
      const relativeTop =
        elementRect.top - containerRect.top + currentScrollTop;

      scrollContainer.scrollTo({
        top: relativeTop - 30,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      // Ensure current-situation evidence labels are saved back into description first
      const savedCurrent = currentSituationRef.current?.save();

      if (!savedCurrent) {
        notifications.show({
          color: "red",
          message: "Không thể lưu mô tả hiện trạng. Vui lòng kiểm tra dữ liệu.",
        });
        return;
      }

      const assessmentConfigs = [
        { data: savedCurrent, type: SELF_ASSESSMENT_TYPES.CURRENT_SITUATION },
        { data: strengths, type: SELF_ASSESSMENT_TYPES.STRENGTHS },
        { data: weaknesses, type: SELF_ASSESSMENT_TYPES.WEAKNESSES },
        { data: evaluation, type: SELF_ASSESSMENT_TYPES.EVALUATION },
      ];
      const assessments: ISelfAssessment[] = assessmentConfigs
        .filter((config) => config.data)
        .map((config) => ({
          ...config.data!,
          status: evaluation?.status, // Shared status across all types
          selfAssessmentType: config.type,
        }));

      if (assessments.length > 0) {
        mutationUpdateSelfAssessment.mutate(assessments);
      }
      // 4
      // NOTE: Gửi ref submit xuống Form04ActionPlanContent
      await actionPlanRef.current?.submit();

      onUpdate?.();
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Cập nhật thất bại",
      });
    }
  };

  const renderView = () => {
    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid style={{ minHeight: "75vh", position: "relative" }}>
          <Grid.Col
            span={{ base: 4, md: 2 }}
            style={{
              position: "sticky",
              top: 50,
              height: "100%",
              overflowY: "auto",
            }}
          >
            <SelfAssessmentNavigation
              activeId={activeId}
              onNavigate={handleNavigate}
              items={NAVIGATION_ITEMS}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 8, md: 10 }}>
            <Box
              ref={scrollRef}
              style={{
                maxHeight: "75vh",
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: 20,
              }}
            >
              <Box id="section-1" style={{ paddingBottom: 40, minHeight: 200 }}>
                <Form04CurrentSituationLayout
                  ref={currentSituationRef}
                  editMode={editMode}
                  taskDetailId={data.id ?? 0}
                  tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
                  setCurrentSituation={setCurrentSituation}
                />
              </Box>
              <Box id="section-2" style={{ paddingBottom: 40, minHeight: 200 }}>
                <Form04StrengthsLayout
                  taskDetailId={data.id ?? 0}
                  tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
                  strengths={strengths ?? {}}
                  setStrengths={setStrengths}
                  editMode={editMode}
                />
              </Box>
              <Box id="section-3" style={{ paddingBottom: 40, minHeight: 200 }}>
                <Form04WeaknessesLayout
                  taskDetailId={data.id ?? 0}
                  tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
                  weaknesses={weaknesses ?? {}}
                  setWeaknesses={setWeaknesses}
                  editMode={editMode}
                />
              </Box>
              <Box id="section-4" style={{ paddingBottom: 40, minHeight: 200 }}>
                <Form04ActionPlanLayout
                  ref={actionPlanRef}
                  eaqTaskDetailId={data.id ?? 0}
                  tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
                  status={evaluation?.status}
                  editMode={editMode}
                />
              </Box>
              <Box id="section-5" style={{ paddingBottom: 40, minHeight: 200 }}>
                <Form04SelfEvaluationLayout
                  taskDetailId={data.id ?? 0}
                  tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
                  evaluation={evaluation}
                  setEvaluation={setEvaluation}
                  editMode={editMode}
                />
              </Box>
            </Box>
          </Grid.Col>
          {editMode && (
            <CustomButton
              type="submit"
              fullWidth
              actionType="save"
              loading={mutationUpdateSelfAssessment.isPending}
            />
          )}
        </Grid>
      </form>
    );
  };

  return (
    <CustomButtonModal
      isActionIcon
      actionIconProps={{
        actionType: !editMode ? "view" : "update",
        toolTipProps: { label: !editMode ? "Xem" : "Cập nhật" },
        loading: mutationUpdateSelfAssessment.isPending,
      }}
      modalProps={{
        title: "Chi tiết phiếu tự đánh giá",
        size: "100%",
      }}
      disclosure={disclosure}
    >
      {renderView()}
    </CustomButtonModal>
  );
}


