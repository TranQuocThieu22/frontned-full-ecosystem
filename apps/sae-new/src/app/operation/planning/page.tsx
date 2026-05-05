"use client";

import { PlanningLeftPanel } from "@/features/operation/planning/PlanningLeftPanel";
import { PlanningRightPanel } from "@/features/operation/planning/PlanningRightPanel";
import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { ActionIcon, Box, Divider, Drawer, Flex, Skeleton, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";


export default function Page() {
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState<string | undefined>();

    // Lấy danh sách năm học
    const { data: academicYears = [] } = useCustomReactQuery({
        queryKey: ["academicYears"],
        serviceFn: () => academicYearService.getAll({ tenantId: MAIN_TENANT_ID }),
    });

    // Auto-select năm đầu tiên khi danh sách load xong
    useEffect(() => {
        if (!selectedId && academicYears.length > 0) {
            setSelectedId(academicYears[0]!.id);
        }
    }, [academicYears, selectedId]);

    // Lấy chi tiết năm học đang chọn bằng service.get()
    const { data: selectedAcademicYear, isLoading: isLoadingDetail } = useCustomReactQuery({
        queryKey: ["academicYear", selectedId],
        serviceFn: () => academicYearService.get({ tenantId: MAIN_TENANT_ID, id: selectedId! }),
        enabled: !!selectedId,
    });

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [leftOpened, setLeftOpened] = useState(true);

    // Auto-close left panel on mobile initially
    useEffect(() => {
        if (isMobile) {
            setLeftOpened(false);
        } else {
            setLeftOpened(true);
        }
    }, [isMobile]);

    // Refresh lại list + detail sau khi activate thành công
    const handleRefresh = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["academicYears"] });
        if (selectedId) {
            queryClient.invalidateQueries({ queryKey: ["academicYear", selectedId] });
        }
    }, [queryClient, selectedId]);

    return (
        <Flex direction="row" style={{ height: "calc(100vh - 120px)", overflow: "hidden" }}>
            {/* Left panel — danh sách năm học */}
            <Box
                style={{
                    width: leftOpened ? (isMobile ? "100%" : 380) : 0,
                    minWidth: leftOpened ? (isMobile ? "100%" : 300) : 0,
                    transition: "width 0.25s ease, min-width 0.25s ease",
                    overflow: "hidden",
                }}
                p={{ base: leftOpened ? "xs" : 0, md: leftOpened ? "md" : 0 }}
            >
                <PlanningLeftPanel
                    academicYears={academicYears}
                    selectedId={selectedId}
                    onSelectRowAction={(id) => {
                        setSelectedId(id);
                        if (isMobile) setLeftOpened(false);
                    }}
                />
            </Box>
            
            {!isMobile && leftOpened && <Divider orientation="vertical" />}

            {/* Right panel — chi tiết năm học */}
            <Box
                style={{
                    flex: 1,
                    display: isMobile && leftOpened ? "none" : "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    height: "100%",
                }}
                p={{ base: "xs", md: "md" }}
            >
                {isLoadingDetail ? (
                    <Box p="md">
                        <Skeleton height={40} mb="md" />
                        <Skeleton height={100} mb="md" />
                        <Skeleton height={200} />
                    </Box>
                ) : selectedAcademicYear ? (
                    <PlanningRightPanel
                        academicYear={selectedAcademicYear}
                        onRefresh={handleRefresh}
                        onToggleLeft={() => setLeftOpened((o) => !o)}
                        leftOpen={leftOpened}
                    />
                ) : (
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "var(--mantine-color-dimmed)",
                            gap: "md"
                        }}
                    >
                        {!leftOpened && (
                            <ActionIcon variant="light" size="lg" onClick={() => setLeftOpened(true)}>
                                <IconChevronRight size={20} />
                            </ActionIcon>
                        )}
                        <Text>Chọn một năm học để xem chi tiết</Text>
                    </Box>
                )}
            </Box>
        </Flex>
    );
}
