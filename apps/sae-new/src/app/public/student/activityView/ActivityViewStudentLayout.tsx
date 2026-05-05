"use client";

import { Badge, Box, Flex, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useCustomReactMutation } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactMutation";

import { activityService } from "@/shared/APIs/activityService";
import EmptyState from "@/shared/components/EmptyState";
import type {
    ActivityApiItem,
    ActivityFilterRequest
} from "@/shared/interfaces/ActivityStudent";
import {
    ActivityState,
    ActivityType,
} from "@/shared/interfaces/ActivityStudent";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { ActivityEmptyState } from "../../../../shared/components/svg/ActivityEmptyState";
import { ActivityCard } from "./components/ActivityCard";
import { ActivityDetailDrawer } from "./components/ActivityDetailDrawer";
import { ActivityFilters, type FilterType } from "./components/ActivityFilters";
import { ActivityPagination } from "./components/ActivityPagination";
import { ActivityStats } from "./components/ActivityStats";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');

  @keyframes cardFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .activity-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(26, 39, 68, 0.1);
  }

  ::-webkit-scrollbar        { width: 6px; }
  ::-webkit-scrollbar-track { background: #F3F0EA; }
  ::-webkit-scrollbar-thumb { background: #C5BEB4; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #9E9689; }
`;

export default function ActivityViewStudentLayout() {
    const [selectedType, setSelectedType] = useState<FilterType>("all");
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Tất cả Điều");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const [selectedActivity, setSelectedActivity] = useState<ActivityApiItem | null>(null);
    const filterType = selectedType === "all"
        ? undefined
        : selectedType === "mandatory"
            ? ActivityType.Mandatory
            : ActivityType.Optional
    const filterState = !selectedStatus || selectedStatus === "Tất cả"
        ? undefined
        : selectedStatus === "open"
            ? ActivityState.Open
            : selectedStatus === "ongoing"
                ? ActivityState.Ongoing
                : ActivityState.Closed
    const filter: ActivityFilterRequest = {
        pageNumber: page,
        pageSize,
        codeOrName: searchKeyword || undefined,
        type: filterType,
        state: filterState
    };

    const query = useCustomReactQuery({
        queryKey: ["activities", page, pageSize, searchKeyword, selectedType, selectedStatus],
        serviceFn: () => activityService.getActivities(filter),
    });

    const activities: ActivityApiItem[] = query.data ?? [];
    const paging = query.paging ?? null;

    // ── Client-side filter (type, category, status — server handles keyword + pagination) ──
    const filtered = activities.filter((a) => {
        const matchType =
            selectedType === "all" ||
            (selectedType === "mandatory" && a.type === ActivityType.Mandatory) ||
            (selectedType === "optional" && a.type === ActivityType.Optional);
        const matchCat =
            !selectedCategory ||
            selectedCategory === "Tất cả Điều" ||
            a.criteriaId === selectedCategory;
        const matchStatus =
            !selectedStatus ||
            (selectedStatus === "open" && a.state === ActivityState.Open) ||
            (selectedStatus === "ongoing" && (a.state === ActivityState.Ongoing || a.state === ActivityState.Recording)) ||
            (selectedStatus === "closed" && a.state === ActivityState.Closed);
        return matchType && matchCat && matchStatus;
    });

    const totalPages = paging?.totalPages ?? (Math.ceil((paging?.totalItemCount ?? filtered.length) / pageSize) || 1);

    const queryClient = useQueryClient();
    const registerMutation = useCustomReactMutation({
        mutationType: "update",
        serviceFn: (activityId: string) => activityService.register(activityId),
        successNotification: "Đăng ký tham gia thành công!",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activities"] });
            closeDrawer();
        },
    });

    const totalActivities = paging?.totalItemCount ?? filtered.length;
    const totalPoints = filtered.reduce((sum, a) => sum + (a.maxScore ?? 0), 0);
    const openCount = filtered.filter((a) => a.state === ActivityState.Open).length;

    function handleViewDetail(item: ActivityApiItem) {
        setSelectedActivity(item);
        openDrawer();
    }

    if (query.isLoading) {
        return (
            <Flex justify="center" align="center" h={300}>
                <Loader />
            </Flex>
        );
    }

    return (
        <>
            <style>{GLOBAL_STYLES}</style>

            <Box px={{ base: "md", md: "xl" }} py="xl">
                {/* ── Page Header ── */}
                <Box mb="xl" style={{ animation: "cardFadeUp 0.5s ease both" }}>
                    <Group justify="space-between" align="flex-end" wrap="wrap" gap="md" mb="sm">
                        <Box>
                            <Group gap="sm" mb="xs">
                                <Badge
                                    size="lg"
                                    radius="sm"
                                    style={{
                                        background: "#1A2744",
                                        color: "white",
                                        fontWeight: 700,
                                        letterSpacing: "0.06em",
                                        fontSize: "11px",
                                    }}
                                >
                                    HK1-2026
                                </Badge>
                                <Text size="sm" style={{ color: "#9E9689", fontFamily: "'Roboto', sans-serif" }}>
                                    Học kỳ đang mở
                                </Text>
                            </Group>
                            <Title
                                order={2}
                                style={{
                                    fontFamily: "'Roboto', sans-serif",
                                    fontSize: "clamp(28px, 4vw, 42px)",
                                    color: "#1A2744",
                                    lineHeight: 1.1,
                                }}
                            >
                                Hoạt động Ngoại khóa
                            </Title>
                            <Text
                                size="sm"
                                mt={6}
                                style={{ color: "#7A746B", fontFamily: "'Roboto', sans-serif" }}
                            >
                                Lập kế hoạch, đăng ký và theo dõi tiến độ tích lũy điểm rèn luyện
                            </Text>
                        </Box>

                        <ActivityStats
                            totalActivities={totalActivities}
                            totalPoints={totalPoints}
                            openCount={openCount}
                        />
                    </Group>
                </Box>

                {/* ── Filters ── */}
                <ActivityFilters
                    searchKeyword={searchKeyword}
                    onSearchChange={(val) => { setSearchKeyword(val); setPage(1); }}
                    selectedType={selectedType}
                    onTypeChange={(val) => { setSelectedType(val); setPage(1); }}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(val) => { setSelectedCategory(val); setPage(1); }}
                    selectedStatus={selectedStatus}
                    onStatusChange={(val) => { setSelectedStatus(val); setPage(1); }}
                />

                {/* ── Results Info ── */}
                <Flex
                    justify="space-between"
                    align="center"
                    mb="md"
                    wrap="wrap"
                    gap="sm"
                    style={{ animation: "cardFadeUp 0.5s ease 0.15s both" }}
                >
                    <Text size="sm" style={{ color: "#7A746B", fontFamily: "'Roboto', sans-serif" }}>
                        Hiển thị{" "}
                        <Text span fw={700} style={{ color: "#1A2744" }}>
                            {filtered.length}
                        </Text>{" "}
                        /{" "}
                        <Text span fw={700} style={{ color: "#1A2744" }}>
                            {totalActivities}
                        </Text>{" "}
                        hoạt động
                    </Text>
                </Flex>

                {/* ── Activity Grid ── */}
                {filtered.length > 0 ? (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg" mb="xl">
                        {filtered.map((item, i) => (
                            <ActivityCard
                                key={item.id}
                                item={item}
                                onViewDetail={handleViewDetail}
                                onRegister={(id) => registerMutation.mutate(id)}
                                index={i}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <EmptyState
                        SVG={() => <ActivityEmptyState />}
                        message="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả khác."
                        title="Không tìm thấy hoạt động" />
                )}

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <ActivityPagination
                        page={page}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
                    />
                )}
            </Box>

            {/* ── Detail Drawer ── */}
            <ActivityDetailDrawer
                item={selectedActivity}
                opened={drawerOpened}
                onClose={closeDrawer}
                onRegister={(id) => registerMutation.mutate(id)}
                registerMutation={registerMutation}
            />
        </>
    );
}
