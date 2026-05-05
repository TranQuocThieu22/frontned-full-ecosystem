"use client";

import { Box, Card, Group, Text, Title } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";
import type { RecentActivity } from "@/shared/interfaces/RecentActivity";

// Mock data
const recentActivityData: RecentActivity[] = [
    { user: "admin001", action: "Tạo tài khoản mới", time: "5 phút trước" },
    { user: "ctsv001", action: "Cập nhật vai trò", time: "15 phút trước" },
    { user: "admin001", action: "Cấu hình khung ĐRL", time: "1 giờ trước" },
    { user: "admin001", action: "Phân quyền truy cập", time: "2 giờ trước" },
];

export function DashboardRecentActivity() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Title order={4} mb="md">
                Hoạt động gần đây
            </Title>
            {recentActivityData.map((activity, index) => (
                <Group key={index} justify="space-between" py="xs" style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
                    <Group gap="sm">
                        <Box
                            p={6}
                            style={{
                                borderRadius: 6,
                                backgroundColor: "var(--mantine-color-blue-0)",
                            }}
                        >
                            <IconActivity size={14} color="var(--mantine-color-blue-6)" />
                        </Box>
                        <Box>
                            <Text size="sm" fw={500}>
                                {activity.user}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {activity.action}
                            </Text>
                        </Box>
                    </Group>
                    <Text size="xs" c="dimmed">
                        {activity.time}
                    </Text>
                </Group>
            ))}
        </Card>
    );
}
