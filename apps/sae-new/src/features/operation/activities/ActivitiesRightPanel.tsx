"use client";

import { activityServiceQT } from "@/shared/APIs/activityServiceQT";
import { CustomPanel } from "@/shared/components/CustomPanel";
import { ActivityStateColor, ActivityStateEnum, ActivityStateLabel, ActivityTypeEnum } from "@/shared/interfaces/Activity";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { ActionIcon, Badge, Box, Center, Flex, Group, Loader, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBookmark, IconCalendarDue, IconChevronLeft, IconChevronRight, IconInfoCircle, IconStar, IconUsers } from "@tabler/icons-react";
import ActivitiesCreateUpdateButton from "./ActivitiesCreateUpdateButton";
import ActivitiesUpdateState from "./ActivitiesUpdateState";

export default function ActivitiesRightPanel({
    selectedId,
    onToggleLeft,
    leftOpen,
}: {
    selectedId: string | null;
    onToggleLeft?: () => void;
    leftOpen?: boolean;
}) {
    const authenticateStore = useAuthenticateStore()
    const activityDetailQuery = useCustomReactQuery({
        queryKey: ["activity", selectedId],
        serviceFn: () => activityServiceQT.getById({
            tenantId: authenticateStore.state.tenantId,
            id: selectedId!,
        }),
        // mockData: {
        //     id: "1",
        //     name: "Hoạt động 1",
        //     code: "HD001",
        //     type: 1,
        //     state: 1,
        //     semesterName: "Học kỳ 1",
        //     maxScore: 10,
        //     quota: 100,
        //     registeredCount: 23,
        //     organizerUnit: "Đơn vị ghi nhận 1",
        //     description: "Mô tả hoạt động 1",
        // },
        enabled: !!selectedId,
    });

    if (!selectedId) {
        return (
            <Center h="100%" flex={1}>
                <Stack align="center" gap="sm">
                    <IconInfoCircle size={48} stroke={1.5} color="var(--mantine-color-gray-4)" />
                    <Text c="dimmed">Chọn một hoạt động để xem chi tiết</Text>
                </Stack>
            </Center>
        );
    }

    if (activityDetailQuery.isLoading) {
        return (
            <Center h="100%" flex={1}>
                <Loader />
            </Center>
        );
    }
    if (activityDetailQuery.isError) {
        return (
            <Center h="100%" flex={1}>
                <Text c="red">Lỗi khi tải chi tiết hoạt động</Text>
            </Center>
        );
    }
    if (!activityDetailQuery.data) return (
        <Center h="100%" flex={1}>
            <Text c="dimmed">Không tìm thấy hoạt động</Text>
        </Center>
    )

    const activity = activityDetailQuery.data;


    return (
        <Stack flex={1}>
            <Flex justify={'space-between'} align={'flex-start'}>
                <Stack gap={4}>
                    <Flex align={'center'} gap={'md'}>
                        {onToggleLeft && (
                            <ActionIcon variant="subtle" size="md" onClick={onToggleLeft}>
                                {leftOpen ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
                            </ActionIcon>
                        )}
                        <Title order={3}>
                            {activity.name}
                        </Title>
                    </Flex>
                    <Group gap="xs">
                        <Text c="dimmed" size="sm" fw={600}>
                            {activity.code || "N/A"}
                        </Text>
                        <Text c="dimmed" size="sm">•</Text>
                        <Badge
                            variant="filled"
                            style={{ backgroundColor: "#3B5EFD" }}
                        >
                            {activity.type === ActivityTypeEnum.MANDATORY ? "BẮT BUỘC" : "TỰ CHỌN"}
                        </Badge>
                        {activity.type === ActivityTypeEnum.MANDATORY && (
                            <Badge
                                variant="filled"
                                style={{ backgroundColor: "#10B981" }}
                            >
                                LẶP LẠI MỖI HỌC KỲ
                            </Badge>
                        )}
                        <Badge
                            size="md"
                            bg={activity.state ? ActivityStateColor[activity.state as ActivityStateEnum] : "gray"}
                        >
                            {activity.state ? ActivityStateLabel[activity.state as ActivityStateEnum] : "Không xác định"}
                        </Badge>
                    </Group>
                </Stack>
                <Flex gap={'md'}>
                    <ActivitiesUpdateState activityId={activity.id} initState={activity.state} />
                    <ActivitiesCreateUpdateButton values={activity} />
                </Flex>
            </Flex>

            <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mt="sm">
                <CustomPanel
                    title="Học kỳ"
                    headerRight={<IconCalendarDue size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <SimpleGrid cols={1}>
                        <Box>
                            <Text size="xs" c="dimmed">Tên học kỳ</Text>
                            <Text size="sm" fw={500}>{activity.semesterName || "Chưa xác định"}</Text>
                        </Box>
                    </SimpleGrid>
                </CustomPanel>

                <CustomPanel
                    title="Điểm tối đa"
                    headerRight={<IconStar size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <SimpleGrid cols={2}>
                        <Box>
                            <Text size="xs" c="dimmed">Điểm</Text>
                            <Text size="sm" fw={500}>{activity.maxScore || 0}</Text>
                        </Box>
                    </SimpleGrid>
                </CustomPanel>

                <CustomPanel
                    title="Đã đăng ký"
                    headerRight={<IconUsers size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <SimpleGrid cols={3}>
                        <Box>
                            <Text size="xs" c="dimmed">Chỉ tiêu đăng ký</Text>
                            <Text size="sm" fw={500}>{activity.quota || 0} SV</Text>
                        </Box>
                        <Box>
                            <Text size="xs" c="dimmed">Số lượng</Text>
                            <Text size="sm" fw={500}>{activity.registeredCount || 0} SV</Text>
                        </Box>
                        <Box>
                            <Text size="xs" c="dimmed">Còn lại</Text>
                            <Text size="sm" fw={500}>{Math.max(0, (activity.quota || 0) - (activity.registeredCount || 0))}</Text>
                        </Box>
                    </SimpleGrid>
                </CustomPanel>
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, xs: 2 }} mt="sm">
                <CustomPanel
                    title="Đơn vị tổ chức"
                    headerRight={<IconBookmark size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <SimpleGrid cols={1}>
                        <Box>
                            <Text size="sm" fw={500}>{activity.organizerUnit || "Chưa xác định"}</Text>
                        </Box>
                    </SimpleGrid>
                </CustomPanel>
                {/* <CustomPanel
                    title="Đơn vị ghi nhận"
                    headerRight={<IconBookmark size={16} color="var(--mantine-color-blue-6)" />}
                >
                    <SimpleGrid cols={1}>
                        <Box>
                            <Text size="sm" fw={500}>{activity.organizerUnit || "Chưa xác định"}</Text>
                        </Box>
                    </SimpleGrid>
                </CustomPanel> */}
            </SimpleGrid>

            <CustomPanel title="Mô tả">
                <Paper p="sm" radius="md" style={{ border: "1px solid var(--mantine-color-gray-3)" }}>
                    <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                        {activity.description || "Chưa có mô tả cho hoạt động này."}
                    </Text>
                </Paper>
            </CustomPanel>

            {/* <CustomPanel title="Thông tin hệ thống">
                <CustomPanelSection title="">
                    <CustomPanelRow label="Tạo lúc" value={formatDate(activity.createdAt)} />
                    <CustomPanelRow label="Cập nhật lúc" value={formatDate(activity.updatedAt)} />
                </CustomPanelSection>
            </CustomPanel> */}
        </Stack>
    );
}
