"use client";

import { Box, Collapse, Divider, Text, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import React, { ReactNode } from "react";

export interface CustomWindowProps {
    /** Order number hiển thị trên badge (vd: 1 → "HK1", 2 → "HK2") */
    order: number;
    /** Tiêu đề hiển thị ở header */
    title: string;
    /** Variant style: primary (blue) | default (gray) */
    variant?: "primary" | "default";
    children: ReactNode;
    /** Nội dung bên phải header (action icons...) */
    headerRight?: ReactNode;
    /** Có cho phép thu gọn/mở rộng không? Mặc định true */
    allowCollapse?: boolean;
}

export function CustomWindow({
    order,
    title,
    variant = "default",
    children,
    headerRight,
    allowCollapse = true,
}: CustomWindowProps) {
    const [opened, { toggle }] = useDisclosure(true);
    const isPrimary = variant === "primary";
    const headerBg = isPrimary
        ? "light-dark(var(--mantine-color-blue-0), var(--mantine-color-dark-6))"
        : "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))";
    const headerBorder = isPrimary ? "var(--mantine-color-blue-3)" : "var(--mantine-color-gray-4)";
    const titleColor = isPrimary
        ? "var(--mantine-color-blue-7)"
        : "light-dark(var(--mantine-color-dark-7), var(--mantine-color-gray-1))";
    const iconColor = isPrimary
        ? "var(--mantine-color-blue-6)"
        : "light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-4))";

    return (
        <Box
            mb="md"
            style={{
                border: `1px solid ${headerBorder}`,
                borderRadius: rem(8),
                overflow: "hidden",
                background: "light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))",
                transition: "border-color 150ms ease, box-shadow 150ms ease",
            }}
        >
            {/* ── Header ────────────────────────────────────────────────────── */}
            <Box
                px="md"
                py={rem(10)}
                style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
            >
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        gap: rem(10),
                    }}
                >
                    {/* Toggle button: badge + title + chevron */}
                    <UnstyledButton
                        type="button"
                        onClick={allowCollapse ? toggle : undefined}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                            gap: rem(10),
                            cursor: allowCollapse ? "pointer" : "default",
                            userSelect: "none"
                        }}
                    >
                        {/* Order badge */}
                        <Box
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: rem(28),
                                height: rem(28),
                                borderRadius: rem(6),
                                background: isPrimary
                                    ? "var(--mantine-color-blue-6)"
                                    : "light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))",
                                color: "var(--mantine-color-white)",
                                fontSize: rem(12),
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {order}
                        </Box>

                        {/* Title */}
                        <Text
                            size="sm"
                            fw={600}
                            style={{ color: titleColor, flex: 1, textAlign: "left" }}
                        >
                            {title}
                        </Text>

                        {/* Chevron */}
                        {allowCollapse && (
                            <Box
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 150ms ease",
                                    color: iconColor,
                                }}
                            >
                                <IconChevronDown size={16} stroke={2} />
                            </Box>
                        )}
                    </UnstyledButton>

                    {/* Action buttons (không nằm trong button) */}
                    {headerRight}
                </Box>
            </Box>

            {/* ── Body ──────────────────────────────────────────────────────── */}
            <Collapse in={opened}>
                <Box p="md">{children}</Box>
            </Collapse>
        </Box>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CustomWindowSection
   ───────────────────────────────────────────────────────────────────────────── */
export interface CustomWindowSectionProps {
    /** Tiêu đề section (hiển thị uppercase) */
    title: string;
    children: ReactNode;
    /** Có cho phép thu gọn/mở rộng không? Mặc định true */
    allowCollapse?: boolean;
}

export function CustomWindowSection({ title, children, allowCollapse = true }: CustomWindowSectionProps) {
    const [opened, { toggle }] = useDisclosure(true);

    return (
        <Box mb="md">
            <UnstyledButton
                type="button"
                onClick={allowCollapse ? toggle : undefined}
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    paddingBottom: rem(6),
                    gap: rem(6),
                    cursor: allowCollapse ? "pointer" : "default",
                    userSelect: "none",
                }}
            >
                <Box
                    style={{
                        width: rem(3),
                        height: rem(14),
                        borderRadius: rem(2),
                        background: "var(--mantine-color-blue-5)",
                        flexShrink: 0,
                    }}
                />
                <Text
                    size="xs"
                    fw={700}
                    tt="uppercase"
                    style={{
                        letterSpacing: "0.05em",
                        color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))",
                        flex: 1,
                        textAlign: "left",
                    }}
                >
                    {title}
                </Text>
                {allowCollapse && (
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            transform: opened ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 150ms ease",
                            color: "light-dark(var(--mantine-color-gray-5), var(--mantine-color-gray-4))",
                        }}
                    >
                        <IconChevronDown size={14} stroke={2} />
                    </Box>
                )}
            </UnstyledButton>

            <Collapse in={opened}>
                <Box
                    pl={rem(12)}
                    pt={rem(6)}
                >
                    {children}
                </Box>
            </Collapse>

            <Divider mt="sm" color="light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-5))" />
        </Box>
  );
}

// Attach Section as static property
CustomWindow.Section = CustomWindowSection;
