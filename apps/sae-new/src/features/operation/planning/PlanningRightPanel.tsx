"use client";

import { PlanningActivateAcademicYearModal } from "@/features/operation/planning/PlanningActivateAcademicYearModal";
import PlanningCreateUpdateAcademicYear from "@/features/operation/planning/PlanningCreateUpdateAcademicYear";
import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import { CustomPanel } from "@/shared/components/CustomPanel";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { AcademicYear, AcademicYearStateEnum, AcademicYearStateLabel } from "@/shared/interfaces/AcademicYear";
import { Semester } from "@/shared/interfaces/Semester";
import { useCustomReactMutation } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactMutation";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { ActionIcon, Badge, Box, Flex, SimpleGrid, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCalendarDue,
    IconChevronLeft,
    IconChevronRight,
    IconClock,
    IconSchool
} from "@tabler/icons-react";

const stateColorMap: Record<AcademicYearStateEnum, string> = {
    [AcademicYearStateEnum.Draft]: "orange",
    [AcademicYearStateEnum.Active]: "teal",
    [AcademicYearStateEnum.Inactive]: "red",
    [AcademicYearStateEnum.Archived]: "gray",
};


interface PlanningRightPanelProps {
    academicYear: AcademicYear;
    onRefresh: () => void;
    onToggleLeft?: () => void;
    leftOpen?: boolean;
}

function formatDate(dateStr?: string) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
}

function SemesterCard({ semester, order }: { semester: Semester; order: number }) {
    return (
        <Box
            mb="md"
            style={{
                border: "1px solid var(--mantine-color-gray-3)",
                borderRadius: rem(8),
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <Flex
                px="md"
                py={rem(8)}
                justify="space-between"
                align="center"
                style={{
                    background: "var(--mantine-color-gray-0)",
                    borderBottom: "1px solid var(--mantine-color-gray-3)",
                }}
            >
                <Text fw={600} size="sm">
                    {semester.name ?? `Học kỳ ${order}`}
                </Text>
                <Text size="xs" c="dimmed">
                    {formatDate(semester.startDate)} → {formatDate(semester.endDate)}
                </Text>
            </Flex>

            {/* Body */}
            <Box px="md" py="sm">
                <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }} spacing="md" verticalSpacing="xs">
                    <Box>
                        <Text size="xs" c="dimmed" mb={2} style={{ textTransform: "uppercase" }}>Tự đánh giá (Từ)</Text>
                        <Text size="sm" fw={600}>{formatDate(semester.selfAssessmentOpen)}</Text>
                    </Box>
                    <Box>
                        <Text size="xs" c="dimmed" mb={2} style={{ textTransform: "uppercase" }}>Tự đánh giá (Đến)</Text>
                        <Text size="sm" fw={600}>{formatDate(semester.selfAssessmentClose)}</Text>
                    </Box>
                    <Box>
                        <Text size="xs" c="dimmed" mb={2} style={{ textTransform: "uppercase" }}>Duyệt cấp Lớp</Text>
                        <Text size="sm" fw={600}>{formatDate(semester.classApprovalOpen)}</Text>
                    </Box>
                    <Box>
                        <Text size="xs" c="dimmed" mb={2} style={{ textTransform: "uppercase" }}>Duyệt cấp Khoa</Text>
                        <Text size="sm" fw={600}>{formatDate(semester.facultyApprovalOpen)}</Text>
                    </Box>
                    <Box>
                        <Text size="xs" c="dimmed" mb={2} style={{ textTransform: "uppercase" }}>Duyệt cấp Trường</Text>
                        <Text size="sm" fw={600}>{formatDate(semester.universityApprovalOpen)}</Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    );
}

