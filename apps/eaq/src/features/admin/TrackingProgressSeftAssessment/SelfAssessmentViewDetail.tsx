import { ActionIcon, Box, Group, Modal, Stack, TableOfContents, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useIsFetching } from "@tanstack/react-query";
import { useRef, useState } from "react";
import ActionPlanLayout from "./ActionPlan/ActionPlanLayout";
import CurrentSituationLayout from "./CurrentSolution/CurrentSituationLayout";
import SelfEvaluationLayout from "./SelfEvaluation/SelfEvaluationLayout";
import StrengthsLayout from "./Strengths/StrengthsLayout";
import WeaknessesLayout from "./Weaknesses/WeaknessesLayout";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface Props {
    phaseId?: number
    taskDetailId?: number
    trainingProgramId?: number;
}

export default function SelfAssessmentViewDetail({ trainingProgramId, phaseId, taskDetailId }: Props) {
    const disclosure = useDisclosure();
    const [fullscreen, setFullScreen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useIsFetching({ queryKey: ["SelfAssessment_Detail_Type_CurrentSituation"] }) // Tác dụng rerender để observer của thằng TableOfContents nó bắt được scroll, render lần đầu nó không bắt được scrollHost

    return (
        <CustomButtonModal
            modalProps={{
                size: "100%",
                withCloseButton: false,
                closeButtonProps: {
                    color: "var(--mantine-color-text)"
                },
                fullScreen: fullscreen
            }}
            buttonProps={{
                actionType: "view",
                variant: "light"
            }}
            disclosure={disclosure}
        >
            <Modal.Header mih={25} p={0}>
                <Group justify="space-between" align="center" w="100%">
                    <Text fw={500}>Chi tiết phiếu tự đánh giá</Text>
                    <Group>
                        <ActionIcon
                            size="sm"
                            c="var(--mantine-color-text)"
                            variant="transparent"
                            onClick={() => { setFullScreen(!fullscreen) }}
                        >
                            {fullscreen ? <IconMinimize /> : <IconMaximize />}
                        </ActionIcon>
                        <Modal.CloseButton />
                    </Group>
                </Group>
            </Modal.Header>

            <Modal.Body pl={0}>
                <Group wrap="nowrap" align="start">
                    <Stack
                        gap={0}
                        style={{
                            width: isCollapsed ? 23 : 250,
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
                                padding: "6px 0px",
                                textAlign: "right",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            {isCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
                        </Box>
                        <TableOfContents
                            minDepthToOffset={0}
                            depthOffset={40}
                            size="sm"
                            radius={0}
                            variant="light"
                            scrollSpyOptions={{
                                selector: '#mdx [data-assessment]',
                                scrollHost: containerRef.current ?? undefined,
                            }}
                            getControlProps={({ data, active }) => ({
                                onClick: () => data.getNode().scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }),
                                children: isCollapsed ? data.value?.split(". ")?.[0] : data.value,
                                pl: 5,
                                style: {
                                    borderLeft: active && !isCollapsed ? '3px solid var(--mantine-color-blue-6)' : '3px solid transparent',
                                }
                            })}
                        />
                    </Stack>
                    <Box
                        id="mdx"
                        ref={containerRef}
                        style={{
                            maxHeight: fullscreen ? "85vh" : "75vh",
                            overflowY: "auto",
                            paddingX: 20,
                            width: "100%"
                        }}
                    >
                        <CurrentSituationLayout
                            trainingProgramId={trainingProgramId}
                            taskDetailId={taskDetailId}
                            phaseId={phaseId}
                        />
                        <StrengthsLayout
                            trainingProgramId={trainingProgramId}
                            phaseId={phaseId}
                            taskDetailId={taskDetailId}
                        />
                        <WeaknessesLayout
                            trainingProgramId={trainingProgramId}
                            phaseId={phaseId}
                            taskDetailId={taskDetailId}
                        />
                        <ActionPlanLayout
                            trainingProgramId={trainingProgramId}
                            phaseId={phaseId}
                            taskDetailId={taskDetailId}
                        />
                        <SelfEvaluationLayout
                            trainingProgramId={trainingProgramId}
                            phaseId={phaseId}
                            taskDetailId={taskDetailId}
                        />
                    </Box>

                </Group>

            </Modal.Body>
        </CustomButtonModal>
    );
}
