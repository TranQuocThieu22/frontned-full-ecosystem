import { Box, Card, Group, Text, ThemeIcon } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./DashboardMetrics.module.css";

interface SingleStatCardProps {
    title: string;
    value: number;
    unit?: string;
    description?: string;
    icons: ReactNode;
    diff?: number;
    color?: string;
    gradient?: { from: string; to: string };
}

export default function SingleStatCard({
    title,
    value,
    unit = "",
    description,
    icons,
    diff,
    color = "blue",
    gradient = { from: "blue", to: "cyan" }
}: SingleStatCardProps) {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={classes.card}
            style={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
        >
            <Group justify="space-between" align="flex-start" mb="md">
                <Box>
                    <Text size="sm" c="dimmed" fw={500} tt="uppercase" mb="xs">
                        {title}
                    </Text>
                    <Text size="40px" fw={700} c="dark">
                        {value}
                    </Text>
                    {unit && (
                        <Text size="xs" c="dimmed">
                            Đơn vị: <strong>{unit}</strong>
                        </Text>
                    )}
                </Box>
                <ThemeIcon size="xl" radius="md" variant="gradient" gradient={gradient}>
                    {icons}
                </ThemeIcon>
            </Group>
            <Box
                h={4}
                style={{
                    background: `linear-gradient(90deg, var(--mantine-color-${color}-2), var(--mantine-color-${color}-4))`,
                    borderRadius: "2px",
                    marginTop: "auto",
                }}
            />
            {description && (
                <Text size="xs" c="dimmed" mt="sm">
                    {description}
                </Text>
            )}
        </Card>
    );
}