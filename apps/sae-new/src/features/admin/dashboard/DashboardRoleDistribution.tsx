"use client";

import { Box, Card, Group, RingProgress, SimpleGrid, Text, Title } from "@mantine/core";
import type { RoleDistribution } from "@/shared/interfaces/RoleDistribution";

// Mock data
const roleDistributionData: RoleDistribution[] = [
    { name: "Sinh viên", value: 65, color: "grape" },
    { name: "Giảng viên", value: 20, color: "blue" },
    { name: "CTSV Staff", value: 8, color: "green" },
    { name: "Admin", value: 2, color: "red" },
    { name: "Khác", value: 5, color: "gray" },
];

export function DashboardRoleDistribution() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Title order={4} mb="md">
                Phân bố vai trò
            </Title>
            <Group justify="center" mb="md">
                <RingProgress
                    size={180}
                    thickness={24}
                    roundCaps
                    sections={roleDistributionData.map((r) => ({
                        value: r.value,
                        color: r.color,
                        tooltip: `${r.name}: ${r.value}%`,
                    }))}
                />
            </Group>
            <SimpleGrid cols={2} spacing="xs">
                {roleDistributionData.map((role) => (
                    <Group key={role.name} gap="xs">
                        <Box
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 4,
                                backgroundColor: `var(--mantine-color-${role.color}-6)`,
                            }}
                        />
                        <Text size="sm">
                            {role.name}: {role.value}%
                        </Text>
                    </Group>
                ))}
            </SimpleGrid>
        </Card>
    );
}
