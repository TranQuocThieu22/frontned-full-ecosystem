"use client";

import { ActionIcon, Box, Breadcrumbs, CopyButton, Divider, Group, Text, Tooltip } from "@mantine/core";
import { IconArrowLeft, IconCopy } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export interface CustomPageContentProps {
    /** Tiêu đề chính của trang */
    /** Mô tả ngắn dưới tiêu đề */
    description?: string;
    /** Danh sách breadcrumb */
    breadcrumbs?: BreadcrumbItem[];
    /** Action buttons bên phải header */
    actions?: ReactNode;
    /** Nội dung trang */
    children: ReactNode;
}

export function CustomPageContent({
    description,
    breadcrumbs,
    actions,
    children,
}: CustomPageContentProps) {
    const router = useRouter();

    return (
        <Box>
            {/* Header Section */}
            <Box >
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Group align="center">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="md"
                            radius="md"
                            onClick={() => router.back()}
                        >
                            <IconArrowLeft size={16} />
                        </ActionIcon>

                        <Breadcrumbs
                            separator="/"
                            styles={{
                                root: {
                                    marginBottom: 0,
                                },
                            }}
                        >
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                return item.href && !isLast ? (
                                    <Text
                                        key={index}
                                        style={{
                                            color: "var(--mantine-color-gray-6)",
                                            textDecoration: "none",
                                            fontSize: "var(--mantine-font-size-xs)",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                ) : (
                                    <Text
                                        key={index}
                                        size="lg"
                                        c="dimmed"
                                        fw={'bold'}
                                    >
                                        {item.title}
                                    </Text>
                                );
                            })}
                        </Breadcrumbs>

                        <CopyButton
                            value={typeof window !== "undefined" ? window.location.href : ""}
                            timeout={2000}
                        >
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? "Đã sao chép!" : "Sao chép liên kết"} position="bottom">
                                    <ActionIcon
                                        variant="subtle"
                                        color={copied ? "teal" : "gray"}
                                        onClick={copy}
                                        size="sm"
                                    >
                                        <IconCopy size={14} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                )}

                {/* Title Row */}
                <Group justify="space-between" align="flex-start">
                    <Box>
                        <Group gap="xs" align="center">
                            {actions}
                        </Group>
                        {description && (
                            <Text c="dimmed" size="sm" mt={4}>
                                {description}
                            </Text>
                        )}
                    </Box>
                </Group>
            </Box>

            {/* Page Content */}
            <Divider />
            {children}
        </Box>
    );
}