export function PlanningRightPanel({ academicYear, onRefresh, onToggleLeft, leftOpen }: PlanningRightPanelProps) {
    const semesters = [...(academicYear.semesters ?? [])].sort((a, b) => (a.order || 0) - (b.order || 0));
    const deleteDisc = useDisclosure();

    // ── Xóa năm học ────────────────────────────────────────────────
    const deleteMutation = useCustomReactMutation({
        mutationType: "delete",
        serviceFn: () =>
            academicYearService.delete({
                tenantId: MAIN_TENANT_ID,
                id: academicYear.id,
            }),
        onSuccess: () => {
            deleteDisc[1].close();
            onRefresh();
        },
    });

    // ── Quyền theo trạng thái (FRD) ─────────────────────────────────
    const state = academicYear.state;
    const canActivate = state === AcademicYearStateEnum.Draft;
    const canEdit = state === AcademicYearStateEnum.Draft;
    const canDelete = state === AcademicYearStateEnum.Draft;
    const editDisc = useDisclosure();

    return (
        <Box>
            {/* Header */}
            <Flex justify="space-between" align="flex-start" mb="md">
                <Flex gap="sm" align="center">
                    {onToggleLeft && (
                        <ActionIcon variant="subtle" size="md" onClick={onToggleLeft}>
                            {leftOpen ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
                        </ActionIcon>
                    )}
                    <Box>
                        <Flex align="center" gap="sm" mb={4}>
                            <Text fw={700} size="lg">{academicYear.name}</Text>
                            {academicYear.state && (
                                <Badge variant="light" color={stateColorMap[academicYear.state]}>
                                    {AcademicYearStateLabel[academicYear.state]}
                                </Badge>
                            )}
                        </Flex>
                        <Text size="sm" c="dimmed">{academicYear.code}</Text>
                    </Box>
                </Flex>

                <Flex gap="xs" align="center">
                    {/* Nút kích hoạt — chỉ Draft */}
                    {canActivate && (
                        <PlanningActivateAcademicYearModal
                            academicYear={academicYear}
                            onSuccess={onRefresh}
                        />
                    )}

                    {/* Nút chỉnh sửa — chỉ Draft */}
                    {canEdit && (
                        <PlanningCreateUpdateAcademicYear
                            values={academicYear}
                            onSuccess={onRefresh}
                        />
                    )}

                    {/* Nút xóa — chỉ Inactive */}
                    {canDelete && (
                        <CustomButtonModal
                            disclosure={deleteDisc}
                            isActionIcon={false}
                            buttonProps={{
                                actionType: "delete",
                                color: "red",
                                children: "Xóa",
                            }}
                            modalProps={{
                                title: "Xác nhận xóa năm học",
                                centered: true,
                            }}
                        >
                            <Text size="sm" mb="md">
                                Bạn có chắc chắn muốn xóa năm học{" "}
                                <Text span fw={600}>{academicYear.name}</Text> không?
                            </Text>
                            <Text size="xs" c="dimmed" mb="lg">
                                Hành động này không thể hoàn tác.
                            </Text>
                            <Flex justify="flex-end" gap="sm">
                                <CustomButton
                                    variant="outline"
                                    onClick={() => deleteDisc[1].close()}
                                >
                                    Hủy
                                </CustomButton>
                                <CustomButton
                                    actionType="delete"
                                    color="red"
                                    onClick={() => deleteMutation.mutate(undefined)}
                                    loading={deleteMutation.isPending}
                                >
                                    Xóa
                                </CustomButton>
                            </Flex>
                        </CustomButtonModal>
                    )}
                </Flex>
            </Flex>

            {/* Overview Cards */}
            <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mb="md">
                <CustomPanel
                    title="THỜI GIAN NĂM HỌC"
                    headerRight={<IconCalendarDue size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <SimpleGrid cols={2}>
                        <Box>
                            <Text size="xs" c="dimmed">Từ ngày</Text>
                            <Text size="sm" fw={500}>{formatDate(semesters[0]?.startDate)}</Text>
                        </Box>
                        <Box>
                            <Text size="xs" c="dimmed">Đến ngày</Text>
                            <Text size="sm" fw={500}>{formatDate(semesters[semesters.length - 1]?.endDate)}</Text>
                        </Box>
                    </SimpleGrid>
                </CustomPanel>

                <CustomPanel
                    title="KHUNG ĐIỂM ĐRL"
                    headerRight={<IconSchool size={16} color="var(--mantine-color-blue-6)" />}
                >
                    {academicYear.scoreFrameworkVersion ? (
                        <>
                            <Text size="sm" fw={500}>{academicYear.scoreFrameworkVersion.name}</Text>
                            <Text size="xs" c="dimmed">{academicYear.scoreFrameworkVersion.code}</Text>
                        </>
                    ) : (
                        <Text size="sm" c="dimmed">—</Text>
                    )}
                </CustomPanel>

                <CustomPanel
                    title="TRẠNG THÁI"
                    headerRight={<IconClock size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <Text size="sm" fw={500}>
                        {academicYear.state ? AcademicYearStateLabel[academicYear.state] : "—"}
                    </Text>
                </CustomPanel>
            </SimpleGrid>

            {/* Semester Configuration */}
            <Text fw={700} size="sm" mb="sm">
                CẤU HÌNH HỌC KỲ ({semesters.length})
            </Text>

            {semesters.map((semester, index) => (
                <SemesterCard key={semester.id ?? index} semester={semester} order={index + 1} />
            ))}

            {/* System Info */}
            {/* <CustomPanel title="THÔNG TIN HỆ THỐNG">
                <CustomPanelSection title="">
                    <CustomPanelRow label="Tạo lúc" value={formatDate()} />
                    <CustomPanelRow label="Cập nhật lúc" value={formatDate()} />
                </CustomPanelSection>
            </CustomPanel> */}
        </Box>
    );
}
