"use client";

import { Box, Text, UnstyledButton, rem } from "@mantine/core";
import type { ReactNode } from "react";
import styles from "./CustomCardPanel.module.css";

export interface CustomCardPanelProps {
    /** Tiêu đề chính (tên entity) */
    title: string;
    /** Mã / code hiển thị phụ */
    code?: string;
    /** Trạng thái hiển thị dưới dạng Badge */
    state?: {
        label: string;
        color: string;
    };
    /** Mô tả phụ (vd: số lượng học kỳ, ngày tạo, ...) */
    description?: string | ReactNode;
    /** Icon hoặc badge phụ bên phải header */
    badge?: ReactNode;
    /** Footer content (vd: danh sách học kỳ, thông tin thêm) */
    footer?: ReactNode;
    /** Props cho UnstyledButton (onClick, disabled, ...) */
    buttonProps?: Omit<React.ComponentProps<typeof UnstyledButton>, "children">;
    /** Màu accent border trái khi selected — mặc định blue */
    accentColor?: string;
    /** Bật/tắt trạng thái selected */
    selected?: boolean;
    /** Callback khi click */
    onClick?: () => void;
}

export function CustomCardPanel({
    title,
    code,
    state,
    description,
    badge,
    footer,
    buttonProps,
    accentColor = "var(--mantine-color-blue-6)",
    selected = false,
    onClick,
}: CustomCardPanelProps) {
    return (
        <UnstyledButton
            onClick={onClick}
            style={{ display: "block", width: "100%", textAlign: "left" }}
            {...buttonProps}
        >
            <Box
                className={styles.root}
                data-selected={selected || undefined}
                style={
                    selected
                        ? ({ "--card-accent": accentColor } as React.CSSProperties)
                        : undefined
                }
            >
                {/* ── Header ────────────────────────────────────────────────── */}
                <Box className={styles.header}>
                    <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text className={styles.title} lineClamp={1}>
                            {title}
                        </Text>

                        {/* Meta row: code + state badge */}
                        <Box className={styles.metaRow}>
                            {code && (
                                <Text className={styles.code} lineClamp={1}>
                                    {code}
                                </Text>
                            )}
                            {code && state && (
                                <Box style={{ width: rem(4), height: rem(4), borderRadius: "50%", background: "var(--mantine-color-gray-4)", flexShrink: 0 }} />
                            )}
                            {state && (
                                <Box
                                    style={{
                                        padding: `${rem(1)} ${rem(6)}`,
                                        borderRadius: rem(4),
                                        background: `var(--mantine-color-${state.color}-0)`,
                                        border: `1px solid var(--mantine-color-${state.color}-2)`,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: rem(10),
                                            fontWeight: 600,
                                            color: `var(--mantine-color-${state.color}-7)`,
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {state.label}
                                    </Text>
                                </Box>
                            )}
                            {badge}
                        </Box>
                    </Box>

                    {/* Chevron indicator khi selected */}
                    {selected && (
                        <Box
                            style={{
                                width: rem(6),
                                height: rem(6),
                                borderRadius: "50%",
                                background: accentColor,
                                flexShrink: 0,
                                marginLeft: rem(8),
                            }}
                        />
                    )}
                </Box>

                {/* ── Description ───────────────────────────────────────────── */}
                {description && (
                    <Text className={styles.description} lineClamp={2}>
                        {description}
                    </Text>
                )}

                {/* ── Footer ─────────────────────────────────────────────────── */}
                {footer && (
                    <Box className={styles.footer}>{footer}</Box>
                )}
            </Box>
        </UnstyledButton>
    );
}
