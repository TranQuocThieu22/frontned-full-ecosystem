import { Box, Flex, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight, IconMessage2 } from "@tabler/icons-react";
import { useState } from "react";
import Form04ActionPlanLayout from "./Form04ActionPlan/Form04ActionPlanLayout";
import Form04CurrentSituationLayout from "./Form04CurrentSituation/Form04CurrentSituationLayout";
import Form04StrengthsLayout from "./Form04Strengths/Form04StrengthsLayout";
import Form04WeaknessesLayout from "./Form04Weaknesses/Form04WeaknessesLayout";
import { useCustomScrollSpy } from "./useCustomScrollSpy";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import Form04SelfEvaluationLayout from "./Form04SelfEvaluation/Form04SelfEvaluationLayout";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface ExternalAssessmentViewOrUpdateProps {
  data: ITaskDetail;
}

export default function ExternalAssessmentViewOrUpdate({
  data,
}: ExternalAssessmentViewOrUpdateProps) {
  const disclosure = useDisclosure();
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const scrollRef = (element: HTMLDivElement | null) => {
    if (element) {
      setScrollContainer(element);
    }
  };

  const { activeId } = useCustomScrollSpy({
    root: scrollContainer,
    selector: "[id]",
    offset: 21,
  });

  const renderView = () => {
    return (
      <Stack gap={0}>
        <Flex style={{ minHeight: "75vh", position: "relative" }} mb="md">
          <Box
            style={{
              width: isCollapsed ? 40 : 240,
              transition: "width 0.3s ease",
              position: "sticky",
              top: 50,
              height: "100%",
              zIndex: 2,
            }}
          >
            <Box
              onClick={() => setIsCollapsed((prev) => !prev)}
              style={{
                cursor: "pointer",
                padding: "6px 10px",
                textAlign: "right",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {isCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
            </Box>

            {[
              { id: "section-1", label: "1. Mô tả hiện trạng" },
              { id: "section-2", label: "2. Điểm mạnh" },
              { id: "section-3", label: "3. Điểm tồn tại" },
              { id: "section-4", label: "4. Kế hoạch hành động" },
              { id: "section-5", label: "5. Tự đánh giá" },
            ].map((item) => {
              const [prefix, ...rest] = item.label.split(".");
              return (
                <Box
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "6px 10px",
                    transition: "all 0.3s ease",
                    borderLeft:
                      activeId === item.id ? "4px solid var(--mantine-color-blue-4)" : "none",
                    backgroundColor:
                      activeId === item.id ? "var(--mantine-color-blue-1)" : "transparent",
                    color:
                      activeId === item.id
                        ? "var(--mantine-color-blue-8)"
                        : "var(--mantine-color-default-color)",
                    fontSize: 14,
                    whiteSpace: "nowrap",
                  }}
                  mt={2}
                  onClick={() => {
                    const element = document.getElementById(item.id);
                    if (element && scrollContainer) {
                      const containerRect = scrollContainer.getBoundingClientRect();
                      const elementRect = element.getBoundingClientRect();
                      const currentScrollTop = scrollContainer.scrollTop;
                      const relativeTop = elementRect.top - containerRect.top + currentScrollTop;

                      scrollContainer.scrollTo({
                        top: relativeTop - 30,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{isCollapsed ? prefix : `${prefix}.`}</span>
                  {!isCollapsed && <span style={{ marginLeft: 6 }}>{rest.join(".").trim()}</span>}
                </Box>
              );
            })}
          </Box>
          <Box
            ref={scrollRef}
            style={{
              maxHeight: "75vh",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: 20,
              width: "100%",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              position: "relative",
            }}
          >
            <Box id="section-1" style={{ paddingBottom: 40, minHeight: 200 }}>
              <Form04CurrentSituationLayout
                taskDetailId={data.id ?? 0}
                tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
              />
            </Box>
            <Box id="section-2" style={{ paddingBottom: 40, minHeight: 200 }}>
              <Form04StrengthsLayout
                taskDetailId={data.id ?? 0}
                tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
              />
            </Box>
            <Box id="section-3" style={{ paddingBottom: 40, minHeight: 200 }}>
              <Form04WeaknessesLayout
                taskDetailId={data.id ?? 0}
                tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
              />
            </Box>
            <Box id="section-4" style={{ paddingBottom: 40, minHeight: 200 }}>
              <Form04ActionPlanLayout
                eaqTaskDetailId={data.id ?? 0}
                tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
              />
            </Box>
            <Box id="section-5" style={{ paddingBottom: 40, minHeight: 200 }}>
              <Form04SelfEvaluationLayout
                taskDetailId={data.id ?? 0}
                tabIndex={data.eaqTask?.eaqEvaluationPlan?.eaqPhaseId ?? 1}
              />
            </Box>
          </Box>
        </Flex>
        <CustomButton
          type="submit"
          actionType="save"
          onClick={() => {
            disclosure[1].close();
          }}
        >
          Nhận xét xong
        </CustomButton>
      </Stack>
    );
  };

  return (
    <CustomButtonModal
      modalProps={{
        size: "100%",
        title: "Chi tiết phiếu đánh giá",
      }}
      actionIconProps={{
        children: <IconMessage2 stroke={2} />,
        color: "blue",
        toolTipProps: { label: "Xem chi tiết" },
      }}
      disclosure={disclosure}
      isActionIcon
    >
      {renderView()}
    </CustomButtonModal>
  );
}
