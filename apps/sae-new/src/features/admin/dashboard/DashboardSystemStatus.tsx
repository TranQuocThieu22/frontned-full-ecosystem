"use client";

import { Box, Card, Group, Progress, Text, Badge, Title } from "@mantine/core";

export function DashboardSystemStatus() {
    const services = [
        { name: "IAM Service", value: 98, color: "green" },
        { name: "Database", value: 75, color: "blue" },
        { name: "API Gateway", value: 92, color: "green" },
    ];

    return (
        <Card withBorder shadow="sm" radius="md">
            <Title order={4} mb="md">
                Trạng thái hệ thống
            </Title>
            {services.map((service) => (
                <Box key={service.name} mb="md">
                    <Group justify="space-between" mb={4}>
                        <Text size="sm">{service.name}</Text>
                        <Badge color="green" variant="light">Hoạt động</Badge>
                    </Group>
                    <Progress value={service.value} color={service.color} size="sm" />
                </Box>
            ))}
        </Card>
    );
}
