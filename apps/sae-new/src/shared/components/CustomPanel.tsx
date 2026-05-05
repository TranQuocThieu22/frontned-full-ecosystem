"use client";

import { Box, Divider, Flex, Text, rem, useComputedColorScheme } from "@mantine/core";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CustomPanel — Card/Panel component cho hiển thị nội dung chi tiết
   (dùng trong trang năm học, chi tiết học kỳ...)
   ───────────────────────────────────────────────────────────────────────────── */
export interface CustomPanelProps {
    /** Tiêu đề panel */
    title: ReactNode;
    /** Mô tả phụ bên dưới title */
    subtitle?: ReactNode;
    /** Nội dung bên phải header (badge, buttons...) */
    headerRight?: ReactNode;
    children: ReactNode;
}

export function CustomPanel({ title, subtitle, headerRight, children }: CustomPanelProps) {
    const scheme = useComputedColorScheme();
    const isDark = scheme === "dark";

    const borderColor = isDark ? "var(--mantine-color-dark-4)" : "var(--mantine-color-gray-3)";
    const bgColor = isDark ? "var(--mantine-color-dark-7)" : "var(--mantine-color-white)";
    const headerBg = isDark ? "var(--mantine-color-dark-6)" : "var(--mantine-color-gray-0)";

    return (
        <Box
            style={{
                border: `1px solid ${borderColor}`,
                borderRadius: rem(10),
                overflow: "hidden",
                background: bgColor,
            }}
        >
            <Flex
                px="md"
                py={rem(10)}
                align="center"
                justify="space-between"
                style={{ background: headerBg, borderBottom: `1px solid ${borderColor}` }}
            >
                <Box>
                    <Text fw={600} size="sm">
                        {title}
                    </Text>
                    {subtitle && (
                        <Text size="xs" c="dimmed">
                            {subtitle}
                        </Text>
                    )}
                </Box>
                {headerRight}
            </Flex>

            <Box p="md">{children}</Box>
        </Box>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CustomPanelSection — Section nhỏ bên trong CustomPanel body
   ───────────────────────────────────────────────────────────────────────────── */
export interface CustomPanelSectionProps {
    title: string;
    children: ReactNode;
}

export function CustomPanelSection({ title, children }: CustomPanelSectionProps) {
    const scheme = useComputedColorScheme();
    const isDark = scheme === "dark";

    return (
        <Box mb="md">
            <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="xs">
                {title}
            </Text>
            <Box>{children}</Box>
            <Divider
                mt="md"
                color={isDark ? "var(--mantine-color-dark-4)" : "var(--mantine-color-gray-3)"}
            />
        </Box>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CustomPanelRow — Dòng label + value bên trong section
   ───────────────────────────────────────────────────────────────────────────── */
export interface CustomPanelRowProps {
    label: string;
    value?: ReactNode;
    icon?: ReactNode;
}

export function CustomPanelRow({ label, value, icon }: CustomPanelRowProps) {
    return (
        <Flex align="center" gap="xs" mb="xs">
            {icon && (
                <Box c="blue.6" style={{ display: "flex", alignItems: "center" }}>
                    {icon}
                </Box>
            )}
            <Text size="sm" c="dimmed" style={{ minWidth: rem(160) }}>
                {label}
            </Text>
            <Text size="sm" fw={500}>
                {value ?? "—"}
            </Text>
        </Flex>
    );
}