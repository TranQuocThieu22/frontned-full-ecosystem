
"use client";

import {
    ActionIcon,
    AppShell,
    Box,
    Collapse,
    Group,
    ScrollArea,
    Stack,
    Text,
    UnstyledButton,
    rem,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
    IconChevronRight,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { AvatarInfoMenu } from "./AvatarInfoMenu";
import type { BreadcrumbItem } from "./CustomPageContent";
import { CustomPageContent } from "./CustomPageContent";

export interface CustomAppShellMenuItem {
    label: string;
    icon?: ReactNode;
    /**
     * Nếu có `items` thì `link` có thể để trống.
     * Nếu click vào item có `link` thì sẽ navigate.
     */
    link?: string;
    items?: CustomAppShellMenuItem[];
    /** Mô tả ngắn hiển thị dưới title trang */
    description?: string;
}

interface CustomAppShellProps {
    children: ReactNode;
    /**
     * Optional. Nếu không truyền, component sẽ render menu mẫu.
     */
    menu?: CustomAppShellMenuItem[];
    /** Tiêu đề trang - nếu không truyền sẽ tự động lấy từ menu */
    title?: string;
    /** Mô tả ngắn dưới tiêu đề */
    description?: string;
    /** Danh sách breadcrumb */
    breadcrumbs?: BreadcrumbItem[];
}

function isActiveLink(pathname: string, link: string) {
    if (!link) return false;
    const cleanPathname = pathname.replace(/\/+$/, "");
    const cleanLink = link.replace(/\/+$/, "");
    return cleanPathname === cleanLink || cleanPathname.startsWith(`${cleanLink}/`);
}

function getItemKey(item: CustomAppShellMenuItem) {
    return item.link ? item.link : item.label;
}

export default function CustomAppShell({
    children,
    menu,
    title = "SAE-SAAS",
    description,
    breadcrumbs,
}: CustomAppShellProps) {
    const pathname = usePathname();
    const router = useRouter();

    const isDesktop = useMediaQuery("(min-width: 40em)");
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleNav = () => {
        if (isDesktop) toggleDesktop();
        else toggleMobile();
    };

    const isItemActive = (menuItem: CustomAppShellMenuItem): boolean => {
        if (menuItem.link && isActiveLink(pathname, menuItem.link)) return true;
        return menuItem.items?.some(isItemActive) ?? false;
    };

    /**
     * Tìm menu item đang active để lấy title tự động
     */
    const findActiveMenuItem = (
        items: CustomAppShellMenuItem[],
        parentLabel?: string
    ): { label: string; href: string; parentLabel?: string; description?: string } | null => {
        for (const item of items) {
            if (item.link && isActiveLink(pathname, item.link)) {
                return { label: item.label, href: item.link, parentLabel, description: item.description };
            }
            if (item.items?.length) {
                const found = findActiveMenuItem(item.items, item.label);
                if (found) return found;
            }
        }
        return null;
    };

    // Tự động lấy title và description từ menu đang active
    const activeMenuItem = menu ? findActiveMenuItem(menu) : null;
    const pageTitle = title || activeMenuItem?.label || "Trang";
    const pageDescription = description || activeMenuItem?.description;

    // Tự động tạo breadcrumbs từ menu
    const autoBreadcrumbs: BreadcrumbItem[] = [
        { title: "Trang chủ", href: "/admin/dashboard" },
    ];
    if (activeMenuItem?.parentLabel) {
        autoBreadcrumbs.push({ title: activeMenuItem.parentLabel });
    }
    if (activeMenuItem && !breadcrumbs) {
        autoBreadcrumbs.push({ title: activeMenuItem.label });
    }

    const finalBreadcrumbs = breadcrumbs || autoBreadcrumbs;

    /**
     * Notion-style sidebar.
     *
     * Đặc điểm thiết kế:
     * - Nền sidebar nhẹ, gần như trắng/xám rất nhạt
     * - Không có border-left màu cho active
     * - Active = nền mờ nhẹ + chấm tròn accent nhỏ bên trái
     * - Hover = nền mờ nhẹ, không có animation xê dịch
     * - Group label = chữ nhỏ, in đậm, màu dimmed
     * - Collapse/expand = chevron xoay nhẹ nhàng, KHÔNG có border-left cho children
     * - Tổng thể: tối giản, không rườm rà
     * - Tree lines = đường gạch thẳng đứng biểu diễn cấp phân cấp
     * - Hỗ trợ dark/light mode rõ ràng
     */
    const renderMenuRecursive = (current: CustomAppShellMenuItem, level: number) => {
        const key = getItemKey(current);
        const hasChildren = !!current.items?.length;

        const active = isItemActive(current);
        const opened = active ? openGroups[key] !== false : openGroups[key] === true;

        // ── Leaf item ──────────────────────────────────────────────
        if (!hasChildren) {
            const activeLeaf = current.link ? isActiveLink(pathname, current.link) : false;

            return (
                <UnstyledButton
                    key={key}
                    onClick={() => {
                        if (!current.link) return;
                        router.push(current.link);
                        closeMobile();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        paddingLeft: rem(level === 0 ? 10 : 10 + level * 14),
                        paddingRight: rem(10),
                        paddingTop: rem(6),
                        paddingBottom: rem(6),
                        borderRadius: rem(6),
                        cursor: current.link ? "pointer" : "default",
                        background: activeLeaf
                            ? "light-dark(rgba(0, 0, 0, 0.07), rgba(255, 255, 255, 0.08))"
                            : "transparent",
                        transition: "background 100ms ease",
                        gap: rem(8),
                        position: "relative",
                    }}
                    onMouseEnter={(e) => {
                        if (!activeLeaf) {
                            e.currentTarget.style.background = "light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.06))";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!activeLeaf) {
                            e.currentTarget.style.background = "transparent";
                        }
                    }}
                >
                    {/* Accent dot — đặc trưng Notion */}
                    {activeLeaf && (
                        <Box
                            style={{
                                position: "absolute",
                                left: rem(level === 0 ? 4 : 4 + level * 14),
                                width: rem(5),
                                height: rem(5),
                                borderRadius: "50%",
                                background: "light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-4))",
                                flexShrink: 0,
                            }}
                        />
                    )}

                    {current.icon && (
                        <Box
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: activeLeaf
                                    ? "var(--mantine-color-blue-5)"
                                    : "light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-4))",
                                flexShrink: 0,
                            }}
                        >
                            {current.icon}
                        </Box>
                    )}

                    <Text
                        size="sm"
                        fw={activeLeaf ? 600 : 400}
                        c={activeLeaf ? "blue" : undefined}
                        style={{
                            lineHeight: 1.4,
                            color: activeLeaf
                                ? undefined
                                : "light-dark(var(--mantine-color-dark-7), var(--mantine-color-gray-2))",
                            transition: "font-weight 100ms ease",
                        }}
                    >
                        {current.label}
                    </Text>
                </UnstyledButton>
            );
        }

        // ── Group (collapsible section) ───────────────────────────
        return (
            <Box key={key}>
                {/* Section label — Notion style: small, bold, muted */}
                <UnstyledButton
                    type="button"
                    onClick={() =>
                        setOpenGroups((prev) => {
                            const currentlyOpened = active
                                ? prev[key] !== false
                                : prev[key] === true;
                            return { ...prev, [key]: !currentlyOpened };
                        })
                    }
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingLeft: rem(level === 0 ? 10 : 10 + level * 14),
                        paddingRight: rem(10),
                        paddingTop: rem(10),
                        paddingBottom: rem(4),
                        borderRadius: rem(6),
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "light-dark(rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.05))";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    <Group gap={rem(6)} wrap="nowrap">
                        {current.icon && (
                            <Box
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-4))",
                                }}
                            >
                                {current.icon}
                            </Box>
                        )}
                        <Text
                            size="xs"
                            fw={700}
                            tt="uppercase"
                            style={{
                                letterSpacing: "0.04em",
                                color: "light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-3))",
                                lineHeight: 1.4,
                            }}
                        >
                            {current.label}
                        </Text>
                    </Group>

                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            transform: opened ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 150ms ease",
                            color: "light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-4))",
                        }}
                    >
                        <IconChevronRight size={12} stroke={2.5} />
                    </Box>
                </UnstyledButton>

                <Collapse in={opened}>
                    <Stack gap={2} mt={rem(2)} pb={rem(2)}>
                        {current.items!.map((child) => (
                            <Box key={getItemKey(child)}>
                                {renderMenuRecursive(child, level + 1)}
                            </Box>
                        ))}
                    </Stack>
                </Collapse>
            </Box>
        );
    };

    return (
        <AppShell
            padding="md"
            header={{ height: 52 }}
            navbar={{
                width: 248,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header
                style={{
                    borderBottom: "1px solid var(--mantine-color-default-border)",
                }}
            >
                <Group h="100%" px="md" justify="space-between">
                    <Group gap="xs">
                        <ActionIcon
                            variant="subtle"
                            size="md"
                            radius="sm"
                            color="gray"
                            onClick={toggleNav}
                            aria-label="Toggle menu"
                        >
                            {isDesktop ? (
                                desktopOpened ? (
                                    <IconLayoutSidebarLeftCollapse size={16} />
                                ) : (
                                    <IconLayoutSidebarLeftExpand size={16} />
                                )
                            ) : mobileOpened ? (
                                <IconLayoutSidebarLeftCollapse size={16} />
                            ) : (
                                <IconLayoutSidebarLeftExpand size={16} />
                            )}
                        </ActionIcon>

                        <Text
                            fw={600}
                            size="sm"
                            style={{
                                letterSpacing: "-0.01em",
                                color: "light-dark(var(--mantine-color-dark-7), var(--mantine-color-gray-1))",
                            }}
                        >
                            {pageTitle}
                        </Text>
                    </Group>

                    <AvatarInfoMenu />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar
                style={{
                    background:
                        "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-9))",
                }}
            >
                <ScrollArea
                    type="auto"
                    h={`calc(100vh - 52px - 48px)`}
                    scrollbarSize={4}
                    px="xs"
                    py="sm"
                >
                    <Stack gap={2}>
                        {menu?.map((item) => (
                            <Box key={getItemKey(item)}>
                                {renderMenuRecursive(item, 0)}
                            </Box>
                        ))}
                    </Stack>
                </ScrollArea>
            </AppShell.Navbar>

            <AppShell.Main
                bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))"
                style={{ minHeight: "100vh" }}
            >
                <CustomPageContent
                    description={pageDescription}
                    breadcrumbs={finalBreadcrumbs}
                >
                    {children}
                </CustomPageContent>
            </AppShell.Main>
        </AppShell>
    );
}
