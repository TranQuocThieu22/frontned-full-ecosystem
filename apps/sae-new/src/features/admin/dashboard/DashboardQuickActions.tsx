"use client";

import { Card, Group, SimpleGrid, Text } from "@mantine/core";
import { IconClipboardCheck, IconLock, IconShieldCheck, IconUserPlus } from "@tabler/icons-react";

export function DashboardQuickActions() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Text fw={600} mb="md">
                Thao tác nhanh
            </Text>
            <SimpleGrid cols={2} spacing="xs">
                <Card withBorder padding="sm" radius="md" style={{ cursor: "pointer" }}>
                    <Group gap="xs">
                        <IconUserPlus size={18} color="var(--mantine-color-blue-6)" />
                        <Text size="sm">Tạo tài khoản</Text>
                    </Group>
                </Card>
                <Card withBorder padding="sm" radius="md" style={{ cursor: "pointer" }}>
                    <Group gap="xs">
                        <IconShieldCheck size={18} color="var(--mantine-color-green-6)" />
                        <Text size="sm">Tạo vai trò</Text>
                    </Group>
                </Card>
                <Card withBorder padding="sm" radius="md" style={{ cursor: "pointer" }}>
                    <Group gap="xs">
                        <IconLock size={18} color="var(--mantine-color-orange-6)" />
                        <Text size="sm">Phân quyền</Text>
                    </Group>
                </Card>
                <Card withBorder padding="sm" radius="md" style={{ cursor: "pointer" }}>
                    <Group gap="xs">
                        <IconClipboardCheck size={18} color="var(--mantine-color-grape-6)" />
                        <Text size="sm">Cấu hình ĐRL</Text>
                    </Group>
                </Card>
            </SimpleGrid>
        </Card>
    );
}
