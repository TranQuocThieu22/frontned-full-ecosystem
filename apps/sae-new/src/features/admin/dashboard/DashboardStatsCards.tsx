"use client";

import { Box, Card, Group, SimpleGrid, Text, Badge } from "@mantine/core";
import { IconActivity, IconClipboardCheck, IconShieldCheck, IconUsers } from "@tabler/icons-react";
import type { DashboardStat } from "@/shared/interfaces/DashboardStat";

// Mock data
const statsData: DashboardStat[] = [
    {
        title: "Tổng tài khoản",
        value: "1,234",
        change: "+12%",
        icon: <IconUsers size={24} />,
        color: "blue",
    },
    {
        title: "Vai trò hệ thống",
        value: "8",
        change: "Hoạt động",
        icon: <IconShieldCheck size={24} />,
        color: "green",
    },
    {
        title: "Khung ĐRL",
        value: "2",
        change: "Đang áp dụng",
        icon: <IconClipboardCheck size={24} />,
        color: "orange",
    },
    {
        title: "Hoạt động tuần này",
        value: "156",
        change: "+8%",
        icon: <IconActivity size={24} />,
        color: "grape",
    },
];

export function DashboardStatsCards() {
    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
            {statsData.map((stat, index) => (
                <Card key={index} withBorder shadow="sm" radius="md">
                    <Group justify="space-between" mb="xs">
                        <Text size="sm" c="dimmed" tt="uppercase" fw={600}>
                            {stat.title}
                        </Text>
                        <Box
                            p={8}
                            style={{
                                borderRadius: 8,
                                backgroundColor: `var(--mantine-color-${stat.color}-0)`,
                            }}
                        >
                            <Box style={{ color: `var(--mantine-color-${stat.color}-6)` }}>
                                {stat.icon}
                            </Box>
                        </Box>
                    </Group>
                    <Group align="flex-end" gap="xs">
                        <Text fw={700}>
                            {stat.value}
                        </Text>
                        <Badge color="green" variant="light" size="sm">
                            {stat.change}
                        </Badge>
                    </Group>
                </Card>
            ))}
        </SimpleGrid>
    );
}
